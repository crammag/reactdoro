
import * as React from 'react';
import {Component} from 'react';
import {Task} from '../model/Task';

export interface ListItemProps {
    task: Task;
    onDelete: any;
    onMark: any;
}

export default class ListItem extends Component<ListItemProps, {}> {

    render() {
        return <li>{this.props.task.name} <button onClick={() => this.props.onDelete(this.props.task.id)}>Delete</button></li>;
    }

}