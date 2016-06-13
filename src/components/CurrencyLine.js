import React, { Component, PropTypes } from 'react';

class CurrencyLine extends Component {
  removeCurrency = () => {
    const { currency, onRemove } = this.props;
    onRemove({ currencyId: currency.id });
  }

  render() {
    const { currency } = this.props;
    return (
      <div>
        {currency.code}
        {currency.prymary && ' (prymary)'}
        <button onClick={this.removeCurrency}>X</button>
      </div>
    );
  }
}

CurrencyLine.propTypes = {
  currency: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CurrencyLine;
