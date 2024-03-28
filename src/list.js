import React from "react";
import { store } from "./reducer";

export default class ListDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleUsers = this.handleUsers.bind(this);
    this.getAPI = this.getAPI.bind(this);

    this.state = {
      API: "https://pokeapi.co/api/v2/pokemon/",
      lastRemoved: "",
    };
  }

  componentDidMount() {
    this.getAPI();
    store.subscribe(() => this.handleStore(store.getState()));
  }
  handleStore(store) {
    if (store.reloadReducer) {
      this.getAPI();

      this.setState({
        lastRemoved: "",
      });
    }
    if (store.usersRemove) {
      this.setState({
        lastRemoved: "",
      });
    }
  }

  getAPI() {
    let self = this;

    if (!localStorage.users || !JSON.parse(localStorage.users).length) {
      fetch(this.state.API)
        .then((responce) => {
          return responce.json();
        })
        .then((data) => {
          let users = data.results;

          users.map(function (user, index) {
            user.indexOriginal = index;
          });

          console.log(users);

          localStorage.users = JSON.stringify(users);

          self.handleUsers(users);
        });
    } else {
      this.handleUsers(JSON.parse(localStorage.users));
    }
  }

  makeRemove(index) {
    console.log(index);
    let app = this;

    let users = JSON.parse(localStorage.users);

    let lastRemoved = users.splice(index, 1);

    users.map(function (user, index) {
      user.indexOriginal = index;
    });

    localStorage.users = JSON.stringify(users);

    this.handleUsers(users);
    console.log(lastRemoved[0].name);

    if (!localStorage.users || !JSON.parse(localStorage.users).length) {
      this.setState({
        lastRemoved: "",
      });
    } else {
      this.setState({
        lastRemoved: lastRemoved[0].name,
      });
    }
  }

  handleUsers(users) {
    //store.dispatch({ type: 'CHANGE_STATE_USERS', usersList: users });
    store.dispatch({ type: "API_STATE_USERS", usersAPI: users });
  }

  render() {
    return (
      <div>
        <div>
          <h4>
            lastRemoved:{" "}
            <span className="text-danger">{this.state.lastRemoved}</span>
          </h4>
          <span>--------------------------------------------------------</span>
        </div>
        <div className="row">
          <div className="col font-weight-bold">Name</div>
          <div className="col font-weight-bold">Url</div>
          <div className="col">Remove</div>
        </div>
        <div className="users">
          {this.props.users.map((item, key) => (
            <div className="row" key={key}>
              <div className="col">{item.name}</div>
              <div className="col">
                <a href={item.url}>{item.url}</a>
              </div>
              <div className="col">
                <button
                  className="btn btn-link"
                  onClick={() => {
                    this.makeRemove(item.indexOriginal);
                  }}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
