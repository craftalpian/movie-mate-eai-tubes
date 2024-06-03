import randomstring from "randomstring";

export const id = (prefix: string) => `${prefix}_${randomstring.generate(20)}`;

export const delay = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
