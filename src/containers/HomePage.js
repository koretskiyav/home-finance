import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CurrencyForm from 'components/CurrencyForm';
import { load, add } from 'redux/modules/currencies';

class HomePage extends Component {
  componentWillMount() {
    const { currencies, dispatch } = this.props;
    if (!currencies.loading && !currencies.data) {
      dispatch(load());
    }
  }

  addCurrency = ({ code }) => {
    const { currencies, dispatch } = this.props;
    const prymary = !currencies.data || currencies.data.length === 0;
    dispatch(add({ code, prymary }));
  }

  render() {
    const { user, currencies } = this.props;

    return (
      <div>
        Hello, {user.email} !
        {currencies.data && currencies.data.map(currency => (
          <div key={currency.id}>{currency.code}{currency.prymary && ' (prymary)'}</div>
        ))}
        <CurrencyForm onSubmit={this.addCurrency} />
      </div>
    );
  }
}

HomePage.propTypes = {
  currencies: PropTypes.object,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: state.auth.user,
    currencies: state.currencies,
  })
)(HomePage);
