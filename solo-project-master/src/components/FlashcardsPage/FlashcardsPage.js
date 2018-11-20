import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container : {
    display : 'flex',
    justifyContent: 'center',
    
    
  },
  flashcardBox : {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    width: 500,
    padding: 35,
    marginTop: 20,
    borderRadius: 10,
  },
  options : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  group: {
    margin: 20,
  },
  select: {
    height: 30,
    backgroundColor: 'default'
  },
  flashcard: {
    display: 'flex',
    backgroundColor: 'white',
    height: 180,
    width: 250,
    marginLeft: 20,
    // marginRight: 20,
  },
  responseButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginTop: 2,
  },
  response: {
    fontSize: 11,
    padding: 10,
  }
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
      <div className={classes.container}>
        <div className={classes.flashcardBox}>
          <div className={classes.options}>
            <Button onClick={this.getFlashcards} variant='raised'>Begin Flashcards</Button>
            <FormControl>
              <RadioGroup className={classes.group} value={this.state.sortBy} onChange={this.handleChange}>
                <FormControlLabel className={classes.select} value='id' control={<Radio />} label='Newest'/>
                <FormControlLabel className={classes.select} value='frequency' control={<Radio />} label='Difficulty' />
                <FormControlLabel className={classes.select} value='RANDOM()' control={<Radio />} label='Random' />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <div className={classes.flashcard}>

            </div>
            <div className={classes.responseButtons}>
              <Button className={classes.response} variant='raised'>Incorrect</Button>
              <Button className={classes.response} variant='raised'>Lock</Button>
              <Button className={classes.response} variant='raised'>Correct</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(FlashcardsPage));