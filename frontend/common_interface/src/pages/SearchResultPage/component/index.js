import React from 'react';
import PlacesAutocompleteContainer from '../../../containers/PlacesAutocompleteContainer';
import ResultsContainer from '../../../containers/ResultsContainer';
import SearchButtonContainer from '../../../containers/SearchButtonContainer';
import TrainCheckContainer from '../../../containers/TrainCheckContainer';

var style = {
  wrapper : {
  },
  column_1 : {
    height:'100vh',
    boxShadow: '2px 1px 3px 1px #ccc',
  },
  heading : {
    fontFamily: ['Open Sans Condensed', 'sans-serif']
  }
};

const SearchResultPageComponent = (props) => (
    <div className="">
      <div className="large-4 small-12 columns"  style={style.column_1}>
          <div style={style.wrapper}>
            <a href="#">
              <h1 style={style.heading}>
                <font color="#1C6BA0">transit</font><font color="#ffae00">Lanka</font>
              </h1>
            </a>
            <PlacesAutocompleteContainer
                label="I am at"
                id="txt_start"
                placeholder="Select start location"
                value={props.startText}
             />
             <PlacesAutocompleteContainer
                 label="I am going"
                 id="txt_end"
                 placeholder="Select end location"
                 value={props.endText}
              />

              <TrainCheckContainer />

          </div>
          <SearchButtonContainer />




      </div>
      <div className="large-7 small-12 columns end">
          <ResultsContainer />
      </div>
    </div>
);

export default SearchResultPageComponent;
