import React, { Component } from 'react';
import axios from 'axios';

// import components
import Record from './components/Record';
import RecordForm from './components/RecordForm';

class Records extends Component {
	constructor() {
		super();
		this.state = {
			records: [],
			error: null,
			isLoaded: false
		};
	}

	componentDidMount() {
		// get all records
		axios.get('https://5acdab9523cb4e00148b833d.mockapi.io/api/v1/records').then(({ data }) => {
			this.setState({
				records: data,
				error: null,
				isLoaded: true
			});
		}).catch(error => {
			this.setState({
				error,
				isLoaded: true
			})
		});
	}

	// update records
	handlerUpdateRecords(record) {
		this.setState({
			records: [
				...this.state.records,
				record
			]
		})
	}

	// delete update
	handlerDeleteUpdate(id) {
		let temp = this.state.records;
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === id) {
				temp.splice(i,1);
				break;
			}
		}

		this.setState({
			records: temp
		})
	}
	render() {
		const { records, error, isLoaded } = this.state;
		let tableComponent;

		if (error) {
			tableComponent = <div>Error:{error.message}</div>;
		} else if (!isLoaded) {
			tableComponent = <div>Loading...</div>;
		} else {
			tableComponent = (
				<table className="table table-bordered">
					<thead>
						<tr>
							<td>Date</td>
							<td>Describe</td>
							<td>Amount</td>
							<td>Actions</td>
						</tr>
					</thead>
					<tbody>
						{records.map((record) => <Record key={record.id} DeleteUpdate={this.handlerDeleteUpdate.bind(this)} record={record} />)}
					</tbody>
				</table>
			);
		}

		return (
			<div className="react-account-app">
				<h2>Records</h2>
				<RecordForm UpdateRecords={this.handlerUpdateRecords.bind(this)} />
				{tableComponent}
			</div>
		)

	}
}

export default Records;
