import React, { Component } from "react";
import "./GridList.css";
import moment from "moment";

import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

class GridList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      dataLimit: 8,
      startindex: 0,
      lastindex: 0,
      news: [],
      limitnews: [],
      error: "",
    };
  }

  componentDidMount() {
    this.setState({
      lastindex: this.state.dataLimit,
    });
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Something wrong while fetching posts!");
      })
      .then((response) => {
        console.log(response);
        this.setState(
          {
            news: response,
          },
          () => {
            this.setState({
              limitnews: this.state.news.slice(this.state.startindex, this.state.lastindex),
            });
          }
        );
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  pageHandler = (e) => {
    this.setState(
      {
        lastindex: 0,
        startindex: 0,
      },
      () => {
        this.setState(
          {
            lastindex: e * 8,
          },
          () => {
            this.setState(
              {
                startindex: this.state.lastindex - 8,
              },
              () => {
                console.log(this.state.startindex, this.state.lastindex);
                this.setState({
                  limitnews: this.state.news.slice(this.state.startindex, this.state.lastindex),
                });
              }
            );
          }
        );
      }
    );
  };

  nextPageHandler = () => {
    this.setState(
      {
        lastindex: this.state.lastindex + 8,
        startindex: this.state.startindex + 8,
      },
      () => {
        this.setState({
          limitnews: this.state.news.slice(this.state.startindex, this.state.lastindex),
        });
      }
    );
  };

  previousPageHandler = () => {
    this.setState(
      {
        lastindex: this.state.lastindex - 8,
        startindex: this.state.startindex - 8,
      },
      () => {
        this.setState({
          limitnews: this.state.news.slice(this.state.startindex, this.state.lastindex),
        });
      }
    );
  };

  deleteNewsHandler = (id) => {
    let arr = this.state.news;
    arr = arr.filter((item) => item.id !== id);
    this.setState(
      {
        news: arr,
      },
      () => {
        this.setState({
          limitnews: this.state.news.slice(this.state.startindex, this.state.lastindex),
        });
      }
    );
  };

  render() {
    return (
      <div className="grid-list-container">
        <div className="card-container">
          {this.state.limitnews.map((item) => {
            return (
              <div key={item.id} className="card" onClick={() => this.props.showModelHandler(true)}>
                <div className="card-details">
                  <div className="btn-container">
                    <div className="cancel-btn" onClick={(e) => e.stopPropagation(e)}>
                      <p onClick={() => this.deleteNewsHandler(item.id)}>X</p>
                    </div>
                  </div>
                  <div className="heading">{item.title.slice(0, 30)} </div>
                  <div className="news">{`${item.body.slice(0, 50)}  ...`}</div>
                  <div className="date">{moment(new Date()).format("llll")}</div>
                  <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <div className="btns">
            {this.state.startindex > 0 ? (
              <div className="left-icon" onClick={this.previousPageHandler}>
                <BiChevronsLeft className="icon" />
              </div>
            ) : null}
            <div className={`btn-1 ${this.state.startindex === 0 ? "active-btn" : null}`} onClick={() => this.pageHandler(1)}>
              1
            </div>
            <div className={`btn-1 ${this.state.startindex === 8 ? "active-btn" : null}`} onClick={() => this.pageHandler(2)}>
              2
            </div>
            <div className={`btn-1 ${this.state.startindex === 16 ? "active-btn" : null}`} onClick={() => this.pageHandler(3)}>
              3
            </div>
            {this.state.startindex < 16 ? (
              <div className="left-icon">
                <BiChevronsRight className="icon actve-icon" onClick={this.nextPageHandler} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default GridList;
