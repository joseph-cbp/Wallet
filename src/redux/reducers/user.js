// Esse reducer será responsável por tratar as informações da pessoa usuária

import { LOGIN_STATE } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_STATE:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return {
      ...state,
    };
  }
};

export default userReducer;
