import React, { Component } from 'react';
import Records from '../Records';
import axios from 'axios';

export default class Record extends Component {
	constructor(props) {
		super(props);
	}

	// delete
	handlerDelete() {
		axios.delete(`https://5acdab9523cb4e00148b833d.mockapi.io/api/v1/records/${this.props.record.id}`).then(res => {
			console.log(`Delete ${this.props.record.id} successed!`);
			this.props.DeleteUpdate(this.props.record.id)
		}).catch(err => {
			console.log(err);
		});
	}

	// modify
	handlerModified(){

	}

	render() {
		return (
			<tr>
				<td>{this.props.record.date}</td>
				<td>{this.props.record.describe}</td>
				<td>{this.props.record.amount}</td>
				<td>
					<button type="button" onClick={this.handlerModified.bind(this)}className="btn btn-info">Edit</button>
					<button type="button" onClick={this.handlerDelete.bind(this)} className="btn btn-danger">Delete</button>
				</td>
			</tr>
		);
	}
}

