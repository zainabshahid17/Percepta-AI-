import { Brain, Eye, Cpu, Lightbulb } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Eye,
      title: "Image Captioning",
      description:
        "State-of-the-art neural networks transform visual content into natural language descriptions with remarkable accuracy.",
    },
    {
      icon: Activity,
      title: "Action Recognition",
      description:
        "Advanced temporal modeling identifies and classifies human activities from static images.",
    },
    //   {
    //     icon: Brain,
    //     title: "Deep Learning",
    //     description:
    //       "Powered by sophisticated CNN architectures and attention mechanisms trained on extensive visual datasets.",
    //   },
    //   {
    //     icon: Lightbulb,
    //     title: "Research-Driven",
    //     description:
    //       "Developed as part of RHSI's ongoing research into practical applications of computer vision and AI.",
    //   },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            About the Research
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium mb-8">
            The Science Behind the Vision
          </h2>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            This project represents the intersection of cutting-edge computer
            vision research and practical AI applications. Our models leverage
            the latest advances in deep learning to understand and interpret
            visual content with unprecedented accuracy.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-card hover-lift rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Academic context */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="glass-card rounded-2xl p-10 text-center">
            <Cpu className="w-10 h-10 text-primary mx-auto mb-6" />
            <h3 className="font-serif text-2xl font-medium mb-4">
              Technical Foundation
            </h3>
            <p className="font-sans text-muted-foreground leading-relaxed mb-6">
              Our image captioning system utilizes an encoder-decoder
              architecture with attention mechanisms, while action recognition
              employs spatiotemporal feature extraction. Both models are
              fine-tuned on domain-specific datasets to ensure optimal
              performance.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["PyTorch", "CNN", "LSTM", "Attention", "ResNet"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Fix missing import
import { Activity } from "lucide-react";

export default About;
