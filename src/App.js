import React from "react";
import SearchDialog from "./search";
import RemoveAllDialog from "./removeAll";
import ListDialog from "./list";
import ReloadDialog from "./reload";
import { store } from "./reducer";

export default class MainDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleUsers = this.handleUsers.bind(this);

    this.state = {
      API: "https://pokeapi.co/api/v2/pokemon/",
      users: [],
      showSearch: true,
    };
  }

  componentDidMount() {
    store.subscribe(() => this.handleStore(store.getState()));
  }

  handleStore(stores) {
    //this.handleUsers(stores.usersReducer);
    if (stores.usersAPI) {
      this.handleUsers(stores.usersAPI);
      this.handleShowSearch(true);
    }
    if (stores.usersFilter) {
      this.handleUsers(stores.usersFilter);
      this.handleShowSearch(true);
    }
    if (stores.usersRemove) {
      this.handleUsers(stores.usersRemove);
      this.handleShowSearch(false);
    }
  }

  handleUsers(users) {
    this.setState({
      users: users,
    });
  }
  handleShowSearch(param) {
    this.setState({
      showSearch: param,
    });
  }

  render() {
    return (
      <div>
        <ReloadDialog />
        {this.state.showSearch ? (
          <div>
            <RemoveAllDialog />
            <SearchDialog api={this.state.API} />
            <ListDialog users={this.state.users} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
