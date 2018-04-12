import React, { Component } from 'react';
import axios from 'axios';

export default class Record extends Component {
	constructor() {
		super();
		this.state = {
			isEdit: false
		}
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
	handlerModified() {
		this.setState({
			isEdit: !this.state.isEdit
		})
	}

	// cancel modify
	handlerCancel() {
		this.setState({ isEdit: false })
	}

	// update modify
	handlerUpdate() {
		let data = {
			date: this.refs.date.value,
			describe: this.refs.describe.value,
			amount: Number(this.refs.amount.value)
		}
		axios.put(`https://5acdab9523cb4e00148b833d.mockapi.io/api/v1/records/${this.props.record.id}`, data).then(res => {
			console.log(res);
			this.handlerCancel();
			this.props.UpdateOneRecord(this.props.record.id, res.data);
		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		if (!this.state.isEdit) {
			return (
				<tr>
					<td>{this.props.record.date}</td>
					<td>{this.props.record.describe}</td>
					<td>{this.props.record.amount}</td>
					<td>
						<button type="button" onClick={this.handlerModified.bind(this)} className="btn btn-info mr-2">Edit</button>
						<button type="button" onClick={this.handlerDelete.bind(this)} className="btn btn-danger">Delete</button>
					</td>
				</tr>
			);
		} else {
			return (
				<tr>
					<td><input className="form-control" defaultValue={this.props.record.date} ref="date" /></td>
					<td><input className="form-control" defaultValue={this.props.record.describe} ref="describe" /></td>
					<td><input type="number" className="form-control" defaultValue={this.props.record.amount} ref="amount" /></td>
					<td>
						<button type="button" onClick={this.handlerCancel.bind(this)} className="btn btn-info mr-2">Cancel</button>
						<button type="button" onClick={this.handlerUpdate.bind(this)} className="btn btn-danger">Update</button>
					</td>
				</tr>
			)
		}

	}
}

