import { Quote, Activity, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionResult {
  action: string;
  confidence: number;
}

interface ResultsProps {
  caption?: string;
  actions?: ActionResult[];
  imagePreview?: string;
  isVisible: boolean;
}

const Results = ({
  caption,
  actions,
  imagePreview,
  isVisible,
}: ResultsProps) => {
  if (!isVisible) return null;

  const hasCaption = !!caption;
  const hasActions = actions && actions.length > 0;

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-6 md:px-12">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Analysis Results
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium">
            Insights Revealed
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image preview card */}
            {imagePreview && (
              <div className="glass-card rounded-2xl overflow-hidden animate-scale-in">
                <img
                  src={imagePreview}
                  alt="Analyzed image"
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
            )}

            {/* Results content */}
            <div className="space-y-6">
              {/* Caption result */}
              {hasCaption && (
                <div className="glass-card rounded-2xl p-8 animate-fade-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium">
                        Image Caption
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        AI-generated description
                      </p>
                    </div>
                  </div>
                  <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed text-foreground/90">
                    "{caption}"
                  </blockquote>
                </div>
              )}

              {/* Action recognition results */}
              {hasActions && (
                <div className="glass-card rounded-2xl p-8 animate-fade-up delay-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium">
                        Recognized Actions
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Detected activities
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {actions.map((action, index) => {
                      const percentage = isNaN(action.confidence)
                        ? 0
                        : action.confidence * 100;
                      const isTopResult = index === 0;

                      return (
                        <div
                          key={index}
                          className={cn(
                            "relative overflow-hidden rounded-xl transition-all duration-300",
                            isTopResult
                              ? "bg-primary/10 border border-primary/20 p-5"
                              : "bg-background/50 p-4 hover:bg-background/70"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {isTopResult && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                                  Top Match
                                </span>
                              )}
                              <span
                                className={cn(
                                  "font-medium capitalize",
                                  isTopResult ? "text-lg" : "text-base"
                                )}
                              >
                                {action.action.replace(/_/g, " ")}
                              </span>
                            </div>
                            <span
                              className={cn(
                                "font-semibold tabular-nums",
                                isTopResult
                                  ? "text-xl text-primary"
                                  : "text-sm text-muted-foreground"
                              )}
                            >
                              {percentage.toFixed(1)}%
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all duration-500 ease-out",
                                isTopResult
                                  ? "bg-primary"
                                  : "bg-muted-foreground/40"
                              )}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!hasCaption && !hasActions && (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <p className="text-muted-foreground">
                    No results to display yet. Upload an image to begin
                    analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
