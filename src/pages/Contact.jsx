import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Users, Award, Globe, CheckCircle } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'mckennyfrostism2008@gmail.com',
      secondary: 'kehindeifabumuyi93@gmail.com',
      description: 'For editorial inquiries and manuscript submissions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      primary: '+2348020358706',
      secondary: '+23423333333',
      description: 'Available Monday to Friday, 9 AM - 5 PM CAT'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      primary: '87, Ameen street, Lagos',
      secondary: 'Research City, RC 12345',
      description: 'Our editorial offices and meeting rooms'
    }
  ];

  const stats = [
    { icon: Users, number: '15K+', label: 'Active Authors' },
    { icon: Award, number: '500+', label: 'Publications' },
    { icon: Globe, number: '80+', label: 'Countries' },
    { icon: Clock, number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar/>
      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We've received your message and will get back to you soon.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Get In
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              Connect with our editorial team, submit your research, or explore collaboration opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/20"
            >
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-600 mb-8">We'd love to hear from you. Fill out the form below and we'll get back to you shortly.</p>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                      placeholder="jane.smith@university.edu"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Inquiry Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="submission">Manuscript Submission</option>
                    <option value="review">Peer Review</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                    placeholder="Research collaboration opportunity"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  hoveredCard === index ? 'ring-2 ring-blue-400' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{info.title}</h3>
                    <p className="text-blue-600 font-medium mb-1">{info.primary}</p>
                    <p className="text-gray-600 text-sm mb-2">{info.secondary}</p>
                    <p className="text-gray-500 text-sm">{info.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white">
              <h3 className="font-bold text-xl mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-3 text-left hover:bg-white/30 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="font-medium">Submit Manuscript</div>
                  <div className="text-sm text-blue-100">Start your submission process</div>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-3 text-left hover:bg-white/30 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="font-medium">Reviewer Portal</div>
                  <div className="text-sm text-blue-100">Access peer review system</div>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-3 text-left hover:bg-white/30 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="font-medium">Editorial Board</div>
                  <div className="text-sm text-blue-100">Meet our editorial team</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
      <Footer/>
    </div>
  );
}