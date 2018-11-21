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
    native_language : this.props.settings.native_language,
    translated_language: this.props.settings.translated_language,
    session_frequency: this.props.settings.session_frequency,
    cards_per_session: this.props.settings.cards_per_session,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
  }

  //this function gets current settings from the database
  getSettings=() => {
    this.props.dispatch({type: 'GET_SETTINGS', payload: this.props.user.id})
  }

  //this calls our getSettings function once the page loads
  componentDidMount() {
    this.getSettings();
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
    this.props.dispatch(
      {type: 'UPDATE_SETTINGS', 
      payload: {
        native: this.state.native_language, 
        translated: this.state.translated_language,
        sessions: this.state.session_frequency, 
        words: this.state.words_per_session, 
        user_id: this.props.user.id
      }
    })
  }
  

  render() {
    const {classes} = this.props
    return (
      <div className={classes.containers}>
        <div className={classes.form}>
          <Paper >
            <header>
              <h3>Settings</h3>
            </header>
            <div className={classes.paper}>
            <div className={classes.inputTitles}>
              <Typography className={classes.labels} variant='h5'>
                Native Language: {this.props.settings.native_language}
              </Typography>
              <Typography className={classes.labels} variant='h5'>
                Translation Language: {this.props.settings.translated_language}
              </Typography>
              <Typography className={classes.labels} variant='h5'>
                Session Frequency: {this.props.settings.session_frequency}
              </Typography>
              <Typography className={classes.labels} variant='h5'>
                Words Per Session: {this.props.settings.cards_per_session}
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
                      <option/>
                      <option value='5'>English</option>  
                      <option value='16'>Spanish</option>
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
                    value={this.state.translated_language}
                    onChange={this.handleChange('translated_language')}
                    >
                      <option/>
                      <option value='5'>English</option>  
                      <option value='16'>Spanish</option>
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

              <Button className={classes.button} onClick={()=>this.handleClickOpen('open3')} variant="raised">Change Session Frequency</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open3}
              onClose={this.handleClose}
              >
              <DialogTitle>Frequency</DialogTitle>
              <DialogContent>
                <FormControl>
                  <InputLabel>Hours</InputLabel>
                  <Select
                    native
                    value={this.state.session_frequency}
                    onChange={this.handleChange('session_frequency')}
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
                      value={this.state.words_per_session}
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
});

export default connect(mapStateToProps)(withStyles(styles)(SettingsPage));