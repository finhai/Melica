export function loginRequest(username, password) {
  return {
    type: '@login/LOGIN_REQUEST',
    payload: {
      username,
      password,
    },
  };
}
export function setLogin(username, password) {
  return {
    type: '@login/SET_USERNAME',
    payload: {
      username,
      password,
    },
  };
}

export function loginSuccess(username, password) {
  return {
    type: '@login/LOGIN_SUCCESS',
    payload: {
      username,
      password,
    },
  };
}
export function requestUserExist() {
  return {
    type: '@login/REQUEST_USER_EXIST',
  };
}

export function logoutUser() {
  return {
    type: '@login/LOGOUT_USER',
  };
}

export function setUser(token, username, VendCod) {
  return {
    type: '@login/SET_USER',
    payload: {
      token,
      username,
      VendCod,
    },
  };
}

export function firstTime() {
  return {
    type: '@login/FIRST_TIME',
  };
}

export function checkConnection(first) {
  return {
    type: '@login/CHECK_CONNECTION',
    payload: {
      first,
    },
  };
}
