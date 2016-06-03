export function dumpUser({ id, email, budgetId }) {
  return { id, email, budgetId };
}

export function dumpBudget({ id, currencyId }) {
  return { id, currencyId };
}

export function dumpCurrency({ id, code, budgetId }) {
  return { id, code, budgetId };
}

export function dumpCategory({ id, title, type, parentId }) {
  return { id, title, type, parentId };
}

export function dumpAccount({ id, title, currencyId }) {
  return { id, title, currencyId };
}

export function dumpTransaction({ id, accountId, categoryId, quantity, price, amount }) {
  return { id, accountId, categoryId, quantity, price, amount };
}
