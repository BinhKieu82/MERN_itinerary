import React, { Component } from "react";
import ItinerariesList from "./itinerariesList";
import Footer from "../Footer";
import { connect } from "react-redux";
import { readItineraries } from "../../store/actions/itineraryActions";
import { readActivities } from "../../store/actions/activityActions";
import M from "materialize-css";

class Itineraries extends Component {

  componentDidMount() {
    console.log(`id: ${this.props.match.params.id}`);
    this.props.readItineraries(this.props.match.params.id);
    this.props.readActivities(this.props.match.params.id);
    console.log(this.props.activites);
  }

  componentDidUpdate() {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, { inDuration: 300 });
  }

  // loader() {
  //   return (
  //     <div>
  //       <div className="lds-css ng-scope">
  //         <div className="lds-ripple">
  //           <div />
  //           <div />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  getCity() {
    return (
      this.props.itineraries.itineraries
        .map(itinerary => itinerary.city.name)
        .reduce((previous, current) => {
          return current;
        }, null) || "Bro, this city has no itineraries yet. Be patient"
    );
  }

  content() {
    if (Object.keys(this.props.itineraries.error).length === 0) {
      return (
        <div className="itinerary-city">
          <h1>{this.getCity()}</h1>
          <ul className="collapsible">
            <ItinerariesList itineraries={this.props.itineraries.itineraries} />
          </ul>
        </div>
      );
    } else {
      return (
        <>
          <div className="alert">
            <p>{this.props.itineraries.error.message}</p>
          </div>
        </>
      );
    }
  }

  render() {
    console.log(this.props.match.url);
    localStorage.setItem("url", this.props.match.url);
    return (
      <div className="itineraries">
        {!this.props.itineraries.isLoading ? this.content() : <h4>Please login to see itineraries</h4>}
        <Footer back={"/cities"} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(`State itineraries: ${state.itineraries}`);
  return {
    itineraries: state.itineraries
  };
};

export default connect(
  mapStateToProps,
  {
    readItineraries,
    readActivities
  }
)(Itineraries);
