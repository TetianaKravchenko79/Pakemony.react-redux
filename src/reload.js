import React from "react";
import { store } from "./reducer";

export default class ReloadDialog extends React.Component {
  constructor(props) {
    super(props);

    this.makeReload = this.makeReload.bind(this);

    this.state = {
      //...
    };
  }

  makeReload() {
    localStorage.users = JSON.stringify([]);

    store.dispatch({
      type: "RELOAD_STATE_USERS",
      reload: true,
    });
  }

  render() {
    return (
      <div className="p-2">
        <button className="btn btn-danger" onClick={this.makeReload}>
          Reload API
        </button>
      </div>
    );
  }
}
