import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  containers : {
    display: 'flex',
    justifyContent: 'center',
    },
    table : {
      width: 750,
      margin: 'auto',
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
})
class AllCardsPage extends Component {

  state = {
    open : false,
    editWord: '',
    editTranslation: '',
    word_id: '',
  }


  handleClickOpen = (word, translation, word_ids) =>{
    this.setState({
      ...this.state,
      editWord: word,
      editTranslation: translation,
      word_id: word_ids,
      open : true,
    })
  }  

  handleClose= () => {
    this.setState({
      ...this.state,
      open: false,
    })
  }

  handleChange= (tag) => event=> {
    this.setState({
      ...this.state,
      [tag] : event.target.value
    })
  }

  getAllCards=() => {
    console.log(this.props.user.id)
    this.props.dispatch({type: 'GET_ALL_CARDS', payload: this.props.user.id})
  }

  componentDidMount() {
    this.getAllCards();
  }

  editWord=()=> {
    this.props.dispatch({type: 'EDIT_FLASHCARD', 
    payload: {
      word: this.state.editWord, 
      translation: this.state.editTranslation, 
      word_id: this.state.word_id,
      user_id: this.props.user.id,
    }})
    this.handleClose();
  }
  

  render() {
    const {classes} = this.props
    return (
      <div>
        <div className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell>Translation</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
        {this.props.allcards.map(item => {
          return(
            <TableRow className={classes.row}>
              <TableCell>{item.native_word}</TableCell>
              <TableCell>{item.translation}</TableCell>
              <TableCell>
                <Button className={classes.button} onClick={()=>this.handleClickOpen(item.native_word, item.translation, item.id)} variant="raised">Edit</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open}
              onClose={this.handleClose}
              >
              <DialogTitle>Edit Card</DialogTitle>
                <DialogContent>
                  <FormControl>
                    <InputLabel></InputLabel>
                      <TextField
                        label='Edit Word'
                        value= {this.state.editWord}
                        className={classes.input}
                        onChange={this.handleChange('editWord')}
                        variant='outlined'
                        margin= 'normal'
                      />
                      <TextField
                        label='Edit Translation'
                        value= {this.state.editTranslation}
                        className={classes.input}
                        onChange={this.handleChange('editTranslation')}
                        variant='outlined'
                        margin= 'normal'
                      />
                  </FormControl>
                </DialogContent>
              <DialogActions>
                <Button onClick={()=>this.handleClose()}>
                  Cancel
                </Button>
                <Button onClick={()=>this.editWord()}>
                  Confirm Edit
                </Button>
              </DialogActions>
              </Dialog>
              </TableCell>
            </TableRow>
          )
        })}
        
        </Table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user,
  allcards: state.allcards,
});

export default connect(mapStateToProps)(withStyles(styles)(AllCardsPage));