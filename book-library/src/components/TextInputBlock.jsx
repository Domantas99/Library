import React from 'react';

export default ({ label, inputName, type }) => (
    <div className="input-block">
        <label for={inputName} class="form-label">{label}</label><br/>
        <input type={type} name={inputName} id={inputName}/><br/>
    </div>
);