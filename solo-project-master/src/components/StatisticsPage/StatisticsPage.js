import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatisticsPage extends Component {
  

  render() {
    return (
      <div>
        StatisticsPage
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(StatisticsPage);