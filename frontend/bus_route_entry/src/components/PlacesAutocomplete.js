import React from 'react';

const PlacesAutocomplete = (props) => (
    <div className="small-12 large-5 columns">
      <div className="input-group">
        <span className="input-group-label">{props.label}</span>
        <input className="input-group-field" id={props.auto_input_id} type="text" disabled={props.disabled}
                onChange={props.onSearchInputChange} value={props.searchTxt} />
      </div>
    </div>
);

export default PlacesAutocomplete;
