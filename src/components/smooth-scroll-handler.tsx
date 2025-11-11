"use client";

import { useEffect } from "react";

const SmoothScrollHandler = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href*='#contact']") as HTMLAnchorElement;
      
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#contact")) return;
      
      // Only handle hash-only links on the same page
      // Let Next.js Link handle navigation to other pages
      if (href.startsWith("#contact") && window.location.pathname === "/") {
        e.preventDefault();
        const targetElement = document.getElementById("contact");
        if (targetElement) {
          requestAnimationFrame(() => {
            const viewportHeight = window.innerHeight;
            const elementRect = targetElement.getBoundingClientRect();
            const elementTop = elementRect.top + window.pageYOffset;
            const elementHeight = elementRect.height;
            const scrollPosition = elementTop + (elementHeight / 2) - (viewportHeight / 2);
            
            window.scrollTo({
              top: Math.max(0, scrollPosition),
              behavior: "smooth",
            });
          });
        }
      }
      // For links to home page with contact hash, let Next.js handle it
      // The page load handler will scroll to contact
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, []);

  // Handle hash changes on page load (including query parameters)
  useEffect(() => {
    const scrollToContact = () => {
      const hash = window.location.hash;
      const hasContactHash = hash === "#contact" || hash.endsWith("#contact");
      const hasPartParam = new URLSearchParams(window.location.search).has("part");
      
      if (hasContactHash || hasPartParam) {
        const targetElement = document.getElementById("contact");
        if (targetElement) {
          // Wait a bit for the page to render, especially if navigating from another page
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
          }, 200);
        }
      }
    };

    // Scroll on initial load
    scrollToContact();

    // Also listen for hash changes
    window.addEventListener("hashchange", scrollToContact);
    
    return () => {
      window.removeEventListener("hashchange", scrollToContact);
    };
  }, []);

  return null;
};

export default SmoothScrollHandler;

