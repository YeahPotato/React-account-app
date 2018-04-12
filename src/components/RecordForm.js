import React, { Component } from 'react';
import axios from 'axios';

export default class RecordForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            describe: "",
            amount: 0,
        }
    }

    handlerChange(event) {
        let obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    // add record
    handlerSubmit(event) {
        this.setState({amount:+this.state.amount});
        axios.post('https://5acdab9523cb4e00148b833d.mockapi.io/api/v1/records', this.state).then(res => {
            // update records
            this.props.UpdateRecords(res.data);
            // reset create record form
            this.setState({
                date: "",
                describe: "",
                amount: "",
            })
        }).catch(err => {
            console.log(err);
        });
        
        event.preventDefault();
    }

    computedDisableStatus() {
        return this.state.date.length && this.state.describe.length && this.state.amount.length;
    }

    render() {

        const { date, describe, amount } = this.state;

        return (
            <form className="form-inline mb-4 mt-4" onSubmit={this.handlerSubmit.bind(this)}>
                <div className="form-group">
                    <input className="form-control" onChange={this.handlerChange.bind(this)} type="text" value={date} placeholder="Date" name="date" />
                </div>
                <div className="form-group ml-2">
                    <input className="form-control" onChange={this.handlerChange.bind(this)} type="text" value={describe} placeholder="Describe" name="describe" />
                </div>
                <div className="form-group ml-2">
                    <input className="form-control" onChange={this.handlerChange.bind(this)} type="number" value={amount} placeholder="Amount" name="amount" />
                </div>
                <button className="btn btn-primary" disabled={!this.computedDisableStatus()} type="submit">Create Record</button>
            </form>
        );
    }
}

