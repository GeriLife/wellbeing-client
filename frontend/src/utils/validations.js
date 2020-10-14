import { i18n } from "src/boot/i18n";
export const validateEmail = elementValue =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(elementValue) ||
  i18n.t("invalid-email");

export const requiredValidation = (value, key) =>
  (!!value && (!key || !!value[key])) || i18n.t("fieldRequired");

export const maxLength = (currentLength, max) =>
  currentLength <= max || i18n.t("requiredMaxLength", { len: max });
