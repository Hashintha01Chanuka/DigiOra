import React, { useEffect } from 'react';
import { CheckCircle, Users, Target, TrendingUp, Award, ArrowRight } from 'lucide-react';

const About = () => {
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-animation').forEach(el => observer.observe(el));
    return () => document.querySelectorAll('.scroll-animation').forEach(el => observer.unobserve(el));
  }, []);

  return (
    <>
      <style jsx global>{`
        .scroll-animation { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.4,0,0.2,1);}
        .animate-in { opacity: 1; transform: translateY(0);}
        .delay-200 { transition-delay: 200ms;}
        .delay-400 { transition-delay: 400ms;}
        .delay-600 { transition-delay: 600ms;}
        .btn-hover { transition: all 0.3s ease; }
        .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3); }
      `}</style>
      <section id="about" className="scroll-animation py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="scroll-animation delay-200 mb-8">
                <div className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-6">
                  Our Story
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Driven To <span className='text-red-600'>Inspire</span>
                </h2>
              </div>
              <p className="scroll-animation delay-400 text-xl text-gray-600 mb-6 leading-relaxed font-light">
                We are thought leaders and self-starters with a passion for uncovering hidden potential in digital marketing technology.
              </p>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                At DigiOra Media, we champion innovation by partnering with the best minds in the industry to deliver comprehensive digital marketing solutions that drive measurable results.
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Innovation</h3>
                    <p className="text-gray-600 leading-relaxed">Cutting-edge digital marketing strategies that set new industry standards and drive unprecedented growth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Results-Driven Approach</h3>
                    <p className="text-gray-600 leading-relaxed">Every campaign is meticulously designed to deliver measurable ROI and sustainable business growth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Perspective</h3>
                    <p className="text-gray-600 leading-relaxed">Local expertise combined with global reach and international best practices for maximum impact.</p>
                  </div>
                </div>
              </div>

              <div className="scroll-animation delay-600">
               
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="h-36 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center group hover:from-red-100 hover:to-red-200 transition-all duration-300">
                    <Users className="w-10 h-10 text-red-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="h-56 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center group hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg">
                    <Target className="w-14 h-14 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group hover:from-gray-100 hover:to-gray-200 transition-all duration-300">
                    <TrendingUp className="w-14 h-14 text-gray-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="h-36 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg">
                    <Award className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;