import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-serif text-lg font-medium">Percepta AI</p>
                <p className="text-sm text-muted-foreground">AI Initiative</p>
              </div>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-8">
              <a
                href="#upload"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Analysis
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Research
              </a>
            </nav>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Percepta. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
