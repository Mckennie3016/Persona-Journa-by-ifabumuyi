import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Camera, Briefcase, MapPin, Star, Users, Shield, Zap, Heart, Calendar, PenTool } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const JournalHomeLanding = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Personal Diary",
      description: "Capture your daily thoughts, emotions, and experiences in a private, secure space",
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
      path: "/diary"
    },
    {
      icon: Camera,
      title: "Precious Memories",
      description: "Preserve life's beautiful moments with photos, videos, and rich storytelling",
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      path: "/memories"
    },
    {
      icon: Briefcase,
      title: "Work Journal",
      description: "Track your professional growth, achievements, and career milestones",
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
      path: "/work"
    },
    {
      icon: MapPin,
      title: "Travel Adventures",
      description: "Document your journeys, discoveries, and adventures around the world",
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50",
      path: "/travel"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Writer & Blogger",
      content: "This journal app has transformed how I document my life. The different journal types help me keep everything organized while maintaining a beautiful, cohesive experience.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Michael Chen",
      role: "Travel Photographer",
      content: "As someone who travels constantly, the travel journal feature is a game-changer. I can finally keep all my adventures in one beautiful place with photos and notes.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "HR Manager",
      content: "The work journal has helped me track my professional development like never before. I've gotten two promotions since I started using it to document my achievements!",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your private thoughts are protected with end-to-end encryption and biometric authentication"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed so you can capture thoughts as they come, without waiting"
    },
    {
      icon: Heart,
      title: "Designed for Wellbeing",
      description: "Thoughtful features that encourage reflection and mindfulness"
    },
    {
      icon: Calendar,
      title: "Smart Reminders",
      description: "Customizable prompts to help you maintain your journaling habit"
    },
    {
      icon: PenTool,
      title: "Beautiful Customization",
      description: "Personalize your journals with themes, fonts, and layouts"
    },
    {
      icon: Users,
      title: "Shared Journals",
      description: "Collaborate on journals with loved ones for special occasions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <NavBar/>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 md:pt-32 md:pb-48">
          <div className="relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
              <span className="block">Your Life,</span>
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Beautifully Documented
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10">
              Capture memories, reflect on experiences, and track personal growth across every aspect of your life with our beautifully designed journaling platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free Journal
              </Link>
              <Link 
                to="/features" 
                className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-slate-200 transition-all duration-300"
              >
                Explore Features
              </Link>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-4xl h-96 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-11/12 h-4/5 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 mt-10 flex">
                    <div className="w-1/4 h-full bg-slate-50 border-r border-slate-200 p-4">
                      <div className="space-y-1">
                        {features.map((feature, index) => (
                          <div key={index} className={`p-3 rounded-lg flex items-center space-x-2 ${currentFeature === index ? 'bg-blue-100' : 'hover:bg-slate-100'}`}>
                            <feature.icon className={`w-5 h-5 ${currentFeature === index ? 'text-blue-600' : 'text-slate-500'}`} />
                            <span className={`text-sm font-medium ${currentFeature === index ? 'text-blue-800' : 'text-slate-700'}`}>{feature.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-3/4 h-full p-6">
                      <div className="h-full flex flex-col">
                        <div className="flex-1 bg-white rounded-lg border border-slate-200 p-6">
                          <h3 className="text-xl font-bold text-slate-800 mb-4">{features[currentFeature].title}</h3>
                          <p className="text-slate-600 mb-6">{features[currentFeature].description}</p>
                          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-200 to-blue-200 flex items-center justify-center">
                                <Star className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-700">Today's prompt: <span className="font-medium">What are you most grateful for today?</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Cloud */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-slate-500 tracking-wide mb-8">
            Trusted by journalers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            <img className="h-8 opacity-60 hover:opacity-100 transition-opacity" src="https://logo.clearbit.com/forbes.com" alt="Forbes" />
            <img className="h-8 opacity-60 hover:opacity-100 transition-opacity" src="https://logo.clearbit.com/psychologytoday.com" alt="Psychology Today" />
            <img className="h-8 opacity-60 hover:opacity-100 transition-opacity" src="https://logo.clearbit.com/mindbodygreen.com" alt="MindBodyGreen" />
            <img className="h-8 opacity-60 hover:opacity-100 transition-opacity" src="https://logo.clearbit.com/theguardian.com" alt="The Guardian" />
            <img className="h-8 opacity-60 hover:opacity-100 transition-opacity" src="https://logo.clearbit.com/inc.com" alt="Inc. Magazine" />
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Four Journals, One
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Beautiful Experience</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Each journal is crafted for a specific aspect of your life, giving you the perfect space to capture what matters most.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;
              return (
                <Link to={feature.path} key={index} className="block">
                  <div
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 transform ${
                      isActive 
                        ? `${feature.bg} scale-105 shadow-xl border-2 border-purple-200` 
                        : 'hover:bg-slate-50 hover:shadow-lg border-2 border-transparent'
                    }`}
                    onClick={() => setCurrentFeature(index)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="relative hidden lg:block">
            <div className={`absolute inset-0 bg-gradient-to-br ${features[currentFeature].color} rounded-3xl shadow-2xl opacity-20 blur-3xl`}></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              <div className="h-96 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className={`p-5 rounded-full bg-gradient-to-r ${features[currentFeature].color} shadow-lg inline-block mb-6`}>
                    
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{features[currentFeature].title}</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">{features[currentFeature].description}</p>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200 max-w-sm mx-auto">
                    <p className="text-sm text-slate-700">Example entry from this journal:</p>
                    <p className="text-sm italic text-slate-600 mt-2">"Today I discovered something amazing about myself..."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Millions Choose Our Journal
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Designed with care to support your journey of self-discovery and memory preservation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 w-fit mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-300">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Loved By Journalers Worldwide
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands who have transformed their journaling experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-slate-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 italic">"{testimonial.content}"</p>
                <div className="mt-4 flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Start for free, upgrade when you're ready
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                <p className="text-slate-600 mb-6">Perfect for casual journaling</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">1 Journal Type</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Basic Entries</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">10MB Storage</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-500 transform md:scale-105 relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium</h3>
                <p className="text-slate-600 mb-6">For dedicated journalers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$8</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">All Journal Types</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Rich Media Entries</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">10GB Storage</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Advanced Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Priority Support</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Family</h3>
                <p className="text-slate-600 mb-6">Share with loved ones</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$15</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Everything in Premium</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Up to 5 Users</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Shared Journals</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">50GB Storage</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                  Choose Family
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 text-slate-600">
            <p>All plans come with a 30-day money-back guarantee.</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Jump to Your Favorite Journal
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link 
                  to={feature.path} 
                  key={index}
                  className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${feature.bg} hover:shadow-md`}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg w-fit mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journaling Journey?
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10">
            Join millions of people documenting their lives in a more meaningful way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Create Your Free Account
            </Link>
            <Link 
              to="/demo" 
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-white transition-all duration-300"
            >
              Take a Quick Tour
            </Link>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default JournalHomeLanding;