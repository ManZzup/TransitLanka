import React from 'react';

const PlacesAutocomplete = (props) => {
return(
    <div className="row">
      <div className="input-group">
        <span className="input-group-label">{props.label}</span>
        <input className="input-group-field awesomplete" type="text"
               placeholder={props.placeholder}
               id={props.id}
               onChange={(e) => props.onTextChange(e.target.value)}  />
      </div>
    </div>
);
}

export default PlacesAutocomplete;
