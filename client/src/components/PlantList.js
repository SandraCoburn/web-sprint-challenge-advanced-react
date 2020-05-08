import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super();
    this.state = {
      plants: [],
      query: "",
    };
  }
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    axios
      .get("http://localhost:3333/plants")
      .then((res) => {
        console.log("this is the res", res.data);
        this.setState({ plants: res.data.plantsData });
      })
      .catch((err) => console.log("this error", err));
  }
  //Stretch goal to add a search form
  handleChanges = (e) => {
    this.setState({ query: e.target.value });
    this.filterPlants(e.target.value);
  };
  filterPlants = (query) => {
    const results = this.state.plants.filter((plant) =>
      plant.name
        .toLowerCase()
        .includes(
          query.toLowerCase() ||
            plant.scientificName
              .toLowerCase()
              .includes(this.query.toLowerCase()) ||
            plant.description.toLowerCase().includes(this.query.toLowerCase())
        )
    );
    this.setState({ plants: results });
  };

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <>
        <div className="search">
          <form>
            <input
              id="name"
              onChange={this.handleChanges}
              value={this.state.query}
              placeholder="Search..."
              type="text"
              name="textfield"
            />
          </form>
        </div>
        <main className="plant-list">
          {this.state?.plants &&
            this.state.plants.map((plant, index) => (
              <div className="plant-card" key={index}>
                <img className="plant-image" src={plant.img} alt={plant.name} />
                <div className="plant-details">
                  <h2 className="plant-name">{plant.name}</h2>
                  <p className="plant-scientific-name">
                    {plant.scientificName}
                  </p>
                  <p>{plant.description}</p>
                  <div className="plant-bottom-row">
                    <p>${plant.price}</p>
                    <p>☀️ {plant.light}</p>
                    <p>💦 {plant.watering}x/month</p>
                  </div>
                  <button
                    className="plant-button"
                    onClick={() => this.props.addToCart(plant)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
        </main>
      </>
    );
  }
}
