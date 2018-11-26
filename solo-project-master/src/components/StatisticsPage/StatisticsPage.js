import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import {Bar, Line, Pie} from 'react-chartjs-2';
import { withStyles } from '@material-ui/core';
import ProgressChart from '../ProgressChart/ProgressChart'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

const CustomTableCell = withStyles(theme => ({
  head: {
    borderWidth: 2,
    borderSyle: 'solid',
    borderColor: 'black',
    fontSize: 20,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
    },
    table : {
      width: 750,
      marginTop: 40,
      margin: 'auto',
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    

})
class StatisticsPage extends Component {
  

  getHistory= () => {
    this.props.dispatch({type: 'GET_HISTORY', payload: this.props.user.id})
  }

  //this function will filter through our history array in redux state and create a new array
  //filter by past day, week, month, and all time.  Dates are converted to milliseconds for this
  //functions math
  searchHistory= (string) => {
    console.log('running', string)
    let now = Date.now();
    switch(string){
      case 'day':
        let dayArray = this.props.hist.filter(item => Date.parse(item.date) > now-86400000)
        let dayCorrect = dayArray.filter(item => item.correct == 1)
        let dayIncorrect = dayArray.filter(item => item.incorrect == 1)
        return [dayCorrect.length,dayIncorrect.length];
      case 'week':
        let weekArray = this.props.hist.filter(item => Date.parse(item.date) > now-604800000)
        let weekCorrect = weekArray.filter(item => item.correct == 1)
        let weekIncorrect = weekArray.filter(item => item.incorrect == 1)
        return [weekCorrect.length,weekIncorrect.length]; 
      case 'month':
        let monthArray = this.props.hist.filter(item => Date.parse(item.date) > now-2419200000)
        let monthCorrect = monthArray.filter(item => item.correct == 1)
        let monthIncorrect = monthArray.filter(item => item.incorrect == 1)
        return [monthCorrect.length,monthIncorrect.length]; 
      case 'career':
        let careerCorrect = this.props.hist.filter(item => item.correct ==1)  
        let careerIncorrect = this.props.hist.filter(item => item.incorrect ==1) 
        return [careerCorrect.length, careerIncorrect.length]
    }
  }

  correctOrNot=(correct)=> {
    console.log('running')
    if(correct == 1){
      return (<h7 style={{color: 'green'}}>✓</h7>)
    } else {
      return (<h7 style={{color: 'red'}}>X</h7>)
      //return (<IconButton><DeleteIcon /></IconButton>)
    }
  }

  componentDidMount() {
    this.getHistory();
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        {/* <div><IconButton><DeleteIcon /></IconButton></div> */}
        <div className={classes.pieholder}>
        {/* <ProgressChart /> */}
        <div className={classes.piechart}>
          <Pie
            data={{
              labels: ['Correct','Incorrect'],
              datasets:[
                {
                  label:'Past Day',
                  data:
                    this.searchHistory('day')
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
                text:'Past Day',
                fontSize:25
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
            />
        </div>
        <div className={classes.piechart}>
          <Pie
            data={{
              labels: ['Correct','Incorrect'],
              datasets:[
                {
                  label:'Past Week',
                  data:
                    this.searchHistory('week')
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
                text:'Past Week',
                fontSize:25
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
            />
        </div>
        <div className={classes.piechart}>
          <Pie
            data={{
              labels: ['Correct','Incorrect'],
              datasets:[
                {
                  label:'Past Month',
                  data:
                    this.searchHistory('month')
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
                text:'Past Month',
                fontSize:25
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
            />
        </div>
        <div className={classes.piechart}>
          <Pie
            data={{
              labels: ['Correct','Incorrect'],
              datasets:[
                {
                  label:'All Time',
                  data:
                    this.searchHistory('career')
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
                text:'All Time',
                fontSize:25
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
            />
        </div>
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Date</CustomTableCell>
              <CustomTableCell>Correct</CustomTableCell>
              <CustomTableCell>Word</CustomTableCell>
              <CustomTableCell>Translation</CustomTableCell>
            </TableRow>
          </TableHead>
        {this.props.hist.map(item => {
          return(
            <TableRow className={classes.row}>
              <CustomTableCell>{Date(item.date).slice(4,15)}</CustomTableCell>
              <CustomTableCell>{this.correctOrNot(item.correct)}</CustomTableCell>
              <CustomTableCell>{item.native_word}</CustomTableCell>
              <CustomTableCell>{item.translation}</CustomTableCell>
            </TableRow>
          )
        })}
        
        </Table>
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
  hist: state.flashcardHistory
});

export default connect(mapStateToProps)(withStyles(styles)(StatisticsPage));