import { useState, useCallback, forwardRef } from "react";
import { Upload, Image as ImageIcon, Sparkles, Activity, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnalysisType = "caption" | "action" | "combined";

interface ImageUploadProps {
  onAnalyze: (file: File, type: AnalysisType) => void;
  isLoading: boolean;
}

const ImageUpload = forwardRef<HTMLDivElement, ImageUploadProps>(
  ({ onAnalyze, isLoading }, ref) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedType, setSelectedType] = useState<AnalysisType>("combined");

    const handleFile = useCallback((file: File) => {
      if (file && file.type.startsWith("image/")) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
      },
      [handleFile]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
      setIsDragging(false);
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    };

    const analysisOptions = [
      {
        type: "caption" as AnalysisType,
        icon: Sparkles,
        label: "Generate Caption",
        description: "Describe what's in the image",
      },
      {
        type: "action" as AnalysisType,
        icon: Activity,
        label: "Recognize Action",
        description: "Identify the activity being performed",
      },
      {
        type: "combined" as AnalysisType,
        icon: Layers,
        label: "Combined Analysis",
        description: "Full caption and action recognition",
      },
    ];

    return (
      <section ref={ref} id="upload" className="py-24 md:py-32">
        <div className="container px-6 md:px-12">
          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Analysis Studio
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-medium mb-6">
              Upload Your Image
            </h2>
            <p className="font-sans text-muted-foreground text-lg">
              Select an image and choose your analysis type for intelligent insights
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Upload card */}
            <div
              className={cn(
                "glass-card rounded-2xl p-8 md:p-12 transition-all duration-300",
                isDragging && "ring-2 ring-primary scale-[1.01]"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {/* Image preview or upload zone */}
              <div className="mb-8">
                {preview ? (
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-80 object-contain rounded-xl"
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreview(null);
                      }}
                      className="absolute top-4 right-4 bg-foreground/80 text-background px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-accent/30 transition-all duration-300">
                    <div className="flex flex-col items-center text-center p-6">
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                        <Upload className="w-7 h-7 text-accent-foreground" />
                      </div>
                      <p className="font-sans text-lg font-medium mb-2">
                        Drop your image here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse from your device
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Analysis type selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {analysisOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSelectedType(option.type)}
                    className={cn(
                      "p-5 rounded-xl border-2 text-left transition-all duration-300",
                      selectedType === option.type
                        ? "border-primary bg-accent/50"
                        : "border-border hover:border-primary/30 hover:bg-accent/20"
                    )}
                  >
                    <option.icon
                      className={cn(
                        "w-6 h-6 mb-3",
                        selectedType === option.type
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                    <p className="font-medium mb-1">{option.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Analyze button */}
              <Button
                variant="editorial"
                size="xl"
                className="w-full"
                disabled={!selectedFile || isLoading}
                onClick={() => selectedFile && onAnalyze(selectedFile, selectedType)}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5" />
                    Analyze Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
