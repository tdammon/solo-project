import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Bar, Line, Pie} from 'react-chartjs-2';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  containers : {
    display: 'flex',
    justifyContent: 'center',
    },
    pieholder: {
      display: 'flex',
    },
    piechart : {
      width: 400,
      display: 'flex',
    }


    

})
class ProgressChart extends Component {

    displayData= () => {
        let progress = this.props.settings.words_mastered % 20;
        let toGo = 20 -progress;

        return [progress, toGo]
    }

    //this function gets current settings from the database
  getSettings=() => {
    this.props.dispatch({type: 'GET_SETTINGS', payload: this.props.user.id})
  }

  componentDidMount() {
      this.getSettings();
  }

  render() {
    const {classes} = this.props
    return (
        <div className={classes.pieholder}>
      <div className={classes.piechart}>
        <Pie
            data={{
              labels: ['Words Mastered','Words To Go'],
              datasets:[
                {
                  label:'Next Level',
                  data:
                    this.displayData()
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
                text:`Master ${this.displayData()[1]} More for the Next Level!`,
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
        <Pie
            data={{
              labels: ['Total Words Mastered','Words Until 3000'],
              datasets:[
                {
                  label:'Words To Fluency',
                  data:
                    [this.props.settings.words_mastered, 3000]
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
                text:`Master ${3000-this.props.settings.words_mastered} More Words for Fluency!`,
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
  settings: state.settingsReducer
});

export default connect(mapStateToProps)(withStyles(styles)(ProgressChart));