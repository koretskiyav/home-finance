export function dumpUser({ id, email, budgetId }) {
  return { id, email, budgetId };
}

export function dumpBudget({ id, currencyId }) {
  return { id, currencyId };
}

export function dumpCurrency({ id, code }) {
  return { id, code };
}
