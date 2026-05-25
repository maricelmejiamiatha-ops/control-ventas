import { customAlphabet } from "nanoid";

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

export function generatePassword(length: number = 15): string {
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
}
