export const validateEmail = elementValue =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(elementValue);

export const requiredValidation = value => !!value;
