/**
 * Organism: the drawn Algoma scene behind the Home headline (HERO-2). Lake
 * Superior, granite shore, spruce, birch and one maple, parameterized by
 * season, condition and night. Every colour is a token reference (DSN-10);
 * the scene is decorative (HERO-9) and carries no text (HERO-8).
 */
import { useId } from "react";
import { sceneFor, type SceneState } from "@/lib/scene";

export function HeroScene(state: SceneState) {
  const s = sceneFor(state);
  const star = "fill-[var(--dp-moon)]";
  // Each instance needs its own gradient id, or the first scene on a page paints every sky.
  const skyId = `hero-sky-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className="block h-full w-full"
      data-testid="hero-scene"
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: s.skyTop }} />
          <stop offset="1" style={{ stopColor: s.skyBottom }} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1200" height="520" fill={`url(#${skyId})`} />

      {s.sun ? <circle cx="960" cy="120" r="38" style={{ fill: "var(--dp-sun)" }} /> : null}
      {s.moon ? (
        <g>
          <circle cx="960" cy="120" r="30" style={{ fill: "var(--dp-moon)" }} />
          <circle className={`hero-star ${star}`} cx="180" cy="80" r="2" />
          <circle className={`hero-star ${star}`} cx="320" cy="140" r="1.5" />
          <circle className={`hero-star ${star}`} cx="520" cy="60" r="2" />
          <circle className={`hero-star ${star}`} cx="700" cy="110" r="1.5" />
          <circle className={`hero-star ${star}`} cx="820" cy="50" r="2" />
          <circle className={`hero-star ${star}`} cx="1100" cy="90" r="1.5" />
        </g>
      ) : null}

      {s.clouds ? (
        <>
          <g className="hero-cloud-a" style={{ fill: s.cloud }}>
            <ellipse cx="260" cy="130" rx="110" ry="34" />
            <ellipse cx="300" cy="105" rx="70" ry="40" />
            <ellipse cx="210" cy="115" rx="60" ry="32" />
          </g>
          <g className="hero-cloud-b" style={{ fill: s.cloud }}>
            <ellipse cx="700" cy="90" rx="130" ry="30" />
            <ellipse cx="740" cy="70" rx="80" ry="36" />
            <ellipse cx="650" cy="78" rx="60" ry="28" />
          </g>
        </>
      ) : null}
      {s.heavyClouds ? (
        <g className="hero-cloud-a" style={{ fill: s.cloud }}>
          <ellipse cx="200" cy="90" rx="200" ry="50" />
          <ellipse cx="560" cy="60" rx="240" ry="60" />
          <ellipse cx="900" cy="100" rx="220" ry="52" />
          <ellipse cx="1150" cy="70" rx="180" ry="48" />
        </g>
      ) : null}

      {/* Far hills */}
      <path
        d="M0 300 L0 250 C120 230 200 200 320 215 C420 228 480 260 600 245 C720 230 800 190 920 205 C1040 220 1120 250 1200 240 L1200 300 Z"
        style={{ fill: "var(--dp-conifer-dark)" }}
      />
      {/* Lake Superior */}
      <rect x="0" y="300" width="1200" height="120" style={{ fill: s.water }} />
      {/* Granite shore and ground */}
      <path
        d="M0 520 L0 400 C80 380 160 392 240 378 C330 362 400 390 470 410 C540 430 620 420 700 440 L700 520 Z"
        style={{ fill: "var(--dp-rock)" }}
      />
      <path d="M560 520 L560 440 C680 420 760 452 860 436 C960 420 1040 445 1200 430 L1200 520 Z" style={{ fill: s.ground }} />
      <path d="M0 520 L0 430 C60 418 120 428 180 420 C260 410 300 430 360 440 L360 520 Z" style={{ fill: s.ground }} />

      {/* Spruce */}
      <g style={{ fill: "var(--dp-conifer)" }}>
        <path d="M120 440 L160 340 L200 440 Z" />
        <path d="M130 400 L160 300 L190 400 Z" />
        <path d="M140 365 L160 280 L180 365 Z" />
        <path d="M210 445 L245 350 L280 445 Z" />
        <path d="M220 405 L245 320 L270 405 Z" />
        <path d="M1040 445 L1080 330 L1120 445 Z" />
        <path d="M1050 400 L1080 300 L1110 400 Z" />
        <path d="M1060 362 L1080 285 L1100 362 Z" />
        <path d="M1120 450 L1150 370 L1180 450 Z" />
      </g>
      {s.winter ? (
        <g style={{ fill: "var(--dp-conifer-snow)" }}>
          <path d="M142 362 L160 300 L178 362 L160 356 Z" />
          <path d="M1062 360 L1080 300 L1098 360 L1080 352 Z" />
          <path d="M226 402 L245 340 L264 402 L245 396 Z" />
        </g>
      ) : null}

      {/* Birches */}
      <g>
        <rect x="880" y="330" width="14" height="130" style={{ fill: "var(--dp-birch)" }} />
        <rect x="880" y="350" width="14" height="5" style={{ fill: "var(--dp-birch-bark)" }} />
        <rect x="880" y="392" width="14" height="4" style={{ fill: "var(--dp-birch-bark)" }} />
        <rect x="880" y="430" width="14" height="5" style={{ fill: "var(--dp-birch-bark)" }} />
        <rect x="930" y="345" width="12" height="115" style={{ fill: "var(--dp-birch)" }} />
        <rect x="930" y="372" width="12" height="4" style={{ fill: "var(--dp-birch-bark)" }} />
        <rect x="930" y="415" width="12" height="5" style={{ fill: "var(--dp-birch-bark)" }} />
      </g>
      {s.leaves ? (
        <g style={{ fill: s.season === "autumn" ? "var(--dp-leaf-autumn-gold)" : s.leaf }}>
          <circle cx="887" cy="320" r="40" />
          <circle cx="936" cy="335" r="34" />
        </g>
      ) : (
        <g style={{ stroke: "var(--dp-birch-bark)", strokeWidth: 3, fill: "none", strokeLinecap: "round" }}>
          <path d="M887 330 L870 300 M887 330 L905 296 M887 322 L887 286 M936 345 L920 318 M936 345 L952 314" />
        </g>
      )}

      {/* The maple */}
      <g>
        <rect x="760" y="380" width="18" height="80" style={{ fill: "var(--dp-birch-bark)" }} />
        {s.leaves ? (
          <g style={{ fill: s.leaf }}>
            <circle cx="769" cy="350" r="52" />
            <circle cx="735" cy="372" r="34" />
            <circle cx="805" cy="370" r="34" />
          </g>
        ) : (
          <g style={{ stroke: "var(--dp-birch-bark)", strokeWidth: 4, fill: "none", strokeLinecap: "round" }}>
            <path d="M769 385 L740 340 M769 385 L800 338 M769 380 L769 320 M752 358 L730 350 M786 356 L810 352" />
          </g>
        )}
      </g>

      {s.night ? <rect x="0" y="250" width="1200" height="270" style={{ fill: "var(--dp-sky-night)", opacity: 0.45 }} /> : null}

      {s.rain ? (
        <>
          <g className="hero-precip" style={{ stroke: "var(--dp-rain)", strokeWidth: 2, strokeLinecap: "round" }}>
            <path d="M60 0 L52 26 M180 40 L172 66 M300 10 L292 36 M420 50 L412 76 M540 0 L532 26 M660 30 L652 56 M780 10 L772 36 M900 60 L892 86 M1020 20 L1012 46 M1140 40 L1132 66" />
          </g>
          <g className="hero-precip-2" style={{ stroke: "var(--dp-rain)", strokeWidth: 2, strokeLinecap: "round" }}>
            <path d="M120 100 L112 126 M240 140 L232 166 M360 110 L352 136 M480 150 L472 176 M600 100 L592 126 M720 130 L712 156 M840 110 L832 136 M960 160 L952 186 M1080 120 L1072 146" />
          </g>
        </>
      ) : null}
      {s.snow ? (
        <>
          <g className="hero-precip" style={{ fill: "var(--dp-snow)" }}>
            <circle cx="60" cy="10" r="3" />
            <circle cx="180" cy="50" r="2.5" />
            <circle cx="300" cy="20" r="3" />
            <circle cx="420" cy="70" r="2" />
            <circle cx="540" cy="5" r="3" />
            <circle cx="660" cy="40" r="2.5" />
            <circle cx="780" cy="15" r="3" />
            <circle cx="900" cy="80" r="2" />
            <circle cx="1020" cy="30" r="3" />
            <circle cx="1140" cy="55" r="2.5" />
          </g>
          <g className="hero-precip-2" style={{ fill: "var(--dp-snow)" }}>
            <circle cx="120" cy="120" r="2.5" />
            <circle cx="240" cy="160" r="3" />
            <circle cx="360" cy="130" r="2" />
            <circle cx="480" cy="170" r="3" />
            <circle cx="600" cy="110" r="2.5" />
            <circle cx="720" cy="150" r="3" />
            <circle cx="840" cy="125" r="2" />
            <circle cx="960" cy="180" r="3" />
            <circle cx="1080" cy="140" r="2.5" />
          </g>
        </>
      ) : null}
      {s.storm ? (
        <path className="hero-bolt" d="M640 60 L600 180 L640 170 L590 290 L680 150 L636 160 L672 60 Z" style={{ fill: "var(--dp-lightning)" }} />
      ) : null}
      {s.windy ? (
        <g style={{ stroke: "var(--dp-cloud)", strokeWidth: 2, fill: "none", strokeLinecap: "round", opacity: 0.7 }}>
          <path d="M380 180 q30 -10 60 0 t60 0" />
          <path d="M420 215 q30 -10 60 0 t60 0 t60 0" />
        </g>
      ) : null}
      {s.fog ? <rect x="0" y="0" width="1200" height="520" style={{ fill: "var(--dp-sky-fog)", opacity: 0.7 }} /> : null}
    </svg>
  );
}
