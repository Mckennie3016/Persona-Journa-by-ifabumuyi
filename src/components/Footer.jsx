import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">YourCompany</h3>
            <p className="text-gray-300 text-sm">
              Building digital solutions that make a difference.
            </p>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin size={14} />
                <span>123 Why you wan know street, Lagos</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail size={14} />
                <span>hello@yourcompany.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Links</h4>
            <ul className="space-y-1">
              {['About', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: '' },
                { Icon: Instagram, href: 'https://www.instagram.com/mckennie_3016/' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/kehinde-ifabumuyi-4a3942331/' },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-300 text-sm">
          © 2025 YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
}