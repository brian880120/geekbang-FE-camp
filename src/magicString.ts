import MagicString from "magic-string";

export const getMagicString = (code: string) => {
  const magicString = new MagicString(code);
  return {
    magicString,
    getSnipByPosition: (start: number, end: number): string => {
      return magicString.snip(start, end).toString();
    },
  };
};
