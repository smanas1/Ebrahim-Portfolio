import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'} border-t pt-16 pb-8`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'} mb-4`}>
              EBRAHIM KAMAL
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Sourcing & Logistics Expert helping businesses navigate global
              trade.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-emerald-500' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-emerald-500' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Services</h4>
            <ul className="space-y-2">
              {[
                "Product Sourcing",
                "Quality Control",
                "Logistics",
                "Fulfillment",
              ].map((s, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`${theme === 'dark' ? 'text-gray-400 hover:text-emerald-500' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Links</h4>
            <ul className="space-y-2">
              {["About Me", "Products", "Blog", "Contact"].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`${theme === 'dark' ? 'text-gray-400 hover:text-emerald-500' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'} mt-0.5`} />
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>+8801750062927</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'} mt-0.5`} />
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>thisisebrahim@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'} mt-0.5`} />
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Rajshahi, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={`pt-8 border-t ${theme === 'dark' ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-600'} text-center text-sm`}>
          <p>
            © {new Date().getFullYear()} Ebrahim Mohammad Kamal. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
