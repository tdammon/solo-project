import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  input : {
    width: 500,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
  },
  container : {
    display: 'flex',
    justifyContent: 'center',
  },
  translateBox : {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'grey',
    width: 500,
    padding: 35,
    marginTop: 20,
    borderRadius: 10,
  },
  translateButton: {
    display: 'flex',
    alignSelf: 'center',
    width: 150,
    padding: 10,
  },
  translation: {
    width: 500,
    height: 100,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer : {
    display: 'flex',
    justifyContent: 'space-around',
  }
})

class TranslationPage extends Component {
  
  state = {
    inputText: '',
    translation: '',
  }

  //this function creates the API request to have a word/s translated
  translatePhrase= () => {
    this.props.dispatch({type: 'SEND_API_REQUEST', payload: this.state.inputText})
  }

  //this function updates state when the input field text is updated
  handleChange= (tag) => event => {
    this.setState({
      ...this.state,
      [tag] : event.target.value
    })
  }

  //this function will save the text and translation as a flashcard in the database
  saveFlashCard=()=> {
    this.props.dispatch({type: 'MAKE_FLASHCARD', payload: {...this.state, id: this.props.user.id}})
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.container}>
        <div className={classes.translateBox}>
          <TextField
            label='Input Text'
            value= {this.state.inputText}
            className={classes.input}
            onChange={this.handleChange('inputText')}
            variant='outlined'
            margin= 'normal'
          />
          <Button  onClick={this.translatePhrase} className={classes.translateButton} variant='raised'>Translate</Button>
          <TextField
            className={classes.translation}
            value={this.state.translation}
            onChange={this.handleChange('translation')}
            // variant='outlined'
            multiline
            rows="6"
            margin='normal'
          />
          <div className={classes.buttonContainer}>
            <Button variant='raised'>Discard</Button>
            <Button  onClick={this.saveFlashCard} variant='raised'>Accept</Button>
          </div>
        </div>
        {JSON.stringify(this.props.api)}
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
  api: state.api
});

export default connect(mapStateToProps)(withStyles(styles)(TranslationPage));