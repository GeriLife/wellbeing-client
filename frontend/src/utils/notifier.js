import { Notify } from "quasar";
import { parseMeteorError } from "./parsers";

export const errorNotifier = error => {
  Notify.create({
    type: "negative",
    position: "top-right",
    message: parseMeteorError(error)
  });
};
