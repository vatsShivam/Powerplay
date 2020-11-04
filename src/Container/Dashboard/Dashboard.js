import React, { Component } from "react";
import "./Dashboard.css";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {
 
  Button,
 
  Input,
 
} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect, Link } from "react-router-dom";

class Dashboard extends Component {
  state = {
    data: "",
    loading: false,
    redirect: false,
    page: 1,
    isnextDisable: false,
    ispreviosDisable: true,
    pazeSize: 6,
  };
  handleNext = (event) => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
    setTimeout(this.callApiNext, 500);
    event.preventDefault();
  };
  handlePrev = (event) => {
    if (this.state.page >= 2) {
      this.setState((prevState) => ({ page: prevState.page - 1 }));

      setTimeout(this.callApiPrev, 500);
    }
    event.preventDefault();
  };
  callApiNext = () => {
    axios
      .get(
        `https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=${this.state.pazeSize}`
      )
      .then((resp) => {
        console.log(resp);
        if (resp !== undefined) {
          if (resp.data.length === 0) {
            this.setState({ isnextDisable: true });
          } else {
            this.setState({
              data: resp.data,
              loading: false,
              ispreviosDisable: false,
            });
          }
        }
      });
  };
  callApiPrev = () => {
    if (this.state.page == 1) {
      this.setState({ ispreviosDisable: true });
    }
    axios
      .get(
        `https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=${this.state.pazeSize}`
      )
      .then((resp) => {
        console.log(resp);
        if (resp !== undefined) {
          if (resp.data.length === 0) {
            this.setState({ isnextDisable: true });
          } else {
            this.setState({
              data: resp.data,
              loading: false,
              isnextDisable: false,
            });
          }
        }
      });
  };
  callApi = () => {
    axios
      .get(
        `https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=${this.state.pazeSize}`
      )
      .then((resp) => {
        if (resp !== undefined) {
          this.setState({ data: resp.data, loading: false });
        }
      });
  };
  handleChange = (e) => {
    console.log(e)
    this.setState({
      [e.target.name]: parseInt(e.target.value),
      page: 1,
      ispreviosDisable: true,
    });
    setTimeout(this.callApi, 500);
  };
  componentDidMount() {
    this.setState({ loading: true });

    axios
      .get(`/beers?page=${this.state.page}&per_page=${this.state.pazeSize}`)
      .then((resp) => {
        if (resp !== undefined) {
          this.setState({ data: resp.data, loading: false });
        }
      });
  }

  renderBeersData() {
    const Beers = this.state.data;
    if (Beers.length > 0) {
      return Beers.map((user) => {
        const { name, tagline, image_url, id } = user;
        //Destructing //

        return (
          <div
            className="col-sm-4"
            style={{ paddingLeft: "40px", paddingTop: "30px" }}
          >
            {" "}
            <Link to={"/beer/" + id}>
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
            </Link>
          </div>
        );
      });
    }
  }

  render() {
    let  beer = (
      <div>
        <div
          style={{
            backgroundColor: "#DCDCDC",
            minHeight: "1000px",
            marginLeft: "-15px",
          }}
        >
          
          <h3
            style={{
              textAlign: "center",
              paddingTop: "30px",
           
            }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "30px" }}>
              Beer Application
            </strong>
          </h3>
          
         <Link to="/Feed">
          <h2
            style={{
              textAlign: "center",
            
              paddingBottom: "30px",
            }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "20px" }}>
             Go to Feed
            </strong>
          </h2>
          </Link>
        
        
          <div class="row col-sm-12 "
          >
            <div class="col-sm-4 offset-sm-4">
              <label>Page Size</label>
              <select
                onChange={this.handleChange}
                name="pazeSize"
                className="form-control  "
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="18">18</option>
                <option value="24">24</option>
                <option value="30">30</option>
                <option value="36">36</option>
              </select>
            </div>
           
          </div>

          <div className="row col-sm-12">{this.renderBeersData()}</div>
          <div className="pager d-flex justify-content-center py-5">
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.handlePrev}
              disabled={this.state.ispreviosDisable}
            >
              PREV
            </button>

            <button
              type="button"
              class="btn btn-primary"
              onClick={this.handleNext}
              disabled={this.state.isnextDisable}
              style={{ marginLeft: "20px" }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );

    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.loading) {
      beer = <Spinner />;
    }

    return beer;
  }
}

export default withErrorHandler(Dashboard, axios);
