/**
 * Prepares PGN text for @mliebelt/pgn-viewer / pgn-parser.
 * Fixes games saved with HTML line breaks and missing header/movetext separation.
 */
export function normalizePgn(pgn) {
  if (!pgn || typeof pgn !== 'string') {
    return '';
  }

  let normalized = pgn
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\r\n/g, '\n')
    .trim();

  // PGN spec: blank line between headers and movetext
  if (/\[[^\]]+\]/.test(normalized) && !/\]\s*\n\s*\n/.test(normalized)) {
    normalized = normalized.replace(/(\])\s*\n(?!\s*\n)/, '$1\n\n');
  }

  return normalized;
}
