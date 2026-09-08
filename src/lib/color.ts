/* Spine colour from a cover's dominant colour: desaturate ~30% and pull it a
   little toward the paper so the shelf reads as one set. No uniform darkening;
   pale covers give pale spines. Text colour is chosen per spine by contrast. */

const PAPER = [0xfb, 0xfa, 0xf7] as const;
const INK = [0, 0, 0] as const;
export const NO_COVER = '#3A3632'; // warm dark grey

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHex([r, g, b]: RGB): string {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}
function rgbToHsl([r, g, b]: RGB): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}
function hslToRgb([h, s, l]: [number, number, number]): RGB {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}
function luminance([r, g, b]: RGB): number {
  const c = [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a: RGB, b: RGB): number {
  const la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function spineColor(cover?: string): string {
  if (!cover) return NO_COVER;
  const [h, s, l] = rgbToHsl(hexToRgb(cover));
  const rgb = hslToRgb([h, s * 0.7, l]);
  const k = 0.12; // pull toward paper
  return rgbToHex([0, 1, 2].map((i) => rgb[i] * (1 - k) + PAPER[i] * k) as RGB);
}

/** Ink or paper, whichever contrasts more with the spine. */
export function spineText(spine: string): { color: string; ratio: number } {
  const bg = hexToRgb(spine);
  const ink = contrast(bg, INK as unknown as RGB), paper = contrast(bg, PAPER as unknown as RGB);
  return ink >= paper ? { color: '#000000', ratio: ink } : { color: '#FBFAF7', ratio: paper };
}
