import { Component } from "react";

// lib
import Axios from "axios";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroller";

export default class Species extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      nextUrl: "",
      species: [],
    };
    this.loadMoreData = this.loadMoreData.bind(this);
  }

  componentDidMount() {
    this.loadSpecies();
  }

  loadSpecies() {
    this.setState({ isLoading: true });
    Axios.get("https://swapi.dev/api/species").then((res) => {
      this.setState({
        isLoading: false,
        species: res.data.results,
        nextUrl: res.data.next,
      });
    });
  }

  loadMoreData() {
    Axios.get(this.state.nextUrl).then((res) => {
      this.setState({
        species: [...this.state.species, ...res.data.results],
        nextUrl: res.data.next,
      });
    });
  }

  render() {
    const { isLoading, species } = this.state;
    return (
      <>
        <a
          href="/search"
          className="btn-cta"
          style={{
            margin: `0 auto 3rem auto`,
            display: `block`,
            width: `fit-content`,
          }}
        >
          Search species
        </a>
        {isLoading ? (
          [1, 2, 3, 4, 5, 6, 7].map((skeleton, index) => {
            return (
              <div className="species-card" key={index}>
                <Skeleton
                  count={1}
                  width={160}
                  height={30}
                  style={{ marginBottom: `1rem` }}
                />
                <Skeleton count={1} height={20} />
              </div>
            );
          })
        ) : (
          <InfiniteScroll
            initialLoad={false}
            loadMore={this.loadMoreData}
            hasMore={true}
            loader={
              this.state.nextUrl === null ? (
                ""
              ) : (
                <div className="species-card">
                  <Skeleton
                    count={1}
                    width={160}
                    height={30}
                    style={{ marginBottom: `1rem` }}
                  />
                  <Skeleton count={1} height={20} />
                </div>
              )
            }
          >
            <div>
              {species.map((sp, index) => {
                return (
                  <div key={index} className="species-card card">
                    <a href={`/species/${sp.url.split("species/").pop()}`}>
                      <div>
                        <h4>{sp.name}</h4>
                        <h6>{sp.classification}</h6>
                      </div>
                      <span>{sp.designation}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        )}
      </>
    );
  }
}
