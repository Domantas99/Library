import React from 'react';

export default ({ label, inputName }) => (
    <div className="input-block">
        <label for={inputName} class="form-label">{label}</label><br/>
        <input type="text" name={inputName} id={inputName}/><br/>
    </div>
);