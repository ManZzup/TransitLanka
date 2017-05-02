import React from 'react';
import PlacesAutocompleteContainer from '../../../containers/PlacesAutocompleteContainer';
import ResultsContainer from '../../../containers/ResultsContainer';
import TrainingButtonContainer from '../../../containers/TrainingButtonContainer';

var style = {
  wrapper : {
  },
  column_1 : {
    height:'100vh',
    boxShadow: '2px 1px 3px 1px #ccc',
  },
  heading : {
    fontFamily: ['Open Sans Condensed', 'sans-serif'],
    marginBottom:'-10px'
  },
  sub_heading : {
    fontSize: '20px',
    backgroundColor:'#ffae00',
    padding:'5px',
    color:'#fff'
  },
  heading2 : {
    fontFamily: ['Open Sans Condensed', 'sans-serif'],
    fontSize: '28px',
    color: '#1C6BA0',
    fontWeight: 'bold'
  },
  heading3 : {
    fontSize: '20px'
  },
};

const TrainingPageComponent = (props) => (
    <div className="">
      <div className="large-4 small-12 columns"  style={style.column_1}>
          <div style={style.wrapper}>
            <h1 style={style.heading}> <font color="#1C6BA0">transit</font><font color="#ffae00">Lanka</font></h1>
            <span style={style.sub_heading}>trainMe</span>
            <br /><br />

            {props.hasTrainingSet &&
                <div>
                  Which option out of the shown routes you will take to travel <br /><br />

                  <div className="row">
                    <div className="input-group">
                      <span className="input-group-label">From</span>
                      <input className="input-group-field awesomplete" type="text"
                             readOnly
                             value={props.startLocation} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group">
                      <span className="input-group-label">To</span>
                      <input className="input-group-field awesomplete" type="text"
                             readOnly
                             value={props.endLocation} />
                    </div>
                  </div>

                </div>
            }

            {!props.hasTrainingSet &&

              <p>
                Hi, welcome to training session of transitLanka! <br />
                To begin please press the button below
              </p>
            }

            <TrainingButtonContainer />

            {props.hasTrainingSet &&
              <div>
                <hr />
                <h2 style={style.heading2}>FAQ</h2>
                <div>
                  <h3 style={style.heading3}><font color="#ffae00">Q.</font> How to select an option?</h3>
                  <p><font color="#1C6BA0">A.</font>  Click the ✔ Button to accept the option</p>
                </div>
                <div>
                  <h3 style={style.heading3}><font color="#ffae00">Q.</font> What if I dont know the answer?</h3>
                  <p><font color="#1C6BA0">A.</font>  Press the "New Training Set" button to get a new set</p>
                </div>
              </div>
            }

          </div>


      </div>
      <div className="large-7 small-12 columns end">
          <ResultsContainer />
      </div>
    </div>
);

export default TrainingPageComponent;
