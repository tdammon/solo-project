import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core';
import { call, put} from 'redux-saga/effects';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import {ThumbUpAlt, ThumbDownAlt, Lock} from '@material-ui/icons'

const styles = theme => ({
  container : {
    display : 'flex',
    justifyContent: 'center',
    
    
  },
  flashcardBox : {
    display: 'flex',
    justifyContent: 'space-between',
    // backgroundColor: 'grey',
    backgroundColor: '#dbd5d5',
    width: 500,
    padding: 35,
    marginTop: 40,
    borderRadius: 10,
  },
  options : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    
    paddingLeft: 10,
    paddingBottom:15,
  },
  group: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#E8E8E8',

  },
  select: {
    height: 30,
    marginLeft: 0,
  },
  flashcard: {
    display: 'flex',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: 180,
    width: 250,
    // marginLeft: 20,
    // marginRight: 20,
  },
  responseButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignSelf: 'flex-end',
    width: 200,
    // marginLeft: 20,
    marginTop: 2,
  },
  centerItem: {
    margin: 'auto',
  },
  word: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    width: 250,
    height: 100,
    margin: 'auto',
    fontSize: 25,
  },
  response: {
    fontSize: 11,
    padding: 10,
  }
})

class FlashcardsPage extends Component {

  state = {
    sortBy : '',
    front: '',
    back: '',
    word_id: '',
    flip: false,
  }

  //this function updates state when a new filter is selected
  handleChange= (event)=> {
    this.setState({
      ...this.state,
      sortBy: event.target.value
    })
  }

  //Dispatch a request to get flashcards from the database
  //pass the user_id and a filter as the payload to sort the database query
  getFlashcards= ()=> {
    
    this.props.dispatch({type: 'GET_FLASHCARDS', payload: {id: this.props.user.id, filter: this.state.sortBy}})
  }

  componentDidUpdate(prevProps){
    if(this.props.flashcards !== prevProps.flashcards){
      this.beginFlashcardSession()
    }
  }
  

  beginFlashcardSession=()=> {
    let deck = this.props.flashcards;
    let card = this.props.flashcards[0];
    let front = card.native_word
    let back = card.translation;
    let word_id = card.id
    this.setState({
      ...this.state,
      front: front,
      back: back,
      word_id : word_id,
    }, ()=>this.displayFlashcard(deck))
  }

  flipCard = () => {
    this.setState({
      ...this.state,
      flip: !this.state.flip,
    })
  }

  displayFlashcard = (deck) => {
    if(!this.state.flip){
      return this.state.front;
    } else {
      return (<div><div>{this.state.back}</div></div>)
    }
  }

  sendAnswer = (number) => {
    let frequencyUpdate = {}
    switch(number) {
      case '1':
      frequencyUpdate = {frequency: 'frequency+0.05', incorrect: 1, correct: 0, date_mastered: null};
      this.props.dispatch({type: 'POST_HISTORY', payload: {user_id : this.props.user.id, word_id : this.state.word_id, frequencyUpdate}})
      break;
      case '2':
      frequencyUpdate = {frequency: '0', words_mastered: 'words_mastered+1', date_mastered: 'now()'};
      this.props.dispatch({type: 'LOCK_CARD', payload: {user_id : this.props.user.id, word_id : this.state.word_id, frequencyUpdate}})
      break;
      case '3':
      frequencyUpdate = {frequency: 'frequency-0.05', incorrect: 0, correct: 1, date_mastered: null};
      this.props.dispatch({type: 'POST_HISTORY', payload: {user_id : this.props.user.id, word_id : this.state.word_id, frequencyUpdate}})
      break;
    }
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
            <div className={classes.flashcard} >
              <div className={classes.word} onClick={this.flipCard}> 
              <p className={classes.centerItem}>{this.displayFlashcard()}</p>
              </div>
              <div className={classes.responseButtons}>
              <IconButton onClick={()=>this.sendAnswer('1')}>
              <ThumbDownAlt />
              </IconButton >
              <IconButton onClick={()=>this.sendAnswer('2')}>
              <Lock />
              </IconButton>
              <IconButton onClick={()=>this.sendAnswer('3')}>
              <ThumbUpAlt />
              </IconButton></div>
            </div>
          </div>
        </div>
        {/* {JSON.stringify(this.props.flashcards)} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  flashcards: state.flashcards
});

export default connect(mapStateToProps)(withStyles(styles)(FlashcardsPage));