import React from "react";
import { Itinerary } from "./itinerary.js";

const ItinerariesList = props => {
  if (props.fav) {
    return props.itineraries
      .sort((a, b) => {
        return a.city.name - b.city.name;
      })
      .map((itinerary, index) => {
        if (index === 0) {
          return (
            <Itinerary
              key={index}
              itinerary={itinerary}
              city={itinerary.city.name}
            />
          );
        } else if (
          props.itineraries[index].city.name ===
          props.itineraries[index - 1].city.name
        ) {          
          return <Itinerary key={index} itinerary={itinerary} />;
        } else {
          return (
            <div>
              <Itinerary
                key={index}
                itinerary={itinerary}
                city={itinerary.city.name}
              />              
            </div>
          );
        }
      });
  } else {
    return props.itineraries.map((itinerary, index) => {
      return <Itinerary key={index} itinerary={itinerary} />;
    });
  }
};

export default ItinerariesList;