import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Currencies,
  CurrencyForm,
} from 'components';

import {
  load, add, update, remove, startEdit, change,
} from 'redux/modules/currencies';

import {
  compose,
  defaultProps,
  lifecycle,
  withPropsOnChange,
  withHandlers,
  pure,
} from 'recompose';

const {
  func,
  object,
  arrayOf,
  string,
} = PropTypes;

const reduxConnect = connect(({
  auth: { user },
  currencies,
}) => ({
  user,
  currenciesData: currencies.data,
  currenciesId: currencies.id,
  editedId: currencies.edited.id,
  editedValue: currencies.edited.code,
}), dispatch => bindActionCreators({
  load, add, update, remove, startEdit, change,
}, dispatch));

export const homePageHOC = compose(
  defaultProps({
    currencies: [],
  }),

  lifecycle({
    componentWillMount() {
      const { currencies: { loading, loaded } } = this.props;
      if (!loading && !loaded) {
        this.props.load();
      }
    },
  }),

  withPropsOnChange(
    ['currenciesData', 'currenciesId'], ({ currenciesData, currenciesId }) => ({
      currencies: currenciesId.map(id => currenciesData[id]),
    })
  ),

  withHandlers({
    onCurrencyAdd: props => ({ code }) =>
      props.add(code),

    onCurrencyUpdate: ({ editedId, editedValue, ...props }) => () =>
      props.update(editedId, editedValue),

    onCurrencyRemove: props => id => () =>
      props.remove(id),

    onCurrencyStartEdit: props => (id, code) => () =>
      props.startEdit(id, code),

    onCurrencyEndEdit: props => () =>
      props.startEdit(null, ''),

    onCurrencyChange: props => ev =>
      props.change(ev.target.value),
  }),

  pure
);

const propTypes = {
  user: object.isRequired,
  currencies: arrayOf(object).isRequired,
  editedId: string,
  editedValue: string,
  // hendlers
  onCurrencyAdd: func,
  onCurrencyUpdate: func,
  onCurrencyRemove: func,
  onCurrencyStartEdit: func,
  onCurrencyEndEdit: func,
  onCurrencyChange: func,
};

const homePage = ({
  user,
  currencies,
  editedId,
  editedValue,
  onCurrencyAdd,
  onCurrencyUpdate,
  onCurrencyRemove,
  onCurrencyStartEdit,
  onCurrencyEndEdit,
  onCurrencyChange,
}) =>
  <div>
    Hello, {user.email} !
    <Currencies
      currencies={currencies}
      editedId={editedId}
      editedValue={editedValue}
      onStartEdit={onCurrencyStartEdit}
      onEndEdit={onCurrencyEndEdit}
      onEndEdit={onCurrencyEndEdit}
      onChange={onCurrencyChange}
      onUpdate={onCurrencyUpdate}
      onRemove={onCurrencyRemove}
    />
    <CurrencyForm onSubmit={onCurrencyAdd} />
  </div>;

homePage.propTypes = propTypes;

export default reduxConnect(
  homePageHOC(
    homePage
  )
);
