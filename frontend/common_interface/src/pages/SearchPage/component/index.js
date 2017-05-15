import React from 'react';
import PlacesAutocompleteContainer from '../../../containers/PlacesAutocompleteContainer';
import SearchButtonContainer from '../../../containers/SearchButtonContainer';

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

    <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>

      <div className="off-canvas position-left" id="side_panel" data-off-canvas data-position="left">
        <div className="row column">

        </div>
      </div>

      <div className="off-canvas position-right" id="side_panel" data-off-canvas data-position="right" data-transition="push">
        <div className="row column">

        </div>
      </div>

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
        <SearchButtonContainer homeButton={true} />
        {/*
        <div className="row">
          <a href="#" className="button warning tiny"><img src="/assets/gear.gif" width="60px" /></a>
        </div>
        */}
      </div>




    </div>

);

export default SearchPageComponent;
