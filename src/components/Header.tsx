import { useEffect, useRef, useState } from "react";
import { business } from "../config/business";
import { Icon } from "./Icon";
const links = [
  ["Services", "services"],
  ["About", "about"],
  ["Location", "location"],
  ["Contact", "contact"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cafe-theme");
      const d = saved
        ? saved === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(d);
      document.documentElement.dataset.theme = d ? "dark" : "light";
    } catch {
      /* Storage is optional. */
    }
  }, []);
  useEffect(() => {
    function close(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    function outside(e: PointerEvent) {
      if (!header.current?.contains(e.target as Node)) setOpen(false);
    }
    const media = matchMedia("(min-width: 900px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("cafe-theme", next ? "dark" : "light");
    } catch {
      /* Storage is optional. */
    }
  }
  return (
    <header
      className="header"
      ref={header}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <a className="brand" href="#top" aria-label={`${business.name} home`}>
        <Icon name="screen" />
        <span>
          {business.name}
          <small>Cyber cafe</small>
        </span>
      </a>
      <div className="header-controls">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Use ${dark ? "light" : "dark"} theme`}
          aria-pressed={dark}
        >
          <span aria-hidden="true">◐</span>
        </button>
        <button
          ref={trigger}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
      <nav
        id="site-navigation"
        aria-label="Main navigation"
        className={open ? "navigation open" : "navigation"}
      >
        {links.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => {
              setOpen(false);
              requestAnimationFrame(() =>
                document.getElementById(id)?.focus({ preventScroll: true }),
              );
            }}
          >
            {label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
