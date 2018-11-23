import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, Typography, OutlinedInput, Dialog, Input } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
  containers : {
    display: 'flex',
    justifyContent: 'center',
    },
    form : {
      backgroundColor: '#dbd5d5',
      height: 'auto',
      margin: 20,
      padding: 25,
      borderRadius: 5,
    },
    paper : {
      width: 750,
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: 20,
      paddingBottom: 20,
    },
    inputTitles : {
      marginTop : 35,
      width: 350,
    },
    labels : {
      marginBottom: 48,
    },
    inputFields : {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 10,
    },
    button : {
      margin: 22,
    }

})

class SettingsPage extends Component {

  //state needs multiple open parameters in order to differentiate between
  //the settings pop-ups
  state = {
    native_language : null,
    translated_language: null,
    cards_per_session: null,
    words_mastered: null,
    words_per_week: null,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
  }

  //this function gets current settings from the database
  getSettings=() => {
    this.props.dispatch({type: 'GET_SETTINGS', payload: this.props.user.id})
  }

  //this function gets all languages from the database
  getLanguages=() => {
    this.props.dispatch({type: 'GET_LANGUAGES'})
  }

  //this calls our getSettings function once the page loads
  componentDidMount() {
    this.getSettings();
    this.getLanguages();
    
  }
  
  //this function handles the changes to settings which happen when a user
  //updates one of the dropdown menus
  handleChange= (tag)=> event => {
    this.setState({
      ...this.state,
      [tag] : event.target.value
    })
    console.log(this.state)
  }

  //this function handles which dropdown menu will be opened when a user clicks one of
  // the change settings buttons
  handleClickOpen = (tag) =>{
    this.setState({
      ...this.state,
      [tag] : true,
    })

  }

  //this function will close whichever settings menu is currently open
  handleClose= (tag) => {
    this.setState({
      ...this.state,
      [tag]: false,
    })
  }

  //this function updates the current users settings
  updateSettings=()=> {
    let s = this.state
    let l = this.props.settings
    
    if(this.props.settings.native_language) {
      console.log('updating')
    this.props.dispatch(
      {type: 'UPDATE_SETTINGS', 
      payload: {
        native: s.native_language || l.nat_lang_id, 
        translated: s.translated_language || l.trans_lang_id,
        words_per_week: s.words_per_week || l.words_per_week, 
        words: s.words_per_session || l.cards_per_session,
        words_mastered: s.words_mastered || l.words_mastered, 
        user_id: this.props.user.id
      }
    })
  } else {
    console.log('new')
    this.props.dispatch(
      {type: 'NEW_SETTINGS',
      payload: {
        native: s.native_language, 
        translated: s.translated_language,
        words_per_week: s.words_per_week, 
        words: s.words_per_session, 
        words_mastered: s.words_mastered,
        user_id: this.props.user.id
      }
    })
  }
  }
  

  render() {
    const {classes} = this.props
    return (
      <div className={classes.containers}>
      {/* {JSON.stringify(this.props.settings)} */}
        <div className={classes.form}>
          <Paper >
            <header>
              <h3>Settings</h3>
            </header>
            <div className={classes.paper}>
            <div className={classes.inputTitles}>
              <Typography className={classes.labels} variant='h6'>
                Native Language: {this.props.settings.native_language}
              </Typography>
              <Typography className={classes.labels} variant='h6'>
                Translation Language: {this.props.settings.translated_language}
              </Typography>
              <Typography className={classes.labels} variant='h6'>
                Words Per Week: {this.props.settings.words_per_week}
              </Typography>
              <Typography className={classes.labels} variant='h6'>
                Words Per Session: {this.props.settings.cards_per_session}
              </Typography>
              <Typography className={classes.labels} variant='h6'>
                Words Mastered: {this.props.settings.words_mastered}
              </Typography>
            </div>
            <div className={classes.inputFields}>
            
            <Button className={classes.button} onClick={()=>this.handleClickOpen('open1')} variant="raised" >Change Native Language</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open1}
              onClose={this.handleClose}
              >
              <DialogTitle>Select Language</DialogTitle>
              <DialogContent>
                <FormControl>
                  <InputLabel>Language</InputLabel>
                  <Select
                    native
                    value={this.state.native_language}
                    onChange={this.handleChange('native_language')}
                    >
                    <option />
                    {this.props.languages.map(language => {
                      return(<option value={language.id}>{language.language}</option>)
                    })}
                    </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>this.handleClose('open1')}>
                  Cancel
                </Button>
                <Button onClick={()=>this.handleClose('open1')}>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>

              <Button className={classes.button} onClick={()=>this.handleClickOpen('open2')} variant="raised">Change Translated Language</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open2}
              onClose={this.handleClose}
              >
              <DialogTitle>Select Language</DialogTitle>
              <DialogContent>
                <FormControl>
                  <InputLabel>Language</InputLabel>
                  <Select
                    native
                    //value={this.state.translated_language}
                    onChange={this.handleChange('translated_language')}
                    >
                    <option />
                    {this.props.languages.map(language => {
                      return(<option value={language.id}>{language.language}</option>)
                    })}
                    </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>this.handleClose('open2')}>
                  Cancel
                </Button>
                <Button onClick={()=>this.handleClose('open2')}>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>

              <Button className={classes.button} onClick={()=>this.handleClickOpen('open3')} variant="raised">Change Words Per Week</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open3}
              onClose={this.handleClose}
              >
              <DialogTitle>How Many Words Will You Master Each Week?</DialogTitle>
              <DialogContent>
                <FormControl>
                  <InputLabel>Words</InputLabel>
                  <Select
                    native
                    //value={this.state.session_frequency}
                    onChange={this.handleChange('words_per_week')}
                    >
                      <option/>
                      <option value='12'>12</option>  
                      <option value='24'>24</option>
                    </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>this.handleClose('open3')}>
                  Cancel
                </Button>
                <Button onClick={()=>this.handleClose('open3')}>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>

              <Button className={classes.button} onClick={()=>this.handleClickOpen('open4')} variant="raised">Change Words Per Session</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open4}
              onClose={this.handleClose}
              >
              <DialogTitle>Change Cards Per Session</DialogTitle>
                <DialogContent>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Select
                      native
                      //value={this.state.cards_per_session}
                      onChange={this.handleChange('words_per_session')}
                      >
                        <option/>
                        <option value='20'>20</option>  
                        <option value='40'>40</option>
                      </Select>
                  </FormControl>
                </DialogContent>
              <DialogActions>
                <Button onClick={()=>this.handleClose('open4')}>
                  Cancel
                </Button>
                <Button onClick={()=>this.handleClose('open4')}>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>

              <Button className={classes.button} onClick={()=>this.handleClickOpen('open5')} variant="raised">Change Words Mastered</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open5}
              onClose={this.handleClose}
              >
              <DialogTitle>How Many Words Have You Mastered?</DialogTitle>
              <DialogContent>
                <FormControl>
                  <InputLabel></InputLabel>
                    <p>
                      Below is a list of words and which level of word mastery they fall under.<br></br>
                      <br></br>
                      0 - 250 : He, She, Woman, Go, In, Make, House<br></br>
                      250 - 500 : Under, Together, Music, Until, Feel, Knew<br></br>
                      500-1000 : Wait, Deep, Meet, Skin, Protect, Current<br></br>
                      1000-1500: Nature, Motion, Enemy, Glass, Happen, Powerful<br></br>
                      1500-2000: Somehow, Emergency, Occasion, Adjust<br></br>
                      <br></br>
                      Enter a number below that fits the range you fall into.
                    </p>
                      <TextField
                        label='Words Known'
                        value= {this.state.words_mastered}
                        
                        onChange={this.handleChange('words_mastered')}
                        variant='outlined'
                        margin= 'normal'
                      />
                    
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>this.handleClose('open5')}>
                  Cancel
                </Button>
                <Button onClick={()=>this.handleClose('open5')}>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>

            </div>
            </div>
            <Button onClick={this.updateSettings}>Confirm</Button>
          </Paper>
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.user,
  settings: state.settingsReducer,
  languages: state.languages,
});

export default connect(mapStateToProps)(withStyles(styles)(SettingsPage));