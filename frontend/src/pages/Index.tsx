import { useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageUpload from "@/components/ImageUpload";
import Results from "@/components/Results";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { useImageAnalysis } from "@/hooks/useImageAnalysis";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const uploadRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isLoading, results, error, analyzeImage } = useImageAnalysis();
  const { toast } = useToast();

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = async (
    file: File,
    type: "caption" | "action" | "combined"
  ) => {
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Run analysis
    await analyzeImage(file, type);

    // Show notification
    if (error) {
      toast({
        title: "Analysis Note",
        description: error,
        variant: error.includes("Demo") ? "default" : "destructive",
      });
    } else {
      toast({
        title: "Analysis Complete",
        description: "Your image has been successfully analyzed.",
      });
    }

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero onScrollToUpload={scrollToUpload} />
        <ImageUpload
          ref={uploadRef}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />
        <div id="results">
          <Results
            caption={results?.caption}
            actions={results?.actions}
            imagePreview={imagePreview || undefined}
            isVisible={!!results}
          />
        </div>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
