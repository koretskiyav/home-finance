import { Schema, arrayOf } from 'normalizr';

export const CURRENCY = new Schema('currencies');
export const CURRENCY_ARRAY = arrayOf(CURRENCY);

export const CATEGORY = new Schema('categories');
export const CATEGORY_ARRAY = arrayOf(CATEGORY);
