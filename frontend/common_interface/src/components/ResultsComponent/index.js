import React from 'react';
import TrainingButtonContainer from '../../containers/TrainingButtonContainer';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

var style = {
  result:{
    marginBottom:'10px'
  },
  header:{
    borderBottom: '1px solid #1C6BA0',
    backgroundColor: '#1C6BA0',
    padding: '5px',
    color: '#fff',
    height:'40px',
    lineHeight:'30px'
  },
  btn_check:{
    color:'#fff',
    width:'40px',
    backgroundColor: '#ffae00',
    margin:'-5px',
    height:'40px',
    lineHeight:'40px',
    textAlign: 'center'
  },
  btn_check_active:{
    color:'#333',
    width:'40px',
    backgroundColor: '#ffae00',
    margin:'-5px',
    height:'40px',
    lineHeight:'40px',
    textAlign: 'center',
    fontSize:'28px'
  },
  panel_content:{
    border:'1px solid #1C6BA0',
    borderTop: 'none',
    paddingLeft:'5px',
    paddingRight:'5px'
  },
  row:{
    borderTop:'1px solid #1C6BA0',
    marginLeft:'-5px',
    marginRight:'-5px',
    paddingTop:'5px'
  },
  heading1:{
    fontSize:'20px',
    padding:'5px',
    backgroundColor:'#ffae00',
    color:'#fff',
    textAlign:'center'
  }
};

const ResultsComponent = (props) => {
  const results = props.results.map( (r,i) => (
    <div className="panel row result" style={style.result} key={i}>
        <div className="header large-12 columns" style={style.header}>
            {r.title}

            {!props.hasSelectedResponse &&
              <a href="javascript:void(0)" className="float-right btn_check" style={style.btn_check}
                                                                             onClick={() => props.onSelectResponse(r.key)}>
                <i className="fa fa-check"></i>
              </a>
            }

            {props.hasSelectedResponse &&
              <a href="javascript:void(0)" className="float-right btn_check" style={style.btn_check_active}>
                <i className="fa fa-check"></i>
              </a>
            }
        </div>
        <div style={style.panel_content} className="large-12 columns">
            {r.nodes.map( (n,j) => (
              <div key={j} className="row" style={style.row}>
                  <div className="large-1 columns" style={{textAlign:'center'}} data-equalizer-watch>
                    { (n.mode === "train") &&
                      <i className="fa fa-train"></i>
                    }
                    { (n.mode === "bus") &&
                      <i className="fa fa-bus"></i>
                    }
                    {n.route}
                  </div>
                  <div className="large-11 columns end" style={{lineHeight:'40px'}} data-equalizer-watch>
                    From <b>{n.start}</b> to <b>{n.end}</b>
                  </div>
              </div>
            ) )}
        </div>
   </div>

 ) );

return(
  <div id="results" className="small-12 columns" style={{paddingTop:'10px'}}>
      <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={200}
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>

          {results}

      </CSSTransitionGroup>

      { (props.hasSelectedResponse && props.hasTrainingSet) &&
        <div className="small-12 large-4 large-centered columns" style={{textAlign:'center', border:'1px solid #ffae00'}}>
          <h1 style={style.heading1}><i className="fa fa-heart"></i> Thank You! <i className="fa fa-heart"></i></h1>
          <p style={{color:'#1C6BA0'}}>You are awesome!!</p>
          <TrainingButtonContainer />
        </div>
      }
  </div>
)};

export default ResultsComponent;
