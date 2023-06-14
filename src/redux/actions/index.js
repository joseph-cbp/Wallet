export const LOGIN_STATE = 'LOGIN_STATE';

export const loginState = (email) => ({
  type: LOGIN_STATE,
  payload: email,
});
