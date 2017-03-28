import React from 'react';

const PlacesAutocomplete = (props) => {
  var dl_id = props.id + "_list";
return(
    <div className="row">
      <div className="input-group">
        <span className="input-group-label">{props.label}</span>
        <input className="input-group-field awesomplete" type="text"
               placeholder={props.placeholder}
               id={props.id}
               list={dl_id}  />
      </div>
      <datalist id={dl_id}>
      	<option>Ada</option>
      	<option>Java</option>
      	<option>JavaScript</option>
      	<option>Brainfuck</option>
      	<option>LOLCODE</option>
      	<option>Node.js</option>
      	<option>Ruby on Rails</option>
      </datalist>
    </div>
);
}

export default PlacesAutocomplete;
