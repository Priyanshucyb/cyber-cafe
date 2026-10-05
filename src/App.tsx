import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { About } from "./sections/About";
import { Location } from "./sections/Location";
import { Contact } from "./sections/Contact";
import { contentPending } from "./lib/business";
export default function App() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {contentPending && (
        <div className="configuration-notice">
          Client information pending{" "}
          <span>· Bracketed details must be confirmed before launch.</span>
        </div>
      )}
      <Header />
      <main id="main" tabIndex={-1}>
        <div id="top" />
        <Hero />
        <Services />
        <About />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
