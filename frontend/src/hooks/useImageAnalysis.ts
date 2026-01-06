import { useState } from "react";

type AnalysisType = "caption" | "action" | "combined";

interface ActionResult {
  action: string;
  confidence: number;
}

interface AnalysisResults {
  caption?: string;
  actions?: ActionResult[];
}

interface RawPrediction {
  class?: string;
  class_name?: string;
  action?: string;
  label?: string;
  confidence?: number;
  score?: number;
  probability?: number;
}

// Default API base URL - can be configured based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useImageAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File, type: AnalysisType) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      let endpoint = "";
      switch (type) {
        case "caption":
          endpoint = "/api/caption";
          break;
        case "action":
          endpoint = "/api/action";
          break;
        case "combined":
          endpoint = "/api/combined";
          break;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Parse response based on type
      const newResults: AnalysisResults = {};

      if (type === "caption" || type === "combined") {
        newResults.caption = data.caption;
      }

      // Helper to parse predictions array - handles various backend formats
      const parsePredictions = (
        predictions: RawPrediction[]
      ): ActionResult[] => {
        return predictions.map((pred) => {
          // Handle different possible field names from backend
          const actionName =
            pred.class ||
            pred.class_name ||
            pred.action ||
            pred.label ||
            "unknown";
          const conf = pred.confidence ?? pred.score ?? pred.probability ?? 0;
          // Normalize confidence to 0-1 range (backend might send 0-100 or 0-1)
          const normalizedConf = conf > 1 ? conf / 100 : conf;
          return { action: actionName, confidence: normalizedConf };
        });
      };

      if (type === "action") {
        // Action endpoint: { predicted_action, confidence, all_predictions }
        if (data.all_predictions && Array.isArray(data.all_predictions)) {
          newResults.actions = parsePredictions(data.all_predictions);
        } else if (data.predicted_action) {
          const conf = data.confidence ?? 95;
          newResults.actions = [
            {
              action: data.predicted_action,
              confidence: conf > 1 ? conf / 100 : conf,
            },
          ];
        }
      }

      if (type === "combined") {
        // Combined endpoint: { caption, action: { predicted_action, confidence, all_predictions } }
        const actionData = data.action || data;
        if (
          actionData?.all_predictions &&
          Array.isArray(actionData.all_predictions)
        ) {
          newResults.actions = parsePredictions(actionData.all_predictions);
        } else if (actionData?.predicted_action) {
          const conf = actionData.confidence ?? 95;
          newResults.actions = [
            {
              action: actionData.predicted_action,
              confidence: conf > 1 ? conf / 100 : conf,
            },
          ];
        }
      }

      setResults(newResults);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Analysis failed";
      setError(errorMessage);

      // For demo purposes, show mock results if API is unavailable
      if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("NetworkError")
      ) {
        setResults({
          caption:
            type !== "action"
              ? "A person performing an activity in a well-lit environment, demonstrating natural movement and expression."
              : undefined,
          actions:
            type !== "caption"
              ? [
                  { action: "walking", confidence: 0.87 },
                  { action: "standing", confidence: 0.72 },
                  { action: "talking", confidence: 0.45 },
                ]
              : undefined,
        });
        setError("Demo mode: Using sample results (API not connected)");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  return {
    isLoading,
    results,
    error,
    analyzeImage,
    clearResults,
  };
};
