import { Link } from "react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import sushankaramLogo from "../../assets/sushankaram-logo.png";

export function Footer() {
  return (
    <footer className="relative z-10 bg-gray-900/95 text-gray-300 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={sushankaramLogo}
                alt="Sushankaram Institute logo"
                className="h-11 w-16 rounded-md object-cover shadow-sm"
              />
              <div>
                <div className="font-bold text-white leading-tight">Sushankaram Institute</div>
                <div className="text-xs text-gray-400">Of Competitive Exams</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Empowering students to achieve their academic and career goals through quality education and dedicated coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-400 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-white mb-4">Our Courses</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">NEET Coaching</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">11th & 12th Classes</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">6th to 10th Tuition</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">Patwari Exam</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">Police Exam</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">JBT & TGT</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-blue-400" />
                <span>Raja Ka Talab Main Bazzar, Teh Fathepur, Distt Kangra</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <a href="tel:8894590374" className="hover:text-blue-400 transition-colors">
                  +91 8894590374
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <a href="mailto:info@sushankaram.com" className="hover:text-blue-400 transition-colors">
                  sushankaraminstitute@gmail.com
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sushankaram Institute of Competitive Exams. All rights reserved. Managed By RAPITA Digital Productions</p>
        </div>
      </div>
    </footer>
  );
}
