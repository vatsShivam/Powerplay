import React, { Component } from "react";

import axios from "../../axios";
import { Redirect, Link } from "react-router-dom";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import "./Feed.css";
import Spinner from "../../components/UI/Spinner/Spinner";
class Feed extends Component {
  state = {
    data: [],
    id: "",
    loading: false,
  };

  componentWillMount() {
    this.setState({ loading: true });
    this.callApi();
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.callApi(), 5000);
  }

  callApi() {
    axios.get("/beers/random").then((resp) => {
      if (resp !== undefined) {
        this.setState({ data: resp.data, loading: false });
      }
    });
  }

  feedData() {
    const repos = this.state.data;
    if (repos.length > 0) {
      return repos.map((user) => {
        const { name, tagline, image_url } = user;

        return (
          <div
            className="col-sm-12"
            style={{ paddingLeft: "40px", paddingTop: "30px" }}
          >
            <div className="card" style={{ minHeight: "300px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
                <img
                  src={image_url}
                  alt="Avatar"
                  style={{
                    width: "150px",
                    borderRadius: "50%",
                    height: "200px",
                  }}
                />
              </div>
              <p style={{ paddingTop: "20px", textAlign: "center" }}>
                {" "}
                Name: {name}
              </p>
              <p style={{ paddingTop: "10px", textAlign: "center" }}>
                {" "}
                Tagline : {tagline}
              </p>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    let feed = (
      <div>
        <div
          style={{
            backgroundColor: "#DCDCDC",
            minHeight: "1000px",
            marginLeft: "-20px",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              paddingTop: "30px",
              
            }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "30px" }}>
              Feed
            </strong>
          </h3>
          <Link to="/">
          <h2
            style={{
              textAlign: "center",
            
              paddingBottom: "30px",
            }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "20px" }}>
             Go to DashBoard
            </strong>
          </h2>
          </Link>

          <div className="row col-sm-12">{this.feedData()}</div>
        </div>
      </div>
    );

    if (this.state.loading) {
      feed = <Spinner />;
    }

    return feed;
  }
}

export default withErrorHandler(Feed, axios);
