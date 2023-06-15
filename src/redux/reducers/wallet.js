import { REQUEST_CURRENCY, REQUEST_CURRENCY_FAILURE, REQUEST_CURRENCY_SUCCESS } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
      isLoading: false,
    };
  case REQUEST_CURRENCY_FAILURE:
    return {
      ...state,
      isLoading: false,
    };
  default:
    return {
      ...state,
    };
  }
};

export default walletReducer;
