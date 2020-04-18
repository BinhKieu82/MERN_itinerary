import React, { Component } from "react";
import ItinerariesList from "./itinerariesList";
import { fetchFavorites } from "../../store/actions/favoriteActions";
import { fetchAllComments } from "../../store/actions/commentActions";
import Footer from "../Footer";
import { connect } from "react-redux";
import M from "materialize-css";
import PropTypes from 'prop-types';

export class Favorites extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    favorites: PropTypes.object.isRequired,
    fetchFavorites: PropTypes.func,
    fetchAllComments: PropTypes.func
  }

  componentDidMount() {
    this.props.fetchFavorites();
    this.props.fetchAllComments();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.auth.favorites !== nextProps.auth.favorites) {
      this.props.fetchFavorites();
    }
  }

  componentDidUpdate() {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, { inDuration: 300 });
  }

  loader() {
    return (
      <div>
        <div className="lds-css ng-scope">
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }

  content() {
    if (Object.keys(this.props.favorites.error).length === 0) {
      return (
        <div className="itinerary-city">
          <h1>Favorite Itineraries</h1>
          <ul className="collapsible">
            <ItinerariesList
              itineraries={this.props.favorites.payload}
              fav={true}
            />
          </ul>
        </div>
      );
    } else {
      return (
        <>
          <div className="alert">
            <p>{this.props.favorites.error}</p>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <div className="itineraries">
        {!this.props.favorites.isLoading ? this.content() : this.loader()}
        <Footer back={localStorage.getItem("url")} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    favorites: state.favorites
  };
};
export default connect(
  mapStateToProps,
  { fetchFavorites, fetchAllComments }
)(Favorites);
