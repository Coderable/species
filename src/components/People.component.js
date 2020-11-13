import { Component } from "react";

// lib
import Axios from "axios";
import Skeleton from "react-loading-skeleton";

export default class People extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: "",
    };
  }

  componentDidMount() {
    // alert(this.props.match.params.slug);
    Axios.get(
      `https://swapi.dev/api/people/${this.props.match.params.slug}`
    ).then((res) => {
      this.setState({
        isLoading: false,
        data: res.data,
      });
    });
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <div className="species-detail-card card">
        {isLoading ? (
          <>
            <Skeleton
              width={240}
              height={30}
              style={{ marginBottom: `1.5rem` }}
            />
            <div>
              <Skeleton
                width={90}
                height={20}
                style={{ marginBottom: `0.5rem` }}
              />
            </div>
            <Skeleton
              width={150}
              height={16}
              style={{ marginBottom: `1rem` }}
            />
            <div>
              <Skeleton
                width={90}
                height={20}
                style={{ marginBottom: `0.5rem` }}
              />
            </div>
            <Skeleton
              width={150}
              height={16}
              style={{ marginBottom: `1rem` }}
            />
            <div>
              <Skeleton
                width={90}
                height={20}
                style={{ marginBottom: `0.5rem` }}
              />
            </div>
            <Skeleton
              width={150}
              height={16}
              style={{ marginBottom: `1rem` }}
            />
            <div>
              <Skeleton
                width={90}
                height={20}
                style={{ marginBottom: `0.5rem` }}
              />
            </div>
            <Skeleton
              width={150}
              height={16}
              style={{ marginBottom: `1rem` }}
            />
          </>
        ) : (
          <div>
            <h2>{data.name}</h2>
            <div className="card-info">
              <label>Gender</label>
              <p>{data.gender}</p>
            </div>
            <div className="card-info">
              <label>Height</label>
              <p>{data.height}</p>
            </div>
            <div className="card-info">
              <label>Mass</label>
              <p>{data.mass}</p>
            </div>
            <div className="card-info">
              <label>Skin Color</label>
              <p>{data.skin_color}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
