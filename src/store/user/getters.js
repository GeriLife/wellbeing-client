export function user(state) {
  return state.userDetails;
}

export function isUserAdmin(state) {
  return state.userDetails ? !!state.userDetails.isAdmin : false;
}

export function userHasGroup(state) {
  return function(group) {
    return state.userGroups.findIndex(groups => groups.groupID === group) > -1;
  };
}

export function userManagesGroup(state) {
  return function(group) {
    return (
      state.userGroups.findIndex(
        permission =>
          permission.groupId === group && permission.isManager === true
      ) > -1
    );
  };
}

export function userManagesHome(state) {
  return function(home) {
    return (
      isUserAdmin(state) ||
      state.userGroups.findIndex(
        permission =>
          permission.homeId === home && permission.isManager === true
      ) > -1
    );
  };
}

export function userManagesAGroup(state) {
  return (
    isUserAdmin(state) ||
    state.userGroups.some(permission => permission.isManager === true)
  );
}
