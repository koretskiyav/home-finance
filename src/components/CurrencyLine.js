import React, { Component, PropTypes } from 'react';

class CurrencyLine extends Component {
  removeCurrency = () => {
    const { currency, onRemove } = this.props;
    onRemove({ currencyId: currency.id });
  }

  editCurrency = () => {
    const { currency, onEdit } = this.props;
    onEdit({ currencyId: currency.id, code: currency.code });
  }

  closeCurrency = () => {
    const { onEdit } = this.props;
    onEdit({ currencyId: '', code: '' });
  }

  changeCurrency = () => {
    const code = this.refs.codeInput.value;
    const { onChange } = this.props;
    onChange( { code });
  }

  updateCurrency = () => {
    const { currentEditableValue, currency, onUpdate } = this.props;
    onUpdate( { currencyId: currency.id, code: currentEditableValue });
    this.closeCurrency();
  }

  render() {
    const { currentEditableValue, currency, editable } = this.props;
    if (editable) {
      return (
        <div>
          <input type="text" ref="codeInput" value={currentEditableValue} onChange={this.changeCurrency}/>
          <button onClick={this.updateCurrency}>Save</button>
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
