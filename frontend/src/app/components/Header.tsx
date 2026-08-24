import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";
import sushankaramLogo from "../../assets/sushankaram-logo.png";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/92 border-b shadow-sm backdrop-blur-xl">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:8894590374" className="flex items-center gap-1 hover:text-blue-100">
                <Phone className="w-3 h-3" />
                <span>+91 8894590374</span>
              </a>
              <a href="mailto:sushankaraminstitute@gmail.com" className="hidden sm:flex items-center gap-1 hover:text-blue-100">
                <Mail className="w-3 h-3" />
                <span>sushankaraminstitute@gmail.com</span>
              </a>
            </div>
            <div className="text-xs sm:text-sm">
              Raja Ka Talab Main Bazzar, Fathepur, Kangra
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 transition-transform hover:-translate-y-0.5">
            <img
              src={sushankaramLogo}
              alt="Sushankaram Institute logo"
              className="h-12 w-16 rounded-md object-cover shadow-sm sm:w-20"
            />
            <div>
              <div className="font-bold text-lg leading-tight text-gray-900">Sushankaram Institute</div>
              <div className="text-xs text-gray-600">Of Competitive Exams</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md transition-all hover:-translate-y-0.5 ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="https://wa.me/918894590374" target="_blank" rel="noopener noreferrer">
                Enroll Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 transition-transform hover:scale-105"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-md transition-all hover:translate-x-1 ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <a href="https://wa.me/918894590374" target="_blank" rel="noopener noreferrer">
                    Enroll Now
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
