import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

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
      width: 500,
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: 20,
      paddingBottom: 20,
    },
    inputTitles : {
      marginTop : 38
    },
    labels : {
      marginBottom: 48,
    },
    inputFields : {
      display: 'flex',
      flexDirection: 'column',
    }

})

class SettingsPage extends Component {
  

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
                Native Language:
              </Typography>
              <Typography className={classes.labels} variant='h5'>
                Translation Language:
              </Typography>
              <Typography className={classes.labels} variant='h5'>
                Session Frequency:
              </Typography>
              <Typography className={classes.labels} variant='h5'>
                Words Per Session:
              </Typography>
            </div>
            <div className={classes.inputFields}>
            <TextField
              label='Native Language'
              variant='outlined'
              margin= 'normal' 
            />
            <TextField
              label='Translation Language'
              variant='outlined'
              margin= 'normal' 
            />
            <TextField
              label='Session Frequency'
              variant='outlined'
              margin= 'normal' 
            />
            <TextField
              label='Cards Per Session'
              variant='outlined'
              margin= 'normal' 
            />
            </div>
            </div>
            <Button>Confirm</Button>
          </Paper>
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
});

export default connect(mapStateToProps)(withStyles(styles)(SettingsPage));