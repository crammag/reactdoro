
import * as React from 'react';
import {Component} from 'react';
import SimpleForm from './SimpleForm';
import ListItem from './ListItem';
import Task from '../model/Task';


export interface TasksListProps {
    tasks: Task[];
    completed: boolean;
    onAddTask?: any;
    onRemoveTask: any;
}

export interface TasksListState {
    inputValue?: string;
}

export default class TasksList extends Component<TasksListProps, TasksListState> {

    public constructor(props: TasksListProps, context: any) {
        super(props,context);

        this.state = {inputValue: ''};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleRemoveTask = this.handleRemoveTask.bind(this);
    }

    private handleInputChange(event: any): void {
        this.setState({inputValue: event.target.value});
    }

    private handleSubmitForm(event: any): void {
        event.preventDefault();
        this.props.onAddTask(this.props.completed, {id: null, name: this.state.inputValue, assignedTime: 25}, true);
        this.setState({inputValue: ''});
    }

    private handleRemoveTask(task:Task, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this.props.onRemoveTask(this.props.completed, task, false);
    }

    render(): JSX.Element {

        let objects = this.props.tasks;

        return <ul style={{padding: 0}}>
            {objects.length != 0 ? objects.map((task) => {
                    return <ListItem key={task.id} task={task} onDelete={this.handleRemoveTask} onMark={()=>{}}/>
            }) : null}

            {!this.props.completed && <SimpleForm
                                            value={this.state.inputValue}
                                            placeholder="Add a new task..."
                                            buttonText="Add"
                                            onChange={this.handleInputChange}
                                            onSubmit={this.handleSubmitForm} />}

        </ul>;
    }

}
