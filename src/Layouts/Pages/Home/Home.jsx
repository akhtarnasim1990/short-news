import React, { Component } from "react";
import "./Home.css";

import { BsListUl } from "react-icons/bs";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import List from "../../Components/List/List";
import GridList from "../../Components/GridList/GridList";
import FeedbackForm from "../../Components/FeedbackForm/FeedbackForm";
import Model from "../../Components/Model/Model";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      showFeedbacForm: false,
      showModel: false,
    };
  }

  listToggleHandler = (e) => {
    this.setState({
      showList: e,
    });
  };

  showFeedbacFormHandler = (e) => {
    this.setState({
      showFeedbacForm: !this.state.showFeedbacForm,
    });
  };

  showModelHandler = (e) => {
    this.setState({
      showModel: e,
    });
  };

  render() {
    return (
      <div className="home-container">
        <div className={this.state.showFeedbacForm ? "left active-form" : "left"}>
          <div className="left-container">
            <div className="user">
              <div className="img">
                <img
                  src="https://media.istockphoto.com/photos/portrait-of-smiling-mixed-race-woman-looking-at-camera-picture-id1319763830?b=1&k=20&m=1319763830&s=170667a&w=0&h=wE44n9yP1nrefeqv5DCl5mE3ouU01FNNHeZPR0yDCWA= "
                  alt=""
                />
              </div>
              <div className="info">
                <div className="greeting">
                  <p>Hi Reader,</p>
                </div>
                <div className="news-info">
                  <p>Here's your News!</p>
                </div>
              </div>
            </div>
            {!this.state.showFeedbacForm ? (
              <div className="toggle user">
                <div className="title">
                  <p>View Toggle</p>
                </div>
                <div className="btns">
                  <div className={this.state.showList ? "list-icon active-left" : "list-icon"} onClick={() => this.listToggleHandler(true)}>
                    <MdOutlineFeaturedPlayList className="list" />
                  </div>
                  <div className={!this.state.showList ? "list-icon active-right" : "list-icon"} onClick={() => this.listToggleHandler(false)}>
                    <BsListUl className="list " />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="feedback">
              <div className="title">
                <p>Have a Feedback?</p>
              </div>
              <div
                className={this.state.showFeedbacForm ? "feedback-btn active-fb-btn" : "feedback-btn"}
                onClick={() => this.showFeedbacFormHandler(true)}
              >
                <p>We're Listening!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-container">
            {this.state.showList ? <GridList showModelHandler={this.showModelHandler} /> : <List showModelHandler={this.showModelHandler} />}
          </div>
          {this.state.showFeedbacForm ? <FeedbackForm showFeedbacFormHandler={this.showFeedbacFormHandler} /> : null}
        </div>
        {this.state.showModel ? <Model src="https://www.ndtv.com/" showModelHandler={this.showModelHandler} /> : null}
      </div>
    );
  }
}

export default Home;
