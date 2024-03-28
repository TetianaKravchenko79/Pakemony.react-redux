import React from "react";
import { store } from "./reducer";

export default class SearchDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.makeFilter = this.makeFilter.bind(this);

    this.state = {
      search: "",
    };
  }

  componentDidMount() {
    store.subscribe(() => this.handleStore(store.getState()));
  }

  handleStore(store) {
    if (store.usersFilter) {
      this.setState({
        search: "",
      });
    }
    if (store.reloadReducer) {
      this.setState({
        search: "",
      });
    }
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  makeFilter(searchValue) {
    let usersFilter = JSON.parse(localStorage.users).filter(
      (user) => user.name.indexOf(this.state.search) !== -1
    );

    //store.dispatch({ type: 'CHANGE_STATE_USERS', usersList: usersFilter });
    store.dispatch({ type: "FILTER_STATE_USERS", usersFilter: usersFilter });
  }

  render() {
    return (
      <div>
        <div className="form">
          <a href={this.props.api}>
            <h5>{this.props.api}</h5>
          </a>{" "}
          <div className="form-group has-search">
            <span
              className="fa fa-search form-control-feedback"
              onClick={this.makeFilter}
            ></span>
            <input
              type="text"
              className="form-control search-value"
              placeholder="Search"
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
        </div>
      </div>
    );
  }
}
