export const parseMeteorError = error => {
  const str = error.response.data;
  return str.substring(str.lastIndexOf("<pre>") + 5, str.lastIndexOf("</pre>"));
};
