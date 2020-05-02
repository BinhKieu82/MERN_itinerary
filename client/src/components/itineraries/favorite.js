// import React, { Component } from "react";
// import ItinerariesList from "./itinerariesList";


// export class Favorite extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       favorites: []
//     }
//   }
//   componentDidMount() {
//     this.setState({
//       favorites: this.props.favorites.favorites
//     })
//   }
//   render() {
//     //const favorites = this.props.favorites;
//     console.log('Favorite:', this.state.favorites)
//     return(
//       <ItinerariesList
//         itineraries={this.state.favorites} //array of itinerary._id
//         fav={true}
//       />
//     )
//   }
// }