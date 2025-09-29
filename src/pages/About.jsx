import React, { useEffect, useState } from 'react';
import { TrendingUp, Target, Eye, Heart, Award, Users, Globe, Shield } from 'lucide-react';
import { getDecryptedData } from '../utils/encryption';
// import { getUserSubscription } from '../api/auth';
import FooterCTA from '../components/FooterCTA';

const About = () => {
  const token = getDecryptedData("token");
  const [userSub, setUserSub] = useState(null);
  useEffect(() => {
    const fetchSub = async () => {
      if (!token) return;
      const data = await getUserSubscription(token);
      setUserSub(data);
    }
    fetchSub();
  }, [])

  return (
    <div className="">
      {/* HERO */}
      <section className="bg-[#0083cf] text-white py-5">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            About Quantum Rise Capital
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Engineering markets with precision and discipline. We build risk-first,
            data-driven trading solutions to help traders thrive in any market.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Quantum Rise Capital, we don’t follow markets — we engineer them. Founded in the UAE,
                we are an algorithmic trading company dedicated to pushing the boundaries of modern finance.
                Our edge comes from the fusion of data science, quantitative research, and precision-built
                trading systems, designed to thrive in both stable and volatile conditions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We build, test, and deploy proprietary Expert Advisors (EAs) that balance high performance
                with strict risk management. Each system is developed through rigorous statistical modeling,
                multi-phase optimization, and live validation. From dynamic grid strategies to adaptive
                momentum engines, our bots aren’t just tools — they’re intelligent capital guardians designed
                for consistent, scalable growth.
              </p>
              <p className="text-lg text-gray-600">
                Beyond trading systems, we offer capital optimization services, prop-firm tailored solutions,
                and portfolio allocation strategies — empowering both individual traders and institutional
                partners to achieve sustainable results.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">UAE</div>
                  <div className="text-gray-600">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                  <div className="text-gray-600">Strategies Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Prop</div>
                  <div className="text-gray-600">Firm Ready</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Global</div>
                  <div className="text-gray-600">Trader Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-gray-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To engineer reliable, risk-first algorithmic trading solutions that empower traders and
                institutions to achieve sustainable, long-term growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the most trusted partner for disciplined, data-driven trading worldwide — where
                clarity, innovation, and resilience define success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Principles that guide every system we build and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Disciplined Risk</h3>
              <p className="text-gray-600">
                We engineer systems that prioritize capital protection and longevity before profit.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data-Driven Precision</h3>
              <p className="text-gray-600">
                Every strategy is statistically validated and adaptive to real market dynamics.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600">
                Clear processes, honest performance tracking, and no hype — just facts and proof.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Partnership</h3>
              <p className="text-gray-600">
                We aim to be long-term partners in your success, not just a provider of tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Culture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Great trading systems come from great teams. We foster innovation, clarity, and disciplined
              collaboration to push algorithmic trading forward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Client Focus</h3>
              <p className="text-gray-600">
                Every decision starts with “How does this protect and grow our clients’ capital?”
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Innovation</h3>
              <p className="text-gray-600">
                We constantly research, test, and refine — building better strategies and technology.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We believe diverse thinking and shared discipline create the strongest solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default About;
