import React from 'react';

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
  }
};

const ResultsComponent = (props) => (
  <div id="results" className="small-12 columns" style={{paddingTop:'10px'}}>

      {props.results.map( (r,i) => (
        <div className="panel row" style={style.result}>
            <div className="header large-12 columns" style={style.header}>
                {r.title}
                <a href="javascript:void(0)" className="float-right" style={style.btn_check}>
                  <i className="fa fa-check"></i>
                </a>
            </div>
            <div style={style.panel_content} className="large-12 columns">
                {r.nodes.map( (n,j) => (
                  <div key={j} className="row" style={style.row}>
                      <div className="large-1 columns" style={{textAlign:'center'}} data-equalizer-watch>
                        <i className="fa fa-bus"></i>
                        {n.route}
                      </div>
                      <div className="large-11 columns end" style={{lineHeight:'40px'}} data-equalizer-watch>
                        From <b>{n.start}</b> to <b>{n.end}</b>
                      </div>
                  </div>
                ) )}
            </div>
       </div>
      ) )}
  </div>
);

export default ResultsComponent;
