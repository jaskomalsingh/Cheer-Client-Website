import React, { useState } from 'react';

const CheckBoxWithLabel = ({ label, checked, onChange }) => {
  return (
    <div className="form-wrapper">
      <div className="element-wrapper">
        <div className="input-label">{label}</div>
        <div className="checkbox">
          <input
            type="checkbox"
            id={`checkbox-${label}`}
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={`checkbox-${label}`} />
        </div>
      </div>
    </div>
  );
};


  export default CheckBoxWithLabel;