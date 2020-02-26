import React, { Component } from 'react';

//import Comments from './Comments';
//import Heart from './Heart';
import SlickSlider from './SlickSlider';

// function HastagList(props) {
//   return itinerary.hashtags.map(hashtag => <Hashtag key={hashtag} hashtag={hashtag} />);
// }

function Hashtag(props) {
  const hashtag = `#${props.hashtags}`;
  return <p>{hashtag}</p>;
}

export class Itinerary extends Component {
  hastagList = () => {
    let { itinerary } = this.props;
    return itinerary.hashtags.map(hashtag => <Hashtag key={hashtag} hashtag={hashtag} />);
  }
 
  render() {    
    let { itinerary } = this.props;
    return ( 
      <li className="itinerary">
       <div className="row itinerary-content">
         <div className="col s3 profile">
           <div className="profile-image-container">
             <img
               src={itinerary.user.picture}
               alt={itinerary.user.userName}
               className="profile-picture"
             />
           </div>
           <h4>{itinerary.user.userName}</h4>
         </div>
         <div className="col s9 info">
           <h3 className="col s10">{itinerary.title}</h3>

           {/* <Heart itinerary={itinerary} /> */}

           <div className="col s4">
             <h4>Likes: {itinerary.rating}</h4>
           </div>
           <div className="col s4">
             <h4>Hours: {itinerary.duration}</h4>
           </div>
           <div className="col s4">
             <h4>
               Price: <span className="price">{itinerary.price}</span>
             </h4>
           </div>
           {this.hastagList}
           {/* <HastagList hashtags={itinerary.hashtags} /> */}
         </div>
       </div>
       <div className="collapsible-header">
         <i className="material-icons">expand_more</i>
         <div className="show-more">SHOW MORE</div>
       </div>
       <div className="collapsible-body">
          <h3>Find the best activities!</h3>
          <SlickSlider itinerary={itinerary} />
       </div>
     </li>
    )
  }
}