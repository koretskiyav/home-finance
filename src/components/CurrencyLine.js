import React, { Component, PropTypes } from 'react';

class CurrencyLine extends Component {
  removeCurrency = () => {
    const { currency, onRemove } = this.props;
    onRemove({ currencyId: currency.id });
  }

  editCurrency = () => {
    const { currency, onEdit } = this.props;
    onEdit({ currencyId: currency.id });
  }

  closeCurrency = () => {
    const { onEdit } = this.props;
    onEdit({ currencyId: '' });
  }

  render() {
    const { currency, editable } = this.props;
    if (editable) {
      return (
        <div>
          <input type="text" value={currency.code} />
          <button>Save</button>
          <button onClick={this.closeCurrency}>Close</button>
        </div>
      );
    }
    return (
      <div>
        {currency.code}
        {currency.prymary && ' (prymary)'}
        <button onClick={this.editCurrency}>Edit</button>
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
