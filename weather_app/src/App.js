import React from "react";
import "./App.css";
import axios from "axios";
import { CityCard } from "./CityCard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { Homepage } from "./Homepage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesInfo: [],
      searchInput: "",
      image: ""
    };
  }
  // api weather url: https://samples.openweathermap.org/data/2.5/weather?q=London&appid=8532330ab1334c1ed18e9fa9480aa16c
  // key : 8532330ab1334c1ed18e9fa9480aa16c

  getWeather() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.searchInput}&appid=8532330ab1334c1ed18e9fa9480aa16c`
      )
      .then(res => {
        const citiesInfo = res.data;
        this.setState({ citiesInfo });
      });
  }

  getImage() {
    console.log("Get image is being called!");
    axios
      .get(`https://source.unsplash.com/1600x900/?${this.state.searchInput}`)
      .then(res => {
        // Here if you fetched and console.logged the response, the response.url would give you the url of the actual image that was returned from the fetch.
        // console.log(res.request.responseURL);
        this.setState({
          image: res.request.responseURL
        });
      });
  }

  onChangeHandler = event => {
    event.preventDefault();
    this.setState({ searchInput: event.target.value });
  };

  // I would have put this in the component that renders the image and would have added getImage in component did Mount inside the component that needs to render the city image from the start - once you already know what that city is.
  onClickHandler = () => {
    console.log(this.state.citiesInfo);
    this.getWeather();
    this.getImage();
  };

  //  There is no need to fetch anything on component did mount because to fetch you need to know the city the user is inputting. There is no need to render before knowing which city you are fetching for.
  // componentDidMount() {
  //   this.getImage();
  // }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {/* It would be better if you just rendered components here. So the form could have gone in a stateless component */}
            <div className="search_input">
              <img
                src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1283&q=80"
                alt="image by Jonathan Bowers"
              />
              {/* Input should always be inside a form  */}
              {/* This way the form has an on submit and the user can press enter and trigger the event instead of having to click the button */}
              {/* Ideally you would have an onSubmit on the form that would then useHistory to push to the new route.*/}
              <input
                type="text"
                name="city"
                placeholder="search for city"
                onChange={this.onChangeHandler}
              />
              <Link type="submit" to="/result" onClick={this.onClickHandler}>
                Search
              </Link>
            </div>
          </Route>

          <Route
            path="/result"
            render={props => (
              <CityCard
                {...props}
                citiesInfo={this.state.citiesInfo}
                image={this.state.image}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
