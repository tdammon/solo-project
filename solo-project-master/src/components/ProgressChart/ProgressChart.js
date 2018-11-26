import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Bar, Line, Pie} from 'react-chartjs-2';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  containers : {
    display: 'flex',
    margin: 'auto',
    position: 'absolute',
    },
    pieholder: {
      display: 'flex',
      flexDirection: 'column',
      leftPadding: 25,
      margin: 'auto',
    },
    piechart : {
      width: 300,
      display: 'flex',
      justifyContent: 'spaceBetween',
      paddingLeft: 25,
    }


    

})
class ProgressChart extends Component {

  //this function gets current settings from the database
  getSettings=() => {
    this.props.dispatch({type: 'GET_SETTINGS', payload: this.props.user.id})
  }

  getWordsMastered=() => {
    this.props.dispatch({type: 'GET_MASTERED', payload: this.props.user.id})
  }

  componentDidMount() {
      this.getSettings();
      this.getWordsMastered();
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.containers}>
        <div className={classes.pieholder}>
        <div className={classes.piechart}>
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
        </div>
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
              scales: {
                xAxes: [{
                  stacked: true,
                  barThickness: 40,
                  
                }],
                yAxes: [{
                  stacked: true,
                  ticks: {
                      beginAtZero: true,
                      max: this.props.settings.words_per_week,
                      stepSize: 2,
                      scaleStepWidth: 1,
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