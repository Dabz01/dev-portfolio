import { useEffect, useState } from "react";
import { DEFAULT_PORTFOLIO, loadPortfolioContent } from "./portfolioContent";

function readContent() {
  try {
    return loadPortfolioContent();
  } catch (error) {
    console.warn("Unable to load saved portfolio content. Using defaults.", error);
    return DEFAULT_PORTFOLIO;
  }
}

function usePortfolioContent() {
  const [content, setContent] = useState(readContent);

  useEffect(() => {
    const refreshContent = () => setContent(readContent());

    window.addEventListener("storage", refreshContent);
    window.addEventListener("portfolio-content-updated", refreshContent);

    return () => {
      window.removeEventListener("storage", refreshContent);
      window.removeEventListener("portfolio-content-updated", refreshContent);
    };
  }, []);

  return content;
}

export default usePortfolioContent;
