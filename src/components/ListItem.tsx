
import * as React from 'react';
import {Component} from 'react';
import {Task} from '../model/Task';
import CSSProperties = React.CSSProperties;

export interface ListItemProps {
    task: Task;
    onDelete: any;
    onMark: any;
}

export interface ListItemState {
    hover: boolean;
}

export default class ListItem extends Component<ListItemProps, ListItemState> {

    public constructor(props: ListItemProps, context: any) {
        super(props, context);
        this.state = {hover: false};
        this.handleMouseHover = this.handleMouseHover.bind(this);
    }

    private handleMouseHover(event: any): void {
        this.setState({hover: !this.state.hover});
    }

    render() {

        let style: CSSProperties = {
            color: this.state.hover ? 'red' : 'black'
        };

        return <li onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} style={style}>
            {this.props.task.name} <button onClick={() => this.props.onDelete(this.props.task.id)}>Delete</button>
        </li>;
    }

}