//+------------------------------------------------------------------+
//|      FlashEdge Scalper X PRO (Global) - DEMO (3 Days)            |
//|      Quantum Rise Capital                                        |
//+------------------------------------------------------------------+
#property copyright "Quantum Rise Capital"
#property version   "DEMO.2025-3DAYS"
#property strict

#include <Trade/Trade.mqh>
CTrade trade;

//--- Demo Lock Constants
#define DEMO_START_VAR   "FLASHEDGE_DEMO_START"
#define DEMO_PERIOD_DAYS 3

//--- Existing Defines
#define HALT_VAR     "FLASHEDGE_HALT"
#define STARTBAL_VAR "FLASHEDGE_START_BAL"
#define SHUTDOWN_VAR "FLASHEDGE_SHUTDOWN"

//--- INPUTS
input double  TakeProfitMultiplier      = 20.0;
input double  StopLossMultiplier        = 12.3;
input int     ATRPeriod                 = 28;
input int     RSIPeriod                 = 28;
input int     EMAFast                   = 56;
input int     EMASlow                   = 110;
input double  MinATR                    = 0.00005;
input double  RiskPercent               = 1.57;
input double  MinLot                    = 0.13;
input double  MaxLot                    = 0.22;
input double  HedgeDrawdownThreshold    = 360.0;
input double  EquityResetPct            = 195.0;
input int     MagicNumber               = 556677;
input ENUM_TIMEFRAMES Timeframe         = PERIOD_M5;
input string  SymbolsList               = "EURUSD,GBPUSD,USDJPY,XAUUSD";
input int     AsianStartHour            = 0;
input int     AsianEndHour              = 7;
input int     MaxSpreadPoints           = 30;
input int     CooldownMinutes           = 170;
input string  NewsCSV                   = "news.csv";
input int     NewsMinutesBefore         = 30;
input int     NewsMinutesAfter          = 30;
input int     ADXPeriod                 = 15;
input double  ADXTrendLevel             = 33.0;
input bool    DebugPrints               = false;

//--- Global vars
string Symbols[];
int symbolCount = 0;
double startBalance = 0;
int lastDay = -1;
bool tradingHalted = false;
bool equityResetDone = false;
bool dailyShutdown = false;
int lastShutdownDay = -1;
bool hedgeActive = false;
double hedgeAnchorEquity = 0.0;
ulong origTicketsSnapshot[500];
int origTicketsCount = 0;

//--- Demo vars
datetime demoStart;
bool demoExpired = false;

//--- Other EA globals
struct IND_HANDLES { int emaFast; int emaSlow; int rsi; int atr; int adx; };
#define MAX_SYMBOLS 20
IND_HANDLES h[MAX_SYMBOLS];
datetime lastTradeClose[MAX_SYMBOLS];

// === partial TP tracker ===
struct PartialTPTracker {
   ulong ticket; string symbol; double entry; double tp; double volume;
   datetime openTime; bool tp20; bool tp40; bool tp60; bool tp80; bool tp100;
   double lastTrail;
};
PartialTPTracker trackers[200];
int trackerCount = 0;

// === news struct ===
struct NewsEvent { datetime newsTime; string symbol; };
NewsEvent NewsArr[1000];
int newsCount = 0;

//+------------------------------------------------------------------+
//| DEMO LOCK FUNCTIONS                                              |
//+------------------------------------------------------------------+
void InitDemoLock()
{
   if(!GlobalVariableCheck(DEMO_START_VAR))
      GlobalVariableSet(DEMO_START_VAR, TimeCurrent());

   demoStart = (datetime)GlobalVariableGet(DEMO_START_VAR);

   if(TimeCurrent() > demoStart + DEMO_PERIOD_DAYS*86400)
      demoExpired = true;
   else
      demoExpired = false;
}

void DrawDemoWatermark()
{
   datetime now = TimeCurrent();
   int secsLeft = (int)((demoStart + DEMO_PERIOD_DAYS*86400) - now);
   if(secsLeft < 0) secsLeft = 0;

   int days = secsLeft / 86400;
   int hours = (secsLeft % 86400) / 3600;
   string txt = demoExpired ? "⚠ DEMO EXPIRED ⚠\nContact Quantum Rise Capital"
                            : "FlashEdge DEMO\nTime left: " +
                              IntegerToString(days) + "d " +
                              IntegerToString(hours) + "h";

   string name = "DemoWatermark";
   if(ObjectFind(0, name) == -1)
   {
      ObjectCreate(0, name, OBJ_LABEL, 0, 0, 0);
      ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
      ObjectSetInteger(0, name, OBJPROP_XDISTANCE, 10);
      ObjectSetInteger(0, name, OBJPROP_YDISTANCE, 20);
      ObjectSetInteger(0, name, OBJPROP_FONTSIZE, 14);
      ObjectSetInteger(0, name, OBJPROP_COLOR, clrRed);
   }
   ObjectSetString(0, name, OBJPROP_TEXT, txt);
}

//+------------------------------------------------------------------+
//| INIT                                                             |
//+------------------------------------------------------------------+
int OnInit()
{
   InitDemoLock();

   StringSplit(SymbolsList, ',', Symbols);
   symbolCount = ArraySize(Symbols);

   for(int i=0; i<symbolCount; i++)
   {
      string sym = Symbols[i];
      if(!SymbolSelect(sym, true)) continue;
      Bars(sym, Timeframe);

      h[i].emaFast = iMA(sym, Timeframe, EMAFast, 0, MODE_EMA, PRICE_CLOSE);
      h[i].emaSlow = iMA(sym, Timeframe, EMASlow, 0, MODE_EMA, PRICE_CLOSE);
      h[i].rsi     = iRSI(sym, Timeframe, RSIPeriod, PRICE_CLOSE);
      h[i].atr     = iATR(sym, Timeframe, ATRPeriod);
      h[i].adx     = iADX(sym, Timeframe, ADXPeriod);
      lastTradeClose[i] = 0;
   }

   if(!GlobalVariableCheck(HALT_VAR))     GlobalVariableSet(HALT_VAR,0.0);
   if(!GlobalVariableCheck(STARTBAL_VAR)) GlobalVariableSet(STARTBAL_VAR,AccountInfoDouble(ACCOUNT_BALANCE));
   if(!GlobalVariableCheck(SHUTDOWN_VAR)) GlobalVariableSet(SHUTDOWN_VAR, 0.0);

   startBalance = GlobalVariableGet(STARTBAL_VAR);
   MqlDateTime dt; TimeToStruct(TimeCurrent(), dt); lastDay = dt.day;

   trackerCount = 0;
   hedgeActive = false;
   hedgeAnchorEquity = 0.0;
   origTicketsCount = 0;

   return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
//| DEINIT                                                           |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   ObjectDelete(0, "DemoWatermark");

   for(int i=0; i<symbolCount; i++)
   {
      IndicatorRelease(h[i].emaFast);
      IndicatorRelease(h[i].emaSlow);
      IndicatorRelease(h[i].rsi);
      IndicatorRelease(h[i].atr);
      IndicatorRelease(h[i].adx);
   }
}

//+------------------------------------------------------------------+
//| TICK                                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   InitDemoLock();
   DrawDemoWatermark();

   if(demoExpired)
   {
      Comment("⚠ DEMO VERSION EXPIRED ⚠\nContact Quantum Rise Capital");
      return; // stop trading
   }

   RunTradingLogic();
}

//+------------------------------------------------------------------+
//| FULL ORIGINAL TRADING LOGIC                                      |
//+------------------------------------------------------------------+
void RunTradingLogic()
{
   MqlDateTime dt; TimeToStruct(TimeCurrent(), dt);
   int today = dt.day;
   double balanceNow = AccountInfoDouble(ACCOUNT_BALANCE);
   double equityNow  = AccountInfoDouble(ACCOUNT_EQUITY);
   double watchdogDrawdown = balanceNow - equityNow;

   if(DebugPrints || watchdogDrawdown >= 0.8 * HedgeDrawdownThreshold)
      Print("BAL=", balanceNow, " EQ=", equityNow, " DD=", watchdogDrawdown, " HedgeActive=", hedgeActive);

   // === Hedge logic
   if(!hedgeActive && watchdogDrawdown >= HedgeDrawdownThreshold) {
      origTicketsCount = 0;
      for(int i=0; i<PositionsTotal(); i++) {
         ulong ticket = PositionGetTicket(i);
         if(PositionSelectByTicket(ticket)) {
            if(PositionGetInteger(POSITION_MAGIC) == MagicNumber)
               origTicketsSnapshot[origTicketsCount++] = ticket;
         }
      }
      hedgeActive = true;
      hedgeAnchorEquity = equityNow;
      for(int i=0; i<origTicketsCount; i++) {
         if(PositionSelectByTicket(origTicketsSnapshot[i])) {
            string symbol = PositionGetString(POSITION_SYMBOL);
            long type     = PositionGetInteger(POSITION_TYPE);
            double volume = PositionGetDouble(POSITION_VOLUME);
            int idx = i;
            double atr[];
            if(CopyBuffer(h[idx].atr, 0, 0, 1, atr) < 1) continue;
            double slPips = atr[0] * StopLossMultiplier;
            double tpPips = atr[0] * TakeProfitMultiplier;
            double ask = SymbolInfoDouble(symbol, SYMBOL_ASK);
            double bid = SymbolInfoDouble(symbol, SYMBOL_BID);
            ENUM_ORDER_TYPE hedgeType = (type == POSITION_TYPE_BUY) ? ORDER_TYPE_SELL : ORDER_TYPE_BUY;
            double price = (hedgeType == ORDER_TYPE_BUY) ? ask : bid;
            double sl = (hedgeType == ORDER_TYPE_BUY) ? price - slPips : price + slPips;
            double tp = (hedgeType == ORDER_TYPE_BUY) ? price + tpPips : price - tpPips;
            trade.SetExpertMagicNumber(MagicNumber + 100000);
            if(hedgeType == ORDER_TYPE_BUY)
               trade.Buy(volume, symbol, price, sl, tp, "HEDGE");
            else
               trade.Sell(volume, symbol, price, sl, tp, "HEDGE");
         }
      }
   }

   if(hedgeActive) {
      double netPnL = equityNow - hedgeAnchorEquity;
      if(netPnL >= 0) {
         for(int i=PositionsTotal()-1; i>=0; i--) {
            ulong ticket = PositionGetTicket(i);
            if(PositionSelectByTicket(ticket))
               trade.PositionClose(ticket);
         }
         hedgeActive = false;
         origTicketsCount = 0;
      }
   }

   // === Daily shutdown
   if(dt.hour == 23 && lastShutdownDay != today) {
      for(int i=PositionsTotal()-1; i>=0; i--) {
         ulong ticket = PositionGetTicket(i);
         if(PositionSelectByTicket(ticket)) {
            trade.PositionClose(ticket);
         }
      }
      GlobalVariableSet(SHUTDOWN_VAR, 1.0);
      dailyShutdown = true;
      lastShutdownDay = today;
      return;
   }
   if(dt.day != lastShutdownDay && dailyShutdown) {
      GlobalVariableSet(SHUTDOWN_VAR, 0.0);
      dailyShutdown = false;
   }
   if(GlobalVariableGet(SHUTDOWN_VAR) > 0.5) {
      dailyShutdown = true;
      return;
   }

   // === Daily reset
   if(today != lastDay) {
      lastDay = today;
      GlobalVariableSet(HALT_VAR, 0.0);
      GlobalVariableSet(STARTBAL_VAR, AccountInfoDouble(ACCOUNT_BALANCE));
      startBalance = AccountInfoDouble(ACCOUNT_BALANCE);
      tradingHalted = false;
      equityResetDone = false;
      trackerCount = 0;
      hedgeActive = false;
      hedgeAnchorEquity = 0.0;
      origTicketsCount = 0;
   } else {
      startBalance = GlobalVariableGet(STARTBAL_VAR);
   }

   if(GlobalVariableGet(HALT_VAR) > 0.5) tradingHalted = true;
   if(tradingHalted || equityResetDone || hedgeActive) return;

   double balanceNow2 = AccountInfoDouble(ACCOUNT_BALANCE);
   double equityNow2  = AccountInfoDouble(ACCOUNT_EQUITY);
   Comment(
      "FlashEdge Scalper X PRO (Global)\n",
      "Equity: ", DoubleToString(equityNow2, 2), "\n",
      "Balance: ", DoubleToString(balanceNow2, 2), "\n",
      "Watchdog DD: ", DoubleToString(balanceNow2 - equityNow2, 2), " / ", DoubleToString(HedgeDrawdownThreshold,2), "\n",
      "Equity Reset: ", (equityResetDone ? "DONE" : "Armed @ " + DoubleToString(startBalance * (1.0 + EquityResetPct/100.0),2)), "\n",
      (tradingHalted ? "TRADING HALTED\n" : "TRADING ACTIVE\n"),
      (hedgeActive ? "HEDGE ACTIVE\n" : "")
   );

   HandlePartialTP();
   ManageOpenPositions();

   for(int i=0; i<symbolCount; i++) {
      string sym = Symbols[i];
      if(DebugPrints) Print("---- ", sym, " CHECK ----");
      if(!IsTradeAllowed(sym)) continue;
      if(PositionSelect(sym)) continue;
      if(IsAsianSession()) continue;
      if(IsNewsTime(sym)) continue;
      if(!IsSpreadOk(sym)) continue;
      if(IsCooldown(sym)) continue;
      int sig = NewSignal(sym, i);
      if(sig == 1) ExecuteTrade(sym, i, ORDER_TYPE_BUY);
      else if(sig == -1) ExecuteTrade(sym, i, ORDER_TYPE_SELL);
   }
}

//+------------------------------------------------------------------+
//| HELPERS (full from original EA)                                  |
//+------------------------------------------------------------------+
bool IsAsianSession(){ MqlDateTime dt; TimeToStruct(TimeCurrent(), dt); if(AsianStartHour<=AsianEndHour) return(dt.hour>=AsianStartHour && dt.hour<AsianEndHour); else return(dt.hour>=AsianStartHour||dt.hour<AsianEndHour); }
bool IsSpreadOk(string symbol){ int spread=(int)SymbolInfoInteger(symbol,SYMBOL_SPREAD); return spread<=MaxSpreadPoints; }
bool IsCooldown(string symbol){ int idx=-1; for(int i=0;i<symbolCount;i++) if(Symbols[i]==symbol) idx=i; if(idx<0) return false; if(lastTradeClose[idx]==0) return false; return (TimeCurrent()-lastTradeClose[idx])<CooldownMinutes*60; }
void SetTradeCooldown(string symbol){ int idx=-1; for(int i=0;i<symbolCount;i++) if(Symbols[i]==symbol) idx=i; if(idx>=0) lastTradeClose[idx]=TimeCurrent(); }
bool IsNewsTime(string symbol){ datetime now=TimeCurrent(); for(int i=0;i<newsCount;i++){ if(StringFind(symbol,NewsArr[i].symbol)>=0||NewsArr[i].symbol=="ALL"){ if(now>=NewsArr[i].newsTime-60*NewsMinutesBefore && now<=NewsArr[i].newsTime+60*NewsMinutesAfter) return true; } } return false; }
bool IsTradeAllowed(string symbol){ if(!SymbolInfoInteger(symbol, SYMBOL_SELECT)) SymbolSelect(symbol, true); return SymbolInfoInteger(symbol, SYMBOL_TRADE_MODE) == SYMBOL_TRADE_MODE_FULL; }

// === Partial TP ===
void HandlePartialTP()
{
   for(int i=PositionsTotal()-1;i>=0;i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      string sym = PositionGetString(POSITION_SYMBOL);
      int idx = -1;
      for(int j=0;j<trackerCount;j++) if(trackers[j].ticket==ticket) idx=j;
      if(idx < 0) continue;

      double entry = trackers[idx].entry;
      double tp = trackers[idx].tp;
      double totalVol = trackers[idx].volume;
      double vol = PositionGetDouble(POSITION_VOLUME);
      long type = PositionGetInteger(POSITION_TYPE);
      double price = (type==POSITION_TYPE_BUY) ? SymbolInfoDouble(sym, SYMBOL_BID)
                                               : SymbolInfoDouble(sym, SYMBOL_ASK);
      double target = tp-entry;
      double levels[5] = {
         entry + (type==POSITION_TYPE_BUY ? 0.2 : -0.2)*target,
         entry + (type==POSITION_TYPE_BUY ? 0.4 : -0.4)*target,
         entry + (type==POSITION_TYPE_BUY ? 0.6 : -0.6)*target,
         entry + (type==POSITION_TYPE_BUY ? 0.8 : -0.8)*target,
         tp
      };
      double parts = NormalizeDouble(totalVol/5.0, 2);

      if(!trackers[idx].tp20 && ((type==POSITION_TYPE_BUY && price>=levels[0]) ||
         (type==POSITION_TYPE_SELL && price<=levels[0])) && vol>=parts)
      { trade.PositionClosePartial(ticket, parts); trackers[idx].tp20 = true; }

      else if(!trackers[idx].tp40 && ((type==POSITION_TYPE_BUY && price>=levels[1]) ||
         (type==POSITION_TYPE_SELL && price<=levels[1])) && vol>=parts*4)
      { trade.PositionClosePartial(ticket, parts); trackers[idx].tp40 = true; }

      else if(!trackers[idx].tp60 && ((type==POSITION_TYPE_BUY && price>=levels[2]) ||
         (type==POSITION_TYPE_SELL && price<=levels[2])) && vol>=parts*3)
      { trade.PositionClosePartial(ticket, parts); trackers[idx].tp60 = true; }

      else if(!trackers[idx].tp80 && ((type==POSITION_TYPE_BUY && price>=levels[3]) ||
         (type==POSITION_TYPE_SELL && price<=levels[3])) && vol>=parts*2)
      { trade.PositionClosePartial(ticket, parts); trackers[idx].tp80 = true; }

      else if(!trackers[idx].tp100 && ((type==POSITION_TYPE_BUY && price>=levels[4]) ||
         (type==POSITION_TYPE_SELL && price<=levels[4])) && vol>0)
      { trade.PositionClose(ticket); trackers[idx].tp100 = true; }
   }
}

// === Manage Open Positions ===
void ManageOpenPositions()
{
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(PositionSelectByTicket(ticket))
      {
         string sym = PositionGetString(POSITION_SYMBOL);
         double entry = PositionGetDouble(POSITION_PRICE_OPEN);
         double tp    = PositionGetDouble(POSITION_TP);
         double sl    = PositionGetDouble(POSITION_SL);
         long type    = PositionGetInteger(POSITION_TYPE);
         double price = (type == POSITION_TYPE_BUY) ? SymbolInfoDouble(sym, SYMBOL_BID)
                                                    : SymbolInfoDouble(sym, SYMBOL_ASK);
         double target = MathAbs(tp - entry);
         double move   = MathAbs(price - entry);

         if(target > 0 && move >= 0.7 * target)
         {
            double profitLock = target * 0.1;
            double newSL = (type == POSITION_TYPE_BUY) ? entry + profitLock
                                                       : entry - profitLock;
            if((type == POSITION_TYPE_BUY && sl < newSL) ||
               (type == POSITION_TYPE_SELL && sl > newSL))
               trade.PositionModify(ticket, newSL, tp);
         }
      }
   }
}

// === Signal Generator ===
int NewSignal(string symbol, int idx)
{
   double emaFast[], emaSlow[], rsi[], atr[], adx[];
   if(CopyBuffer(h[idx].emaFast, 0, 1, 2, emaFast) < 2) return 0;
   if(CopyBuffer(h[idx].emaSlow, 0, 1, 2, emaSlow) < 2) return 0;
   if(CopyBuffer(h[idx].rsi,     0, 1, 2, rsi)     < 2) return 0;
   if(CopyBuffer(h[idx].atr,     0, 1, 2, atr)     < 2) return 0;
   if(CopyBuffer(h[idx].adx,     0, 1, 2, adx)     < 2) return 0;

   double currentATR = atr[1];
   if(currentATR < MinATR) return 0;

   if(adx[1] >= ADXTrendLevel) {
      if(emaFast[1] > emaSlow[1] && rsi[1] > 50)  return 1;
      if(emaFast[1] < emaSlow[1] && rsi[1] < 50)  return -1;
   } else {
      if(rsi[0]<30 && rsi[1]>30) return 1;
      if(rsi[0]>70 && rsi[1]<70) return -1;
   }
   return 0;
}

// === Execute Trade ===
void ExecuteTrade(string symbol, int idx, ENUM_ORDER_TYPE direction)
{
   double atr[];
   if(CopyBuffer(h[idx].atr, 0, 0, 1, atr) < 1) return;
   double slPips = atr[0] * StopLossMultiplier;
   double tpPips = atr[0] * TakeProfitMultiplier;
   double ask = SymbolInfoDouble(symbol, SYMBOL_ASK);
   double bid = SymbolInfoDouble(symbol, SYMBOL_BID);
   if(ask == 0 || bid == 0) return;
   double price = (direction == ORDER_TYPE_BUY) ? ask : bid;
   double sl = (direction == ORDER_TYPE_BUY) ? price - slPips : price + slPips;
   double tp = (direction == ORDER_TYPE_BUY) ? price + tpPips : price - tpPips;
   double slPoints = MathAbs(price - sl) / SymbolInfoDouble(symbol, SYMBOL_POINT);
   double equity = AccountInfoDouble(ACCOUNT_EQUITY);
   double riskAmount = equity * RiskPercent / 100.0;
   double lot = riskAmount / (slPoints * SymbolInfoDouble(symbol, SYMBOL_TRADE_TICK_VALUE));
   if(lot < MinLot) lot = MinLot;
   if(lot > MaxLot) lot = MaxLot;
   lot = NormalizeDouble(lot, 2);

   trade.SetExpertMagicNumber(MagicNumber);
   if(direction == ORDER_TYPE_BUY)
      trade.Buy(lot, symbol, price, sl, tp, NULL);
   else
      trade.Sell(lot, symbol, price, sl, tp, NULL);
}
