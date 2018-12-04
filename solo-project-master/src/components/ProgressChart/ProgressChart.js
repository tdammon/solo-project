import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Bar, Line, Pie} from 'react-chartjs-2';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  containers : {
    display: 'flex',
    marginTop: 40,
    marginRight: 15,
    justifyContent: 'flex-start',
    // position: 'relative',
    },
    pieholder: {
      display: 'flex',
      flexDirection: 'column',
      leftPadding: 25,
      margin: 'auto',
    },
    piechart : {
      // width: 300,
      height: 240,
      display: 'flex',
      justifyContent: 'spaceBetween',
      paddingLeft: 15,
    }


    

})
class ProgressChart extends Component {

  //this function gets current settings from the database
  getSettings=() => {
    this.props.dispatch({type: 'GET_SETTINGS', payload: this.props.user.id})
  }

  // This function gets a list of the words mastered
  getWordsMastered=() => {
    this.props.dispatch({type: 'GET_MASTERED', payload: this.props.user.id})
  }

  // Get settings and words mastered when component mounts
  componentDidMount() {
      this.getSettings();
      this.getWordsMastered();
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.containers}>
        <div className={classes.pieholder}>
        {/* <div className={classes.piechart}>
        <Pie
            data={{
              labels: ['Total Words Mastered','Words To Go'],
              datasets:[
                {
                  label:'Words To Fluency',
                  data:
                    [this.props.settings.words_mastered, 3000-this.props.settings.words_mastered]
                  ,
                  backgroundColor:[
                    'green',
                    'red'
                  ]
                }
              ]
            }}
            options={{
              title:{
                display:true,
                text:`Master ${3000-this.props.settings.words_mastered} More Words!`,
                fontSize:25
              },
              legend:{
                display:true,
                position:'right'
              },
              cutoutPercentage: 50,
            }}
            />
        </div> */}
        <div className={classes.piechart}>
        <Bar
            data={{
              labels: ['Weekly Progress'],
              datasets:[
                {
                  label:'Mastered',
                  data: [this.props.mastered.count],
                  backgroundColor: ['green']
                },
                {
                  label: 'Words To Go',
                  data: [this.props.settings.words_per_week],
                  backgroundColor: ['red']
                }
              ]
            }}
            options={{
              title:{
                display:true,
                text:`Weely Progress!`,
                fontSize:25
              },
              legend:{
                display:true,
                position:'right'
              },
              maintainAspectRatio: false,
              scales: {
                xAxes: [{
                  stacked: true,
                  categoryPercentage: 0.9,
                  
                  
                }],
                yAxes: [{
                  stacked: true,
                  ticks: {
                      beginAtZero: true,
                      max: this.props.settings.words_per_week,
                      stepSize: 3,
                      }
                    }],
              }
            }}
            />
        </div>
        {/* {JSON.stringify(this.props.mastered)} */}
      </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user,
  hist: state.flashcardHistory,
  settings: state.settingsReducer,
  mastered: state.masteredCards,
});

export default connect(mapStateToProps)(withStyles(styles)(ProgressChart));