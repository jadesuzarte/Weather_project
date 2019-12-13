import React from 'react';
import './App.css';
import axios from 'axios'
import { CityCard } from './CityCard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Homepage } from './Homepage';

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    citiesInfo:[],
    searchInput:'',
     image: ''
  }
}
// api weather url: https://samples.openweathermap.org/data/2.5/weather?q=London&appid=8532330ab1334c1ed18e9fa9480aa16c
// key : 8532330ab1334c1ed18e9fa9480aa16c

getWeather() {
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.searchInput}&appid=8532330ab1334c1ed18e9fa9480aa16c`)
  .then(res => {
    const citiesInfo = res.data;
    this.setState({citiesInfo})
  })
}
getImage() {
  console.log("Get image is being called!")
  axios.get(`https://source.unsplash.com/1600x900/?${this.state.searchInput}`)
.then(res => {
    const image = res.config.url;
    this.setState({image})
});
}


onChangeHandler = (event) => {
  event.preventDefault();
  this.setState({searchInput: event.target.value})
}
onClickHandler = () => {
  console.log(this.state.citiesInfo)
  this.getWeather();
  this.getImage();

 
 }
 componentDidMount() {
   this.getImage();
 }

render () {
  return (
   <Router>
     <Switch>
       <Route exact path="/">
       <div className="search_input">
       <img src='https://images.unsplash.com/photo-1516912481808-3406841bd33c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1283&q=80' alt='image by Jonathan Bowers'/>
        <input type="text" name="city" placeholder="search for city" onChange={this.onChangeHandler}/>
      <Link  type="submit" to="/result" onClick={this.onClickHandler}>Search</Link>
      </div> 
       </Route>
    
    <Route path="/result"
    render ={(props) => <CityCard {...props} citiesInfo={this.state.citiesInfo} image={this.state.image} />}
    />
    </Switch>
  </Router>
  )
  
}
  
}

export default App;
