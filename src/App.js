import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      list: true,
      card: false,
      players: [],
      player: {}
    };
  }
  componentDidMount() {
    fetch("http://localhost:3001/players/list")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ players: responseJson.data });
      });
  }
  showCard = id => {
    fetch(`http://localhost:3001/players/${id}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ player: responseJson.data });
      });
    this.setState({
      list: false,
      card: true
    });
  };

  showList = () => {
    this.setState({
      card: false,
      list: true
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.list ? (
          <div className="list-group">
            {this.state.players.map(player => (
              <li
                onClick={() => this.showCard(player._id)}
                className="list-group-item list-group-item-action"
              >
                {player.name}
              </li>
            ))}
          </div>
        ) : null}
        {this.state.card ? (
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">{this.state.player.name}</h5>
              <p class="card-text">{this.state.player.runs}</p>
              <div onClick={() => this.showList()} class="btn btn-primary">
                Back
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
