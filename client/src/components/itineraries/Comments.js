import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import {
  postComment,
  deleteComment, 
  fetchAllComments
} from "../../store/actions/commentActions";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

//finds the comments for each itinerary
const findComments = (itinerary, comments) => {
  return comments.filter(
    comment => (comment.itinerary._id || comment.itinerary) === itinerary._id
  );
};

class Comments extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef(); //reference to input DOM
    this.onClickHandler = this.onClickHandler.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      inputValue: "", //comment from user
      comments: [] //dig data from commentModel to render/post/delete comment
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    postComment: PropTypes.func,
    deleteComment: PropTypes.func,
    fetchAllComments: PropTypes.func
  }

  componentDidMount() {    
    this.props.fetchAllComments();   
  }

  //componentWillReceiveProps is deprecated
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.comments.payload !== this.props.comments.payload) {
      let comments = Array.from(nextProps.comments.payload);
      function compare(a, b) {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      }
      comments.sort(compare);
      //call the function that gets the comments for that specific Itinerary
      comments = findComments(nextProps.itinerary, comments);
      this.setState({
        comments: comments
      });
    } else if (
      nextProps.comments.toast === true &&
      !document.querySelector(".toast")
    ) {
      var toastHTML = `<span>Message sent</span>`;
      M.toast({ html: toastHTML, classes: "rounded" });
    }
  }

  onClickHandler() { //post comment
    if (this.state.inputValue !== "") {
      let itinerary = this.props.itinerary; //=comments.itinerary
      let commentBody = {
        user: {
          name: this.props.auth.user.name,
          photo: this.props.auth.image
        },
        itineraryId: itinerary._id,
        message: this.state.inputValue,
        date: Date.now(),
        city: itinerary.city._id
      };
      //calls the action that posts a comment
      console.log('postcomment:', commentBody)
      this.props.postComment(commentBody);
      this.setState({
        inputValue: ""
      });
    }
  }

  handleKeyUp = event => {
    if (event.key === "Enter") {
      this.onClickHandler();
    }
  };

  updateInputValue() {
    this.setState({
      inputValue: this.textInput.current.value //get value from input DOM
    });
  }

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }

  deletePost(e) {
    e.persist();
    let confirmDelete = window.confirm(
      "are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      //calls the action that deletes a comment
      this.props.deleteComment(e.target.id);
    }
  }

  render() {
    let comments = this.state.comments;
    const username = this.props.auth.user.name;
    return (
      <>
        {this.props.auth.isAuthenticated || username == null ? (
          <div className="row comments-section">
            <h3>Comments</h3>
            <div className="col s8 offset-s1">
              <input //catch comment from user
                value={this.state.inputValue} 
                ref={this.textInput} //refer to textInput by React.Ref()
                onChange={this.updateInputValue}
                className="comment-input"
                type="text"
                placeholder="write here"
                onKeyUp={this.handleKeyUp}
              />
            </div>
            <button onClick={this.onClickHandler} className="btn">
              <i className="material-icons">send</i>
            </button>
            {comments.map((comment, index) => {
              let date = this.formatDate(new Date(comment.date));
              return (
                <div className="col s12 comment" key={index}>
                  <img
                    className="comment-image"
                    src={
                      comment.user.photo ||
                      "https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg"
                    }
                    alt="profile"
                  />
                  <div className="comment-box">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user.name}</span>
                      {username === comment.user.name && (
                        <div
                          className="close"
                          onClick={this.deletePost.bind(this)}
                        >
                          <i id={comment._id} className="material-icons close">
                            close
                          </i>
                        </div>
                      )}
                    </div>
                    <p className="comment-message">{comment.message}</p>
                    <small className="comment-time">{date}</small>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h3 className="alert comments-section">
            You must <NavLink to="/">LOG IN</NavLink> to see the comments
            section.
          </h3>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps,
  { postComment, deleteComment, fetchAllComments }
)(Comments);
