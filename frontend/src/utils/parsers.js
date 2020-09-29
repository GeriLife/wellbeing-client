import { i18n } from "src/boot/i18n";

export const parseMeteorError = error => {
  const err = error.response.data;
  if (typeof err === "string")
    return err.substring(
      err.lastIndexOf("<pre>") + 5,
      err.lastIndexOf("</pre>")
    );
  return err.reason ? err.reason : i18n.t("ApiError");
};
