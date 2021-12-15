import React, { Component } from "react";
import "./Model.css";

class Model extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="model-container" onClick={() => this.props.showModelHandler(false)}>
        <div className="body">
          <p>
            <iframe className="iframe" src={this.props.src}></iframe>
          </p>
        </div>
      </div>
    );
  }
}

export default Model;
