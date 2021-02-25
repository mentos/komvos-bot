export { default as camelize } from "just-camel-case";

export { default as isEmpty } from "just-is-empty";

export const generatePassword = (): string => {
  return Math.random().toString(36).slice(-10);
};
