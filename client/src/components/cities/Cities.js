import React, { Component } from "react";
import { connect } from "react-redux";

import CitiesList from "./CitiesList";
import Footer from "../Footer.js";
import { readCities } from "../../store/actions/cityActions";

export class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  async componentWillMount() {
    if (this.props.cities.cities.length === 0) {
      await this.props.readCities(); 
    }
    //console.log('cities',  this.props.cities);
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
    return (
      <div>
        <div id="all-cities" className="all-cities">
          <CitiesList cities={this.props.cities} />
        </div>
      </div>
    );
  }

  render() {
    localStorage.setItem("url", this.props.match.url);
    return (
      <div>
        {!this.props.cities.isLoading ? this.content() : this.loader()}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities
  };
};

export default connect(
  mapStateToProps,
  { readCities }
)(Cities);
