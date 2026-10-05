import { useRef, useState } from "react";
export function CafeIllustration() {
  const [connected, setConnected] = useState(true);
  const frame = useRef<HTMLDivElement>(null);
  return (
    <div
      className="cafe-art"
      ref={frame}
      onPointerMove={(e) => {
        if (
          !matchMedia(
            "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          ).matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        frame.current?.style.setProperty(
          "--tilt",
          `${((e.clientX - r.left) / r.width - 0.5) * 5}deg`,
        );
      }}
      onPointerLeave={() => frame.current?.style.setProperty("--tilt", "0deg")}
    >
      <div className="art-caption mono">
        <span>Offline place. Online possibilities.</span>
        <span aria-hidden="true">↙</span>
      </div>
      <svg
        className={connected ? "desk connected" : "desk"}
        viewBox="0 0 580 540"
        role="img"
        aria-labelledby="desk-title desk-desc"
      >
        <title id="desk-title">A connected cyber cafe workstation</title>
        <desc id="desk-desc">
          An original line drawing of a computer on a perspective grid, inspired
          by the supplied sample. Decorative, not a photograph of the cafe.
        </desc>
        <g className="floor" fill="none" stroke="currentColor">
          <path d="M20 422 330 320 568 419 260 530ZM73 443 380 340M134 468 433 362M195 494 490 385M87 399 321 509M164 374 387 487M243 348 467 461" />
        </g>
        <g className="connection-lines" fill="none">
          <path d="M93 260V324Q93 346 116 346H157M445 112H472V283H419M449 375H489V455H348" />
        </g>
        <g className="art-node node-a">
          <rect
            x="24"
            y="209"
            width="108"
            height="54"
            rx="4"
            className="node-shadow"
          />
          <rect
            x="18"
            y="203"
            width="108"
            height="54"
            rx="4"
            className="paper"
          />
          <text x="72" y="235" textAnchor="middle">
            CONNECT
          </text>
          <circle cx="111" cy="215" r="3" className="status-dot" />
        </g>
        <g className="art-node node-b">
          <rect
            x="401"
            y="68"
            width="134"
            height="58"
            rx="4"
            className="node-shadow"
          />
          <rect
            x="395"
            y="62"
            width="134"
            height="58"
            rx="4"
            className="paper"
          />
          <text x="462" y="96" textAnchor="middle">
            CYBER CAFE
          </text>
        </g>
        <g className="monitor">
          <path d="m136 162 240-61 65 34v225l-243 64-62-35Z" className="ink" />
          <path d="m136 162 62 30 243-57-65-34Z" className="gold" />
          <path d="m198 192 243-57v225l-243 64Z" className="paper" />
          <path d="m217 209 204-49v168l-204 53Z" className="screen" />
          <path d="m136 162 62 30v232l-62-35Z" className="side" />
          <path
            d="m288 401 42-12v54l47 24-75 22-50-27 36-12Z"
            className="paper"
          />
          <path d="m252 462 50 27 75-22v12l-75 22-50-26Z" className="gold" />
          <g className="screen-content">
            <path
              d="m239 246 28-7v28l-28 7Zm0 43 67-17M239 300l110-27M239 312l92-22"
              fill="none"
            />
            <path d="m354 198 48-12v115l-48 13Z" className="screen-panel" />
            <path d="m366 213 23-6m-23 19 23-6m-23 19 16-4" fill="none" />
            <text x="275" y="258" transform="rotate(-14 275 258)">
              HELLO_
            </text>
            <circle cx="320" cy="375" r="4" className="status-dot" />
          </g>
        </g>
        <g className="keyboard">
          <path d="m104 438 122-32 71 35-123 35Z" className="paper" />
          <path
            d="m104 438 70 38v9l-70-38Zm70 38 123-35v9l-123 35Z"
            className="gold"
          />
          <g fill="none">
            <path d="m125 437 100-25m-85 33 100-25m-85 33 100-25m-85 33 100-25M143 430l48 24m-29-29 48 24m-29-29 48 24m-29-29 48 24" />
          </g>
        </g>
        <g className="art-node node-c">
          <rect
            x="423"
            y="355"
            width="102"
            height="54"
            rx="4"
            className="node-shadow"
          />
          <rect
            x="417"
            y="349"
            width="102"
            height="54"
            rx="4"
            className="paper"
          />
          <text x="468" y="381" textAnchor="middle">
            SAY HELLO
          </text>
        </g>
      </svg>
      <div className="art-footer">
        <span className="mono">A place to connect</span>
        <button
          className="text-button"
          onClick={() => setConnected(!connected)}
          aria-pressed={connected}
        >
          {connected ? "Disconnect illustration" : "Connect illustration"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
