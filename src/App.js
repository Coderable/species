import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// assets
import logo from "./logo.svg";

// Components
import Home from "./components/Home.component";
import Detail from "./components/Detail.component";
import Search from "./components/Search.component";
import Species from "./components/Species.component";
import People from "./components/People.component";

// Global
import "./App.scss";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isNewUser: true,
      theme: "white",
      species: [],
    };
    this.onSetBackground = this.onSetBackground.bind(this);
  }

  onSetBackground(color) {
    localStorage.setItem("theme", color);
    this.setState({ isNewUser: false, theme: color });
    window.location.href = "/species";
  }

  componentDidMount() {
    var color = localStorage.getItem("theme");
    if (color) {
      this.setState({ isNewUser: false, theme: color });
    } else {
      this.setState({ isNewUser: true });
    }
  }

  render() {
    const { isNewUser, theme } = this.state;
    return (
      <Router>
        <div className={`App ${theme}`}>
          <div className="container">
            <header className="App-header">
              <a href="/">
                <img src={logo} className="main-logo" alt="Species" />
              </a>
            </header>
            {isNewUser ? (
              <div className="preview">
                <h2>Welcome to Species!</h2>
                <h6>Choose your side</h6>
                <button
                  onClick={() => this.onSetBackground("White")}
                  className="btn btn-light"
                >
                  Light
                </button>
                <button
                  onClick={() => this.onSetBackground("Dark")}
                  className="btn btn-dark"
                >
                  Dark
                </button>
              </div>
            ) : (
              ""
            )}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/species" component={Species} />
              <Route exact path="/search" component={Search} />
              <Route path="/species/:slug" component={Detail} />
              <Route path="/people/:slug" component={People} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
