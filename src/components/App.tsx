
import * as React from 'react';
import {Col, Panel} from 'react-bootstrap';
import TasksList from './TasksList';
import Timer from './Timer';
import LocalStorageManager from '../model/LocalStorageManager';
import Task from '../model/Task';
import Bind from './utilities/binderUtility';


export interface AppState {
    tasks: LocalStorageManager<Task>;
    completedTasks: LocalStorageManager<Task>;
    activeTask: Task;
}

export default class App extends React.Component<{}, AppState> {

    public constructor(props?: any, context?: any) {
        super(props, context);

        this.state = {tasks: new LocalStorageManager<Task>('pendingTasks'),
            completedTasks: new LocalStorageManager<Task>('completedTasks'),
            activeTask: {id:null, name: '', assignedTime:25}
        };

        this.handleAddOrRemoveTask = this.handleAddOrRemoveTask.bind(this);
        this.handleSelectActiveTask = this.handleSelectActiveTask.bind(this);
        this.handleCompleteTask = this.handleCompleteTask.bind(this);
        this.handleIncompleteTask = this.handleIncompleteTask.bind(this);
    }

    @Bind()
    private handleAddOrRemoveTask(completed: boolean, taskToAddOrRemove: Task, add: boolean): void {

        let selectedManager = completed ? this.state.completedTasks : this.state.tasks;

        add
            ? selectedManager.addObject(taskToAddOrRemove)
            : selectedManager.removeObject(taskToAddOrRemove.id);

        if(completed) {
            this.setState({completedTasks: selectedManager});
        } else {
            this.setState({tasks: selectedManager});
        }

    }

    @Bind()
    private handleSelectActiveTask(selectedTask: Task) {
        this.setState({activeTask: selectedTask});
    }

    @Bind()
    private handleCompleteTask(completedTask: Task) {
        this.handleAddOrRemoveTask(false, completedTask, false);
        this.handleAddOrRemoveTask(true, completedTask, true);
    }

    @Bind()
    private handleIncompleteTask(incompletedTask: Task) {
        this.setState({activeTask: {id: '', name: '', assignedTime: incompletedTask.assignedTime}});
    }

    public render(): JSX.Element {
        return (
            <div>

                <Col xs={12} className="text-center" >
                    <h1>Reactdoro</h1>
                    <h3>A pomodoro-like application made with react and typescript</h3>
                </Col>

                <Col xs={12} md={4}>
                    <Panel header={"Tasks to do"} bsStyle="primary" >

                        <TasksList
                            completed={false}
                            onAddTask={this.handleAddOrRemoveTask}
                            onRemoveTask={this.handleAddOrRemoveTask}
                            onSelectTask={this.handleSelectActiveTask}
                            tasks={this.state.tasks.getObjects()} />

                    </Panel>
                </Col>

                <Col xs={12} md={4}>
                    <Panel header={"Timer"} bsStyle="primary" >

                        <Timer
                            minutes={this.state.activeTask.assignedTime}
                            activeTask={this.state.activeTask}
                            onCompleteTask={this.handleCompleteTask}
                            onIncompleteTask={this.handleIncompleteTask} />

                    </Panel>
                </Col>

                <Col xs={12} md={4}>
                    <Panel header={"Completed Tasks"} bsStyle="primary" >

                        <TasksList
                            completed={true}
                            onRemoveTask={this.handleAddOrRemoveTask}
                            tasks={this.state.completedTasks.getObjects()} />

                    </Panel>
                </Col>

            </div>
        );
    }

}
