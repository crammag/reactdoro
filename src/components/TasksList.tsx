
import * as React from 'react';
import {Component} from 'react';

import SimpleForm from './SimpleForm';

export interface TasksListProps {
    completed: boolean;
}

export interface TasksListState {
    tasks: string[];
    inputValue?: string;
}

export default class TasksList extends Component<TasksListProps, TasksListState> {

    private tasks: string[];
    private localStorageKey: string;

    public constructor(props: TasksListProps, context: any) {
        super(props,context);
        this.tasks = [];
        this.localStorageKey = props.completed ? "completedTasks" : "pendingTasks";
        this.loadFromStorage(props.completed || false);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    private loadFromStorage(completed: boolean) {
        let rawTasks = localStorage.getItem(this.localStorageKey);

        if (rawTasks) {
            this.tasks = JSON.parse(rawTasks);
        }
    }

    private handleInputChange(event: any): void {
        this.setState({inputValue: event.target.value});
    }

    private handleSubmitForm(event: any): void {
        event.preventDefault();
        console.log("submitted!");
        this.addTask(this.state.inputValue);

        event.target.firstChild.value = ""; //todo check a better way to clear the input value on submit
    }

    private addTask(task: string) {
        this.tasks.push(task);
        this.setState({tasks: this.tasks});
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
    }

    render(): JSX.Element {

        return <ul>
            {this.tasks.length != 0 ? this.tasks.map((task,index) => {
                    return <li key={index}>{task}</li>
            }) : <li key="0"/>}

            {!this.props.completed && <SimpleForm placeholder="Add a new task..." buttonText="Add"
                                                  onChange={this.handleInputChange} onSubmit={this.handleSubmitForm} />}

        </ul>;
    }

}
