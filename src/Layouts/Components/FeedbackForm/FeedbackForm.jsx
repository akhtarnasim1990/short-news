import React, { Component } from "react";
import "./FeedbackForm.css";

import { BsSearch } from "react-icons/bs";
import countaries from "../../../data/countries.json";
import firebase from "firebase";
import { toast } from "react-toastify";
import validator from "validator";

class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      showList: false,
      country: "",
      fname: "",
      lname: "",
      address: "",
      email: "",
      phone: "",
      countryCode: "",
    };
  }

  componentDidMount() {}

  showListHandler = (e) => {
    this.setState({
      showList: e,
    });
  };

  countarySelectHandler = (e) => {
    console.log(e);

    this.setState(
      {
        country: e,
      },
      () => {
        this.showListHandler(false);
      }
    );
  };

  countryInputHandler = (e) => {
    this.setState(
      {
        country: e.target.value,
      },
      () => {
        if (this.state.country.length === 0) {
          return this.showListHandler(false);
        } else if (this.state.country.length > 0) {
          return this.showListHandler(true);
        }
      }
    );
  };

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    if (this.state.fname === "") {
      toast.warn("Please enter first name.");
    } else if (this.state.lname === "") {
      toast.warn("Please enter last name.");
    } else if (this.state.lname === "") {
      toast.warn("Please enter last name.");
    } else if (this.state.address === "") {
      toast.warn("Please enter valid address.");
    } else if (this.state.country === "") {
      toast.warn("Please enter valid country name.");
    } else if (this.state.email === "") {
      toast.warn("Please enter email address.");
    } else if (!validator.isEmail(this.state.email)) {
      toast.warn("Please enter valid email.");
    } else if (!validator.isMobilePhone(this.state.phone)) {
      toast.warn("Please enter valid mobile number.");
    } else if (this.state.countryCode === "") {
      toast.warn("Please enter valid countryCode.");
    } else {
      firebase
        .firestore()
        .collection("feedback")
        .add({
          fname: this.state.fname,
          lname: this.state.lname,
          address: this.state.address,
          email: this.state.email,
          country: this.state.country,
          phone: this.state.phone,
          countryCode: this.state.countryCode,
        })
        .then((response) => {
          console.log(response);
          toast.success("Thanks for your feedback!");
          this.props.showFeedbacFormHandler();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  render() {
    return (
      <div className="form-container" onClick={() => this.setState({ showList: false })}>
        <div className="form-body">
          <div className="heading">
            <p>Thank you so much for taking the time!</p>
            <p>Please provide the below details!</p>
          </div>
          <div className="row">
            <div className="label">
              <p>First Name:</p>
            </div>
            <div className="input">
              <input type="text" placeholder="Enter first name!" name="fname" value={this.state.fname} onChange={this.inputHandler} />
            </div>
          </div>
          <div className="row">
            <div className="label">
              <p>Last Name:</p>
            </div>
            <div className="input">
              <input type="text" placeholder="Enter last name!" name="lname" value={this.state.lname} onChange={this.inputHandler} />
            </div>
          </div>
          <div className="row">
            <div className="label">
              <p>Address:</p>
            </div>
            <div className="input address">
              <textarea type="text" placeholder="Enter  your address!" name="address" value={this.state.address} onChange={this.inputHandler} />
            </div>
          </div>
          <div className="row row-countary">
            <div className="label">
              <p>Countary:</p>
            </div>
            <div className="input countary">
              <input
                type="text"
                placeholder="Enter your name!"
                value={this.state.country}
                onChange={this.countryInputHandler}
                name="country"
                value={this.state.country}
              />
              <BsSearch className="search-icon" />
            </div>
            {this.state.showList ? (
              <div className="countaries">
                {countaries
                  .filter((val) => {
                    if (this.state.country === "") {
                      return val;
                    } else if (val.name.toLowerCase().includes(this.state.country.toLowerCase())) {
                      return val;
                    }
                  })
                  .map((country) => {
                    return (
                      <div
                        ref={this.wrapperRef}
                        key={country.code}
                        className="countary-name"
                        onClick={() => this.countarySelectHandler(country.name)}
                      >
                        {country.name}
                      </div>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className="row">
            <div className="label">
              <p>Email ID:</p>
            </div>
            <div className="input">
              <input type="text" placeholder="Enter your email adddress!" name="email" value={this.state.email} onChange={this.inputHandler} />
            </div>
          </div>
          <div className="row">
            <div className="label">
              <p>Phone Number:</p>
            </div>
            <div className="phone-input">
              <div className="input">
                <input type="number" placeholder="+91" name="countryCode" value={this.state.countryCode} onChange={this.inputHandler} />
              </div>
              <div className="input">
                <input type="number" placeholder="123456789" name="phone" value={this.state.phone} onChange={this.inputHandler} />
              </div>
            </div>
          </div>
          <div className="submit-btn" onClick={this.submitHandler}>
            <p>Submit Feedbck</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackForm;
