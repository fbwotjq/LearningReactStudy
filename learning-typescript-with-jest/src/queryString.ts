import * as qs from "qs";

const EMPTY_STRING = "";

export default function queryString(params: { [key: string]: any }): string {
  return qs.stringify(params, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
    skipNulls: true,
    filter: (prefix, value) => {
      if (typeof value === "string" && value.trim() === EMPTY_STRING) {
        return
      }
      if (value === undefined || value === null) {
        return
      }
      if (Array.isArray(value) && value.length == 0) {
        console.log(prefix, value.length, value);
        return
      }
      return value
    }
  });
}
