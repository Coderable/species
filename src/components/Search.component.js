import { Component } from "react";

// lib
import Axios from "axios";
import Skeleton from "react-loading-skeleton";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      data: [],
      keyword: "",
    };
    this.onChangeKeyword = this.onChangeKeyword.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChangeKeyword(e) {
    this.setState({ keyword: e.target.value }, this.onSearch(e.target.value));
  }

  onSearch(key) {
    this.setState({ isLoading: true });
    Axios.get(`https://swapi.dev/api/people/?search=${key}`).then((res) => {
      this.setState({
        isLoading: false,
        data: res.data.results,
      });
    });
  }

  componentDidMount() {}

  render() {
    const { isLoading, data } = this.state;
    return (
      <>
        <input
          name="search"
          placeholder="Find here..."
          className="main-search"
          value={this.state.keyword}
          onChange={this.onChangeKeyword}
        />
        {isLoading ? (
          <div className="species-card">
            <Skeleton
              count={1}
              width={160}
              height={30}
              style={{ marginBottom: `1rem` }}
            />
            <Skeleton count={1} height={20} />
          </div>
        ) : (
          data.map((sp, index) => {
            return (
              <div key={index} className="species-card card">
                <a href={`/people/${sp.url.split("people/").pop()}`}>
                  <div>
                    <h4>{sp.name}</h4>
                    <h6>{sp.eye_color}</h6>
                  </div>
                </a>
              </div>
            );
          })
        )}
      </>
    );
  }
}
