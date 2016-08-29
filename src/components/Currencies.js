import React, { PropTypes } from 'react';

const {
  func,
  string,
  bool,
  arrayOf,
  shape,
} = PropTypes;

const propTypes = {
  currencies: arrayOf(shape({
    id: string.isRequired,
    code: string.isRequired,
    prymary: bool.isRequired,
  })).isRequired,
  editedId: string,
  editedValue: string,

  onUpdate: func,
  onRemove: func,
  onStartEdit: func,
  onEndEdit: func,
  onChange: func,
};

const currencies = ({
  editedId,
  editedValue,

  onUpdate,
  onRemove,
  onStartEdit,
  onEndEdit,
  onChange,
  ...props,
}) =>
  <ul>
    {props.currencies.map(({ id, code, prymary }) => (
      id === editedId ?
        <li key={id}>
          <input type="text" value={editedValue} onChange={onChange} />
          <button onClick={onUpdate}>Save</button>
          <button onClick={onEndEdit}>Close</button>
        </li>
      :
        <li key={id}>
          {code} {prymary ? ' (prymary)' : ''}
          <button onClick={onStartEdit(id, code)}>Edit</button>
          <button onClick={onRemove(id)}>X</button>
        </li>
    ))}
  </ul>;

currencies.propTypes = propTypes;

export default currencies;
