import { copy } from '../../copy';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/** "2026" -> "2026"; "2026-02" -> "Feb 2026". */
export function when(v?: string): string {
  if (!v) return '';
  const m = /^(\d{4})-(\d{2})/.exec(v);
  if (!m) return v;
  return `${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

export function range(start: string, end?: string, current?: boolean): string {
  const a = when(start);
  const b = current ? copy.dates.now : when(end);
  return b ? `${a} – ${b}` : a;
}

/** Label for a finished book relative to today: "Last month" or "Jul". */
export function finishedLabel(finished?: string, now = new Date()): string {
  if (!finished) return copy.dates.recently;
  const m = /^(\d{4})-(\d{2})/.exec(finished);
  if (!m) return copy.dates.recently;
  const y = Number(m[1]), mo = Number(m[2]) - 1;
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  if (y === prev.getFullYear() && mo === prev.getMonth()) return copy.dates.lastMonth;
  return MONTHS[mo];
}

const WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
export function countWord(n: number): string {
  return WORDS[n] ?? String(n);
}
