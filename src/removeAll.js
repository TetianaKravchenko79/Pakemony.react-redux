import React from 'react';
import {store} from './reducer';

export default class RemoveAllDialog extends React.Component {

	constructor(props) {
	   super(props);
 
	   this.makeRemoveAll = this.makeRemoveAll.bind(this);

	   this.state = {
		  //...
	   };
	}

	makeRemoveAll() {
		localStorage.users = JSON.stringify([]);
		
		//store.dispatch({ type: 'CHANGE_STATE_USERS', usersList: [] });
		store.dispatch({ type: 'REMOVE_STATE_USERS', usersRemove: [] });		
	}
 
	render() {
	   return (
			<div className="p-2">
               <button className="btn btn-info" onClick={this.makeRemoveAll}>Remove All</button>
			</div>
	   );    	
	}
 
 }

