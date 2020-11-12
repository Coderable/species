import { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      theme: "white",
      isNewUser: true,
    };
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
    const { isNewUser } = this.state;
    return (
      <>
        {isNewUser ? (
          ""
        ) : (
          <a href="/species" className="btn-cta">
            View species
          </a>
        )}
      </>
    );
  }
}
