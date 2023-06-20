import { REQUEST_CURRENCY,
  REQUEST_CURRENCY_FAILURE, REQUEST_CURRENCY_SUCCESS } from '../actions';
import { ADD_EXPENSES, SUM_TOTAL } from '../actions/addExpenses';
import { EDIT_EXPENSE } from '../actions/editExpenses';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
  sumTotal: '0.00',
  editExpense: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EDIT_EXPENSE:
    return {
      ...state,
      editExpense: action.payload,
      editor: true,
    };
  case SUM_TOTAL:
    return {
      ...state,
      sumTotal: state.expenses.reduce((acc, curr) => {
        const { currency, value, exchangeRates } = curr;
        const actualValue = Number(exchangeRates[currency].ask) * Number(value);
        return ((acc + actualValue));
      }, 0).toFixed(2),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
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
