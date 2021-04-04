import { Notify } from "quasar";
import { parseMeteorError } from "./parsers";

export const errorNotifier = error => {
  console.log(error);
  Notify.create({
    type: "negative",
    position: "top-right",
    message: parseMeteorError(error)
  });
};

export const successNotifier = message => {
  Notify.create({
    type: "positive",
    position: "top-right",
    message: message
  });
};
