import React, { Component } from "react";
//import ItinerariesList from "./itinerariesList";
import {Favorite} from "./favorite";
import { fetchFavorites } from "../../store/actions/favoriteActions";
import { fetchAllComments } from "../../store/actions/commentActions";
import Footer from "../Footer";
import { connect } from "react-redux";
import M from "materialize-css";
import PropTypes from 'prop-types';

class Favorites extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     itineraries: []
  //   }
  // }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    favorites: PropTypes.object.isRequired,
    fetchFavorites: PropTypes.func,
    fetchAllComments: PropTypes.func
  }

  async componentDidMount() {
    await this.props.fetchFavorites(); //receiver user.itinerary._id array
    await this.props.fetchAllComments();
    // await this.setState({
    //   itineraries: this.props.favorites.payload
    // })
    await console.log('Favorite itinerary state:', this.props.favorites.payload);
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (this.props.auth.favorites !== nextProps.auth.favorites) {
  //     this.props.fetchFavorites();
  //   }
  //   this.setState({
  //     itineraries: this.props.favorites.payload
  //   })
  // }

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
    const favorites = this.props.favorites.payload;
    //console.log('Favorites content:', favorites)
    // const itineraries = favorites.favorites;
    // console.log('Favorites content:', itineraries);
    if (Object.keys(this.props.favorites.error).length === 0) {
      return (
        <div className="itinerary-city">
          <h1>Favorite Itineraries</h1>
          <ul className="collapsible">
            <Favorite 
              favorites={favorites}
            />
            {/* <ItinerariesList
              itineraries={this.itineraries} //array of itinerary._id
              fav={true}
            /> */}
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
   
    //console.log('Favorite itinerary render:', this.state.itineraries);
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
    auth: state.auth, //is an object contains {token, isAuthenticated, isLoading, user, image, favorites}
    favorites: state.favorites
  };
};
export default connect(
  mapStateToProps,
  { fetchFavorites, fetchAllComments }
)(Favorites);
