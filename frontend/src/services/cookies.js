export const getCookie = cname => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find(cookie => cookie.indexOf(cname) === 0);
  return cookie ? cookie.substring(cname.length + 1) : null;
};
