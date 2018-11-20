import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class StatisticsPage extends Component {
  

  getHistory= () => {
    this.props.dispatch({type: 'GET_HISTORY', payload: this.props.user.id})
  }

  componentDidMount() {
    this.getHistory();
  }

  render() {
    return (
      <div>
        {/* {this.props.hist.map(item => {
          return(
            <TableRow>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.correct}</TableCell>
              <TableCell>{item.incorrect}</TableCell>
              <TableCell>{item.word_id}</TableCell>
            </TableRow>
          )
        })} */}
        {JSON.stringify(this.props.hist)}
        
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

export default connect(mapStateToProps)(StatisticsPage);