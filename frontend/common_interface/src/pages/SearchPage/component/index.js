import React from 'react';
import PlacesAutocompleteContainer from '../../../containers/PlacesAutocompleteContainer';

var style = {
  wrapper : {
    textAlign:'center',
    paddingTop: '100px'
  },
  heading : {
    fontFamily: ['Open Sans Condensed', 'sans-serif']
  }
};

const SearchPageComponent = (props) => (
  <div className="large-5 large-centered columns" style={style.wrapper}>
    <h1 style={style.heading}> <font color="#1C6BA0">transit</font><font color="#ffae00">Lanka</font></h1>
    <PlacesAutocompleteContainer
        label="I am at"
        id="txt_start"
        placeholder="Select start location"
     />
     <PlacesAutocompleteContainer
         label="I am going"
         id="txt_end"
         placeholder="Select end location"
      />     
    <div className="row">
      <input type="button" className="button warning" value="Do MAGIC!"  />
    </div>
  </div>
);

export default SearchPageComponent;
