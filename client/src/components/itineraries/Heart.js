import React, { Component } from "react";
import { postFavorite } from "../../store/actions/authActions";
//import { loadUser } from "../../store/actions/authActions";
import { fetchFavorites } from "../../store/actions/favoriteActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

export class Heart extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    favorites: PropTypes.object.isRequired,
    postFavorite: PropTypes.func,
    fetchFavorites: PropTypes.func
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.auth.favorites !== nextProps.auth.favorites) { 
      this.props.fetchFavorites();
    }    
  }
  // componentDidMount() {    
  //   if (this.props.auth.favorites !== nextProps.auth.favorites) {
  //     this.props.fetchFavorites();
  //   }   
  //   this.loggedInHeart();   
  // }

  loggedInHeart () {
    if (this.props.auth.favorites.length === 0 && this.props.auth.user.favorites !== 0) {
      this.props.auth.favorites = this.props.auth.user.favorites;
      if (this.props.auth.favorites.includes(this.props.itinerary._id)) {
        // console.log('Heart itinerary.id:', this.props.itinerary._id);
        //console.log('Refresh Heart auth.favorites:', this.props.auth.favorites);
        return (
          <span
            className="favorite col s2"
            onClick={() => this.clickHeart(this.props.itinerary._id, true)}
          >
            <i className="material-icons">favorite</i>
          </span>
        );
      } else {
        return (
          <span
            className="favorite col s2"
            onClick={() => this.clickHeart(this.props.itinerary._id, false)}
          >
            <i className="material-icons">favorite_border</i>
          </span>
        );
      }
    }
    //this.props.auth.user.favorites = this.props.auth.favorites;
    if (this.props.auth.favorites.includes(this.props.itinerary._id)) {      
      //console.log('Heart auth.favorites:', this.props.auth.favorites);
      return (
        <span
          className="favorite col s2"
          onClick={() => this.clickHeart(this.props.itinerary._id, true)}
        >
          <i className="material-icons">favorite</i>
        </span>
      );
    } else {
      return (
        <span
          className="favorite col s2"
          onClick={() => this.clickHeart(this.props.itinerary._id, false)}
        >
          <i className="material-icons">favorite_border</i>
        </span>
      );
    }
  }

  notLoggedInHeart () {
    return (
      <i className="material-icons logout-favorite col s2">favorite_border</i>
    );
  }

  clickHeart(id, fav) {
    //debugger;
    if (!fav) {
      this.props.postFavorite(id);
    } else if (
      window.confirm(
        "Do you want to remove this itinerary from your favorites?"
      )
    ) {
      this.props.postFavorite(id);
    }
  }

  render() {
    //console.log('Heart auth.favorite:', this.props.auth.favorites);
    //console.log('Heart auth.user.favorite:', this.props.auth.user.favorites);
    return (
      <>
        {this.props.auth.isAuthenticated
          ? this.loggedInHeart()
          : this.notLoggedInHeart()}
      </>
    );
  }
}

const mapStateToProps = state => {
  //console.log('Heart state.favorites', state.favorites)
  //console.log('Heart state.auth', state.auth)
  //console.log('Heart state.auth.favorite', state.auth.favorites)
  return {
    auth: state.auth,
    favorites: state.favorites
  };
};

export default connect(
  mapStateToProps,
  { postFavorite, fetchFavorites }
)(Heart);
