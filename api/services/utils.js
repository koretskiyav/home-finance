export function dumpUser({ id, email, budget }) {
  return { id, email, budget };
}

export function dumpBudget({ id, currencyId }) {
  return { id, currencyId };
}

export function dumpCurrency({ id, code, budgetId }) {
  return { id, code, budgetId };
}

export function dumpCategory({ id, title, type, parent, children }) {
  return { id, title, type, parent, children };
}

export function dumpAccount({ id, title, currency }) {
  return { id, title, currency };
}

export function dumpTransaction({ id, account, category, date, price, quantity, amount }) {
  return { id, account, category, date, price, quantity, amount };
}
