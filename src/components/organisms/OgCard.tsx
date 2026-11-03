/**
 * Organism: the Open Graph card for Home and On AI (CNT-10), drawn at build
 * with ImageResponse. Colours come from tokens.css through readTokens (DSN-10).
 * Raleway is fetched from Google Fonts at build; if that fails the default
 * face is used rather than failing the build.
 */
import { site } from "@/lib/content";
import { readTokens } from "@/lib/tokens";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 800; style: "normal" };

async function loadFont(family: string, weight: 400 | 800): Promise<OgFont | undefined> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
      // An old user agent makes Google serve WOFF or TTF, which ImageResponse can read (not WOFF2).
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0" },
    }).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype|woff)'\)/)?.[1];
    if (!url) return undefined;
    const data = await fetch(url).then((r) => r.arrayBuffer());
    return { name: family.replace(/\+/g, " "), data, weight, style: "normal" };
  } catch {
    return undefined;
  }
}

/** The fonts option for ImageResponse, or undefined so its default face applies when Google is unreachable. */
async function fonts(): Promise<OgFont[] | undefined> {
  const loaded = await Promise.all([loadFont("Raleway", 800), loadFont("Source+Sans+3", 400)]);
  const ok = loaded.filter((f): f is OgFont => Boolean(f));
  return ok.length ? ok : undefined;
}

export function OgCard({ title, subtitle, kicker }: { title: string; subtitle: string; kicker?: string }) {
  const t = readTokens();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: t.surface,
        color: t.ink,
        fontFamily: "Source Sans 3, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg viewBox="0 0 187.19 171.56" width={72} height={72}>
          <path
            fill={t.goose}
            d="M110.88,86.49c2.66,2.79,5.54,5.41,8.41,8,3.25,2.91,6.54,5.77,9.78,8.7a121.2,121.2,0,0,1,14.55,15.07q34.08-46.47,38.32-92.67L108.59,70.35l0,0c-1.71,1-4,2.54-4.34,4.65-.56,3.65,4.4,9.08,6.68,11.46"
          />
          <path
            fill={t["goose-body"]}
            d="M85.78,5.68a79.88,79.88,0,0,1,56.64,23.46c.53.54,1.06,1.08,1.58,1.63l5.45-2.47c-1-1.09-2-2.14-3-3.18a85.78,85.78,0,1,0-11.55,131v.06c17.38-11.54,15.34-23.59,6.67-35.17-16.24-21.68-55.79-41.69-34.64-53.53l75.35-46,4.93-3-98,48.71c-66.05,38.13,37.88,52.62,45.72,81.87A80.1,80.1,0,1,1,85.78,5.68"
          />
        </svg>
        <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 36 }}>{site.name}</div>
        {kicker ? <div style={{ marginLeft: "auto", fontSize: 24, color: t["ink-muted"] }}>{kicker}</div> : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
        <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 72, lineHeight: 1.05, letterSpacing: "-0.01em" }}>{title}</div>
        <div style={{ fontSize: 32, lineHeight: 1.35, color: t["ink-muted"] }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: t["ink-muted"] }}>
        <span>darrylpatterson.com</span>
        <span>Sault Ste. Marie · Ontario</span>
      </div>
    </div>
  );
}
OgCard.fonts = fonts;
