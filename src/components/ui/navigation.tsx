import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/basketball-orbit-logo.webp";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Drill Library", path: "/drills" },
    { name: "Blog", path: "/blog" },
    { name: "Practice Planner", href: "https://app.bballorbit.com/" },
    { name: "About", path: "/about" },
  ] as const;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 transition-smooth hover:scale-105">
            <img 
              src={logoImg} 
              alt="Basketball Orbit" 
              className="h-10 w-auto"
              loading="lazy"
            />
            <span className="font-bold text-xl hidden sm:block text-foreground">
              Basketball Orbit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => {
              if ("href" in item) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} (opens in a new tab)`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
                  >
                    {item.name}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-smooth hover:text-primary ${
                    isActive(item.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Button 
              variant="default" 
              size="sm" 
              asChild
              className="shadow-orange"
            >
              <Link to="/resources">Get Free Drills</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                if ("href" in item) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.name} (opens in a new tab)`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium transition-smooth hover:text-primary ${
                      isActive(item.path) ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Button 
                variant="default" 
                size="sm" 
                asChild
                className="w-fit shadow-orange"
              >
                <Link to="/resources" onClick={() => setIsMenuOpen(false)}>
                  Get Free Drills
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
