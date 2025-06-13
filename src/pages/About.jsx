import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Globe, Target, Eye, Heart } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
{/* Ok it cold but i'm but im cold (mckennie)*/}
  const stats = [
    { number: "50K+", label: "Readers Monthly", icon: Users },
    { number: "1,200+", label: "Published Articles", icon: BookOpen },
    { number: "25+", label: "Countries Reached", icon: Globe },
    { number: "15", label: "Awards Won", icon: Award }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Editor-in-Chief",
      bio: "Leading researcher in contemporary studies with 15+ years of editorial experience.",
      initial: "SC"
    },
    {
      name: "Clinton Soft",
      role: "Managing Editor",
      bio: "Award-winning journalist and published author specializing in investigative reporting.",
      initial: "MR"
    },
    {
      name: "Hamzat Daodu",
      role: "Senior Editor",
      bio: "Academic specialist in interdisciplinary research and peer review processes.",
      initial: "AH"
    },
    {
      name: "Olanrewaju Abioye",
      role: "Digital Director",
      bio: "Technology innovator focused on making scholarly content accessible worldwide.",
      initial: "JT"
    }
  ];

  const values = [
    {
      icon: Eye,
      title: "Transparency",
      description: "We maintain the highest standards of editorial integrity and open peer review processes."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Every piece we publish undergoes rigorous review to ensure quality and accuracy."
    },
    {
      icon: Heart,
      title: "Impact",
      description: "We're committed to publishing research that makes a meaningful difference in the world."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
    <Navbar/>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Insights Journal
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Advancing knowledge through rigorous research, innovative thinking, and scholarly excellence. 
              We bridge the gap between academic discovery and real-world impact.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className={`text-center transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Our Story */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
            <div className="border-l-4 border-indigo-500 pl-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Founded in 2025, Insights Journal emerged from a vision to create a platform where groundbreaking research meets accessibility. We recognized the need for a publication that could bridge the often complex world of academic research with practical applications that benefit society.
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Our interdisciplinary approach brings together researchers, practitioners, and thought leaders from diverse fields including technology, social sciences, environmental studies, and innovation management.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Today, we're proud to be a leading voice in contemporary research, known for our rigorous peer review process and commitment to open access publishing.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
            <div className="border-l-4 border-purple-500 pl-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                To advance human knowledge by publishing high-quality, peer-reviewed research that addresses the most pressing challenges of our time while remaining accessible to both academic and general audiences.
              </p>
              
              <div className="space-y-6">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Standards */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Editorial Standards</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We maintain the highest standards of academic integrity and editorial excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Rigorous Review</h3>
              <p className="text-gray-300">
                Every submission undergoes double-blind peer review by leading experts in the field
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Open Access</h3>
              <p className="text-gray-300">
                We believe knowledge should be freely accessible to researchers and the public worldwide
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Ethical Publishing</h3>
              <p className="text-gray-300">
                We adhere to the highest ethical standards in research publication and data integrity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Editorial Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals who ensure every publication meets our exacting standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {member.initial}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Whether you're a researcher, practitioner, or curious mind, we invite you to be part of our mission to advance knowledge and create positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Submit Research
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-300">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}