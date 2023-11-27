import {trim} from "lodash";

export const requiredWithMessage = (message: string) => (input: unknown) => {
  if (input === null || input === undefined
    || (Array.isArray(input) && input.length === 0)
    || (typeof input === "string" && trim(input) === "")) {
    return message;
  }
}

export const required = requiredWithMessage("Required.");
