export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT = 'SAVE_EDIT';

export const editExpense = (toEdit) => ({
  type: EDIT_EXPENSE,
  payload: toEdit,
});

export const saveEdit = (toSave) => ({
  type: SAVE_EDIT,
  payload: toSave,
});
