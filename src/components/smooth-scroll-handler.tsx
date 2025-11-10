"use client";

import { useEffect } from "react";

const SmoothScrollHandler = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href*='#contact']") as HTMLAnchorElement;
      
      if (!anchor) return;
      
      e.preventDefault();
      
      const targetElement = document.getElementById("contact");
      if (targetElement) {
        // Wait for any pending renders
        requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight;
          const elementRect = targetElement.getBoundingClientRect();
          const elementTop = elementRect.top + window.pageYOffset;
          const elementHeight = elementRect.height;
          
          // Calculate scroll position to center the form box vertically in viewport
          // We want the center of the form box to be at the center of the viewport
          const scrollPosition = elementTop + (elementHeight / 2) - (viewportHeight / 2);
          
          window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: "smooth",
          });
        });
      } else {
        // Fallback to normal anchor behavior if element not found
        const href = anchor.getAttribute("href");
        if (href) {
          window.location.href = href;
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, []);

  // Also handle hash changes on page load
  useEffect(() => {
    if (window.location.hash === "#contact") {
      const targetElement = document.getElementById("contact");
      if (targetElement) {
        setTimeout(() => {
          const viewportHeight = window.innerHeight;
          const elementRect = targetElement.getBoundingClientRect();
          const elementTop = elementRect.top + window.pageYOffset;
          const elementHeight = elementRect.height;
          const scrollPosition = elementTop + (elementHeight / 2) - (viewportHeight / 2);
          
          window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, []);

  return null;
};

export default SmoothScrollHandler;

