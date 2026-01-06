import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-8">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-serif text-6xl font-medium mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="editorial" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
