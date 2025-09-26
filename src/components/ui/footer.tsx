import { Link } from "react-router-dom";
import { Youtube, Instagram, Twitter, Facebook } from "lucide-react";
import logoImg from "@/assets/basketball-orbit-logo.webp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@basketballorbit", label: "YouTube" },
    { icon: Instagram, href: "https://www.instagram.com/basketball_orbit", label: "Instagram" },
    /*{ icon: Twitter, href: "#", label: "Twitter" },*/
    /*{ icon: Facebook, href: "#", label: "Facebook" },*/
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Affiliate Disclosure", path: "/affiliate" },
    { name: "Legal", path: "/legal" },
  ];

  const quickLinks = [
    { name: "Drill Library", path: "/drills" },
    { name: "Blog", path: "/blog" },
    { name: "Newsletter", path: "/newsletter" },
    { name: "About", path: "/about" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImg} 
                alt="Basketball Orbit" 
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl text-foreground">
                Basketball Orbit
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your go-to hub for modern youth basketball coaching. Get innovative drills, 
              strategies, and resources to improve your coaching worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} Basketball Orbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
