
import * as React from 'react';
import {Component} from 'react';

export interface ListItemProps {
    key: number;
    task: string;
    onDelete: any;
    onMark: any;
}

export default class ListItem extends Component<ListItemProps, {}> {

    render() {
        return <li key={this.props.key}>{this.props.task} <button onClick={() => this.props.onDelete(this.props.key)}>Delete</button></li>;
    }

}