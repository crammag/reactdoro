
import * as React from 'react';
import {Component} from 'react';

import SimpleForm from './SimpleForm';
import ListItem from './ListItem';
import LocalStorageManager from '../model/LocalStorageManager';
import {Task} from '../model/Task';

export interface TasksListProps {
    completed: boolean;
}

export interface TasksListState {
    tasks: Task[];
    inputValue?: string;
}

export default class TasksList extends Component<TasksListProps, TasksListState> {

    private manager: LocalStorageManager<Task>;

    public constructor(props: TasksListProps, context: any) {
        super(props,context);
        this.manager = new LocalStorageManager<Task>(props.completed ? "completedTasks" : "pendingTasks");
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleRemoveTask = this.handleRemoveTask.bind(this);
    }

    private handleInputChange(event: any): void {
        this.setState({inputValue: event.target.value});
    }

    private handleSubmitForm(event: any): void {
        event.preventDefault();

        this.manager.addObject({id:"", name: this.state.inputValue, assignedTime:25});
        this.setState({tasks: this.manager.getObjects()});

        event.target.firstChild.value = ""; //todo check a better way to clear the input value on submit
    }

    private handleRemoveTask(id: string) {
        this.manager.removeObject(id);
        this.setState({tasks: this.manager.getObjects()});
    }

    render(): JSX.Element {

        let objects = this.manager.getObjects();

        return <ul>
            {objects.length != 0 ? objects.map((task,index) => {
                    return <ListItem key={task.id} task={task} onDelete={this.handleRemoveTask} onMark={()=>{}}/>
            }) : null}

            {!this.props.completed && <SimpleForm placeholder="Add a new task..." buttonText="Add"
                                                  onChange={this.handleInputChange} onSubmit={this.handleSubmitForm} />}

        </ul>;
    }

}
