import React, { Component } from 'react';

export default class RecordTop extends Component {

    

    render() {
        return (
            <div className="clearfix">
                <button className="btn btn-primary pull-left">Total：{this.props.price.Total}</button>
                <button className="btn btn-info pull-right">Out：{this.props.price.Out}</button>
                <button className="btn btn-success pull-right  mr-2">In：{this.props.price.In}</button>
            </div>
        )
    }
}

