import { useEffect } from "react";

let scriptLoaded = false;

export const useGoogleTranslate = () => {
  useEffect(() => {
    // Only load script once
    if (!scriptLoaded && !window.googleTranslateElementInit) {
      scriptLoaded = true;
      
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);

      window.googleTranslateElementInit = () => {
        // Only initialize if element exists
        if (document.getElementById("google_translate_element")) {
          if (window.google?.translate?.TranslateElement) {
            new window.google.translate.TranslateElement(
              { 
                pageLanguage: "en",
                includedLanguages: "en,zh-CN,ms,ta"
              },
              "google_translate_element"
            );
          }
        }
      };
    } else if (window.google?.translate?.TranslateElement && document.getElementById("google_translate_element")) {
      // If script already loaded, reinitialize for this page
      try {
        new window.google.translate.TranslateElement(
          { 
            pageLanguage: "en",
            includedLanguages: "en,zh-CN,ms,ta"
          },
          "google_translate_element"
        );
      } catch (e) {
        console.log("Google Translate already initialized");
      }
    }
  }, []);
};
