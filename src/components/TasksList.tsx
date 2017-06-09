
import * as React from 'react';
import {Component} from 'react';

import SimpleForm from './SimpleForm';
import ListItem from './ListItem';
import Task from '../model/Task';
import Bind from './utilities/binderUtility';


export interface TasksListProps {
    tasks: Task[];
    completed: boolean;
    onAddTask?: any;
    onSelectTask?: any;
    onRemoveTask: any;
}

export interface TasksListState {
    inputValue?: string;
}

export default class TasksList extends Component<TasksListProps, TasksListState> {

    private inputTimeValue: number = 25;

    public constructor(props: TasksListProps, context: any) {
        super(props,context);

        this.state = {inputValue: ''};
    }

    @Bind()
    private handleInputChange(event: any): void {

        event.target.type === 'number' ?
            this.inputTimeValue = event.target.value :
            this.setState({inputValue: event.target.value});
    }

    @Bind()
    private handleSubmitForm(event: any): void {

        event.preventDefault();

        this.props.onAddTask(this.props.completed,
            {id: null, name: this.state.inputValue, assignedTime: this.inputTimeValue}, true);

        this.setState({inputValue: ''});
    }

    @Bind()
    private handleRemoveTask(task:Task, event: any): void {

        event.preventDefault();
        event.stopPropagation();
        this.props.onRemoveTask(this.props.completed, task, false);
    }

    public render(): JSX.Element {

        let tasks = this.props.tasks;

        return <ul style={{padding: 1}}>
            {tasks.map(task => this.renderItem(task))}

            {!this.props.completed && <SimpleForm
                                            value={this.state.inputValue}
                                            placeholder="Add a new task..."
                                            buttonText="Add"
                                            onChange={this.handleInputChange}
                                            onSubmit={this.handleSubmitForm} />}

        </ul>;
    }

    private renderItem(task: Task): JSX.Element {

        return <ListItem
            key={task.id}
            task={task}
            onDelete={this.handleRemoveTask}
            onMark={this.props.onSelectTask} />
    }

}
