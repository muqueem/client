//+------------------------------------------------------------------+
//|   Dual Force Engine EA v1.00 DEMO (3-Day Limit)                  |
//|   Quantum Rise Capital - 2025                                    |
//+------------------------------------------------------------------+
#property copyright   "Quantum Rise Capital"
#property version     "1.00-DEMO"
#property strict
#property indicator_chart_window

#include <Trade/Trade.mqh>
CTrade trade;

// === DEMO EXPIRATION CONTROL ===
datetime demoStart = 0;
input int DemoDurationDays = 3;

bool isDemoExpired() {
   if(demoStart == 0)
      demoStart = TimeLocal();
   return (TimeLocal() - demoStart > DemoDurationDays * 86400);
}

// === INPUTS ===
input string    SymbolsList      = "US30,GER40,UK100,NAS100";
input ENUM_TIMEFRAMES TimeFrame  = PERIOD_M5;
input int       ATRPeriod        = 14;
input double    ATR_TP_Mult      = 7;
input double    ATR_SL_Mult      = 9;
input double    WatchdogDollar   = 300; 
input double    BreakevenBufferPoints = 5.0;
input bool      PartialTP_Enable = true;
input color     DashboardColor   = clrAqua;
input int       DashboardFontSizeMain = 9;
input int       DashboardFontSizeSection = 9;
input int       DashboardFontSizeSmall = 9;
input int       DashboardFontSizeFooter = 9;
input double    MinLot           = 0.06;
input double    MaxLot           = 1.02;
input int       BullsBearsPeriod = 56;
input double    ContraTP_Mult    = 3.7;
input double    MinMomentum      = 46;
input double    ContraMax        = 14;

string symbols[];
double eqWatermark = 0.0;
bool tradingLocked = false;
string lockReason = "";
datetime lastBarTime = 0;
int lastTradeDay = -1;

enum WinnerType { NONE, TREND, CONTRA };
struct EntryPair {
    ulong trendTicket;
    ulong contraTicket;
    string symbol;
    datetime barTime;
    double trendEntry;
    double contraEntry;
    double tpDist;
    double slDist;
    int trendDir;
    int contraDir;
    string mode;
    WinnerType winner;
    bool active;
};
EntryPair pairs[];

double getATR(const string sym, int period) {
    int handle = iATR(sym, TimeFrame, period);
    if(handle < 0) return 0;
    double atr[];
    if(CopyBuffer(handle, 0, 1, 1, atr) != 1) return 0;
    IndicatorRelease(handle);
    return atr[0];
}

double getBullsPower(const string sym, int period=13, int shift=1) {
    int handle = iBullsPower(sym, TimeFrame, period);
    if(handle < 0) return 0;
    double buffer[];
    if(CopyBuffer(handle, 0, shift, 1, buffer) != 1) return 0;
    IndicatorRelease(handle);
    return buffer[0];
}

double getBearsPower(const string sym, int period=13, int shift=1) {
    int handle = iBearsPower(sym, TimeFrame, period);
    if(handle < 0) return 0;
    double buffer[];
    if(CopyBuffer(handle, 0, shift, 1, buffer) != 1) return 0;
    IndicatorRelease(handle);
    return buffer[0];
}

double lotFromPower(double powerValue) {
    double absP = MathAbs(powerValue);
    double lot = MinLot;
    if(absP < 50) lot = MinLot;
    else if(absP < 100) lot = MinLot * 2;
    else if(absP < 200) lot = (MinLot + MaxLot) / 2.0;
    else if(absP < 400) lot = (MaxLot * 0.8);
    else lot = MaxLot;
    double step = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
    double minV = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
    double maxV = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
    lot = MathMax(lot, minV);
    lot = MathMin(lot, maxV);
    return MathRound(lot/step)*step;
}

void updateWatermark() {
    double eq = AccountInfoDouble(ACCOUNT_EQUITY);
    if(eq > eqWatermark) eqWatermark = eq;
}

double getGlobalFloating() {
    double pl = 0;
    for(int i=0; i<PositionsTotal(); ++i) {
        ulong ticket = PositionGetTicket(i);
        if(PositionSelectByTicket(ticket))
            pl += PositionGetDouble(POSITION_PROFIT);
    }
    return pl;
}

void closeAllPositions() {
    for(int i=PositionsTotal()-1; i>=0; --i) {
        ulong ticket = PositionGetTicket(i);
        if(PositionSelectByTicket(ticket)) {
            string sym = PositionGetString(POSITION_SYMBOL);
            trade.PositionClose(sym);
        }
    }
}

void openDualEntryPair(string sym,int trendDir,int contraDir,double atr,
                       datetime barTime,string mode,double trendLot,double contraLot) {
    double stopDist = ATR_SL_Mult * atr;
    double tpDist   = ATR_TP_Mult * atr;
    double ask = SymbolInfoDouble(sym, SYMBOL_ASK);
    double bid = SymbolInfoDouble(sym, SYMBOL_BID);
    ulong trendTicket=0, contraTicket=0;
    if(trendDir==1) trendTicket = trade.Buy(trendLot,sym,ask,ask-stopDist,ask+tpDist)?trade.ResultOrder():0;
    else if(trendDir==-1) trendTicket = trade.Sell(trendLot,sym,bid,bid+stopDist,bid-tpDist)?trade.ResultOrder():0;
    if(contraDir==1) contraTicket = trade.Buy(contraLot,sym,ask,ask-stopDist,ask+tpDist)?trade.ResultOrder():0;
    else if(contraDir==-1) contraTicket = trade.Sell(contraLot,sym,bid,bid+stopDist,bid-tpDist)?trade.ResultOrder():0;
    if(trendTicket>0 && contraTicket>0) {
        EntryPair pair;
        pair.trendTicket=trendTicket; pair.contraTicket=contraTicket;
        pair.symbol=sym; pair.barTime=barTime;
        pair.trendEntry=(trendDir==1)?ask:bid;
        pair.contraEntry=(contraDir==1)?ask:bid;
        pair.tpDist=tpDist; pair.slDist=stopDist;
        pair.trendDir=trendDir; pair.contraDir=contraDir;
        pair.mode=mode; pair.winner=NONE; pair.active=true;
        int newSize=ArraySize(pairs)+1; ArrayResize(pairs,newSize);
        pairs[newSize-1]=pair;
    }
}

void handlePairSurvivorLogic() {
   for(int i=0;i<ArraySize(pairs);i++) {
      if(!pairs[i].active) continue;
      ulong tTicket = pairs[i].trendTicket;
      ulong cTicket = pairs[i].contraTicket;
      string sym    = pairs[i].symbol;
      bool trendOpen=false, contraOpen=false;
      if(PositionSelectByTicket(tTicket)) trendOpen=true;
      if(PositionSelectByTicket(cTicket)) contraOpen=true;
      if(!trendOpen && contraOpen && pairs[i].winner==NONE) {
         trade.PositionClose(sym);
         pairs[i].winner = TREND;
         pairs[i].active = false;
      }
      if(!trendOpen && contraOpen && pairs[i].winner==NONE) {
         double contraPrice = PositionGetDouble(POSITION_PRICE_OPEN);
         int dir = (PositionGetInteger(POSITION_TYPE)==POSITION_TYPE_BUY)?1:-1;
         double newTP = contraPrice + dir*(pairs[i].tpDist*ContraTP_Mult);
         trade.PositionModify(cTicket, PositionGetDouble(POSITION_SL), newTP);
         pairs[i].winner = CONTRA;
      }
      if(!trendOpen && !contraOpen) {
         pairs[i].active = false;
      }
   }
}

void handlePartialTPandBE() {
   for(int i=PositionsTotal()-1; i>=0; --i) {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      double entry   = PositionGetDouble(POSITION_PRICE_OPEN);
      double volume  = PositionGetDouble(POSITION_VOLUME);
      string sym     = PositionGetString(POSITION_SYMBOL);
      int dir        = (PositionGetInteger(POSITION_TYPE)==POSITION_TYPE_BUY)?1:-1;
      double price   = (dir==1)?SymbolInfoDouble(sym, SYMBOL_BID):SymbolInfoDouble(sym, SYMBOL_ASK);
      double dist    = (price - entry) * dir;
      double point   = SymbolInfoDouble(sym, SYMBOL_POINT);
      double tpDist  = ATR_TP_Mult * getATR(sym, ATRPeriod);
      if(tpDist <= 0) continue;
      double progress = dist / tpDist;
      if(PartialTP_Enable && progress > 0) {
         static double lastStage[1000];
         if(lastStage[i] < 1.0) lastStage[i] = 0.0;
         double stage = MathFloor(progress*20.0);
         if(stage > lastStage[i]) {
            double closeVol = MathMin(volume*0.1, volume);
            if(closeVol >= SymbolInfoDouble(sym, SYMBOL_VOLUME_MIN)) {
               trade.PositionClosePartial(ticket, closeVol);
            }
            lastStage[i] = stage;
         }
      }
      if(progress >= 0.20) {
         double bePrice = entry + dir*(BreakevenBufferPoints*point);
         double sl      = PositionGetDouble(POSITION_SL);
         if((dir==1 && (sl<bePrice || sl==0)) || (dir==-1 && (sl>bePrice || sl==0))) {
            trade.PositionModify(ticket, bePrice, PositionGetDouble(POSITION_TP));
         }
      }
   }
}

void drawDashboard() {
   string name = "DFE_Dash";
   string text;
   text = "Dual Force Engine EA v1.00 DEMO\n";
   text += "Equity: " + DoubleToString(AccountInfoDouble(ACCOUNT_EQUITY),2) + "\n";
   text += "Balance: " + DoubleToString(AccountInfoDouble(ACCOUNT_BALANCE),2) + "\n";
   text += "Watermark Eq: " + DoubleToString(eqWatermark,2) + "\n";
   text += "Watchdog: " + (tradingLocked ? "LOCKED ("+lockReason+")":"Active") + "\n";
   ObjectCreate(0,name,OBJ_LABEL,0,0,0);
   ObjectSetInteger(0,name,OBJPROP_CORNER,CORNER_LEFT_UPPER);
   ObjectSetInteger(0,name,OBJPROP_XDISTANCE,10);
   ObjectSetInteger(0,name,OBJPROP_YDISTANCE,15);
   ObjectSetInteger(0,name,OBJPROP_FONTSIZE,DashboardFontSizeMain);
   ObjectSetInteger(0,name,OBJPROP_COLOR,DashboardColor);
   ObjectSetString(0,name,OBJPROP_TEXT,text);
}

int OnInit() {
   StringSplit(SymbolsList, ',', symbols);
   eqWatermark = AccountInfoDouble(ACCOUNT_EQUITY);
   tradingLocked = false;
   lockReason = "";
   lastBarTime = 0;
   lastTradeDay = -1;
   ArrayResize(pairs, 0);
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason) { ObjectsDeleteAll(0, OBJ_LABEL, 0, 0); }

void OnTick() {
   if(isDemoExpired()) {
      if(!tradingLocked) {
         closeAllPositions();
         tradingLocked = true;
         lockReason = "DEMO EXPIRED";
      }
      drawDashboard();
      return;
   }

   datetime currBarTime = iTime(_Symbol, TimeFrame, 0);
   updateWatermark();
   double bal = AccountInfoDouble(ACCOUNT_BALANCE);
   double eq  = AccountInfoDouble(ACCOUNT_EQUITY);
   double floating = getGlobalFloating();
   MqlDateTime now; TimeToStruct(TimeCurrent(), now);
   static datetime prevBarTime = 0;
   bool isNewBar = (currBarTime > prevBarTime);
   if(isNewBar) prevBarTime = currBarTime;
   static int prevDay = -1;
   bool isNewDay = (now.day != prevDay);
   if(isNewDay) prevDay = now.day;
   if(bal > 0) {
      double ddCash = bal - eq;
      if(ddCash >= WatchdogDollar) {
         closeAllPositions();
         tradingLocked = true;
         lockReason = "Watchdog";
      }
   }
   static int lastEODCheckDay = -1;
   if(!tradingLocked && now.hour == 23 && lastEODCheckDay != now.day) {
      lastEODCheckDay = now.day;
      if(floating > 0) {
         closeAllPositions();
         tradingLocked = true;
         lockReason = "EOD";
      }
   }
   if(tradingLocked && isNewBar && isNewDay) {
      tradingLocked = false;
      lockReason = "";
   }
   if(!tradingLocked && isNewBar) {
      for(int s=0; s<ArraySize(symbols); ++s) {
         string sym = symbols[s];
         double atr = getATR(sym, ATRPeriod);
         if(atr <= 0) continue;
         double bulls = getBullsPower(sym, BullsBearsPeriod);
         double bears = getBearsPower(sym, BullsBearsPeriod);
         if(bulls == 0 && bears == 0) continue;
         int trendDir=0, contraDir=0;
         double trendLot=0, contraLot=0;
         string mode="";
         double momentumScore = MathAbs(bulls) - MathAbs(bears);
         if(MathAbs(bulls) > MathAbs(bears)) {
            if(momentumScore >= MinMomentum && MathAbs(bears) <= ContraMax) {
               trendDir=1; contraDir=-1;
               trendLot  = lotFromPower(bulls);
               contraLot = lotFromPower(bears);
               mode="Bulls> Bears";
            }
         }
         else if(MathAbs(bears) > MathAbs(bulls)) {
            if(momentumScore >= MinMomentum && MathAbs(bulls) <= ContraMax) {
               trendDir=-1; contraDir=1;
               trendLot  = lotFromPower(bears);
               contraLot = lotFromPower(bulls);
               mode="Bears> Bulls";
            }
         }
         if(trendDir!=0 && contraDir!=0) {
            openDualEntryPair(sym,trendDir,contraDir,atr,currBarTime,mode,trendLot,contraLot);
         }
      }
   }
   handlePartialTPandBE();
   handlePairSurvivorLogic();
   drawDashboard();
}