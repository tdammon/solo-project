import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllCardsPage extends Component {

  getAllCards=() => {
    console.log(this.props.user.id)
    this.props.dispatch({type: 'GET_ALL_CARDS', payload: this.props.user.id})
  }

  componentDidMount() {
    this.getAllCards();
  }
  

  render() {
    return (
      <div>
        {JSON.stringify(this.props)}
        AllCardsPage
      </div>
    );
  }
}


const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user,
  allcards: state.allcards,
});

export default connect(mapStateToProps)(AllCardsPage);