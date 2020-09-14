export function user(state) {
  return state.userDetails;
}

export function isUserAdmin(state) {
  return state.userDetails ? !!state.userDetails.isAdmin : false;
}
