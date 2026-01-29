import { Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand / About */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">CallFlow</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering businesses to manage communication efficiently
            with secure and scalable call automation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/dashboard" className="hover:text-gray-200 transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200 transition">
                Prompts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200 transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200 transition">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> support@callflow.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> New Delhi, India
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CallFlow. All rights reserved.
      </div>
    </footer>
  );
};
