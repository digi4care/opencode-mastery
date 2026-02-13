export type NormalizeOptions = {
  trim: boolean;
  collapseWhitespace: boolean;
  lowercase: boolean;
};

export const normalizeText = (text: string, opts: NormalizeOptions): string => {
  let result = text;

  if (opts.trim) result = result.trim();
  if (opts.collapseWhitespace) result = result.replace(/\s+/g, ' ');
  if (opts.lowercase) result = result.toLowerCase();

  return result;
};

export const splitWords = (text: string): string[] => {
  const trimmed = text.trim();
  if (trimmed.length === 0) return [];
  return trimmed.split(/\s+/g);
};

export const getTextStats = (text: string): { chars: number; words: number; lines: number } => {
  const words = splitWords(text);
  const lines = text.length === 0 ? 0 : text.split('\n').length;

  return {
    chars: text.length,
    words: words.length,
    lines,
  };
};
