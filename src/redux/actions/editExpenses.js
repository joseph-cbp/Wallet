export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT = 'SAVE_EDIT';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const editExpense = (toEdit) => ({
  type: EDIT_EXPENSE,
  payload: toEdit,
});

export const saveEdit = (toSave) => ({
  type: SAVE_EDIT,
  payload: toSave,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  payload: id,
});
