import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  container : {
    display : 'flex',
    justifyContent: 'center',
  },
})

class FlashcardsPage extends Component {

  state = {
    sortBy : ''
  }

  //this function updates state when a new filter is selected
  handleChange= (event)=> {
    this.setState({
      sortBy: event.target.value
    })
  }

  //Dispatch a request to get flashcards from the database
  //pass the user_id and a filter as the payload to sort the database query
  getFlashcards= ()=> {
    
    this.props.dispatch({type: 'GET_FLASHCARDS', payload: {id: this.props.user.id, filter: this.state.sortBy}})
  }
  

  render() {
    const {classes} = this.props
    return (
      
      <div>
        <button onClick={this.getFlashcards}>Begin Flashcards</button>
        <div>
          <Select onChange={this.handleChange}>
            <MenuItem value='id'>Newest</MenuItem>
            <MenuItem value='frequency'>Difficulty</MenuItem>
            <MenuItem value='RANDOM()'>Random</MenuItem>
          </Select>
        </div>
        <div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(FlashcardsPage));