export function dumpUser({ id, email }) {
  return { id, email };
}

export function dumpBudget({ id, currencyId }) {
  return { id, currencyId };
}

export function dumpCurrency({ id, code }) {
  return { id, code };
}
