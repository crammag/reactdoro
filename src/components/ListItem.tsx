
import * as React from 'react';
import {Component, CSSProperties} from 'react';
import Task from '../model/Task';

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

        this.setState({hover: event.type === "mouseenter"});

    }

    render() {

        let style: CSSProperties = {
            color: this.state.hover ? 'blue' : 'black',
            transition: 'all .5s',
            display: 'block',
            height: '30px'
        };

        return <li
                    onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseHover}
                    style={style}
                    onDoubleClick={() => console.log('double clicked')}>

            {this.props.task.name} <button style={{float: "right"}} onClick={event => this.props.onDelete(this.props.task, event)}>Delete</button>

        </li>;
    }

}