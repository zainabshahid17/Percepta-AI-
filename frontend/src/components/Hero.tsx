import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onScrollToUpload: () => void;
}

const Hero = ({ onScrollToUpload }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/40 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 left-16 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-float delay-200" />

      <div className="container relative z-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow text */}
          <p className="text-sm md:text-base font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6 animate-fade-up opacity-0">
            Action Recognition & Image Captioning AI
          </p>

          {/* Main headline */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8 animate-fade-up opacity-0 delay-100">
            Understanding Images
            <span className="block mt-2 italic text-primary">
              Through Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up opacity-0 delay-200">
            Advanced AI-powered image captioning and action recognition.
            Transform visual content into meaningful insights with elegant
            precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up opacity-0 delay-300">
            <Button
              variant="editorial"
              size="xl"
              onClick={onScrollToUpload}
              className="group"
            >
              Begin Analysis
              <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button
              variant="minimal"
              size="lg"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-up opacity-0 delay-500">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
