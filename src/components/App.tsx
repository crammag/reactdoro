
import * as React from 'react';
import {Col, Panel} from 'react-bootstrap';
import TasksList from './TasksList';
import Timer from './Timer';


export default class App extends React.Component<undefined, undefined> {

    public render(): JSX.Element {
        return <div>
            <Col xs={12} className="text-center">
                <h1>Reactdoro</h1>
                <h3>A pomodoro-like application made with react and typescript</h3>
            </Col>

            <Col xs={12} md={4}>

                <Panel header={"Timer"} bsStyle="primary">
                    <Timer minutes={25} />
                </Panel>

            </Col>

            <Col xs={12} md={4}>

                <Panel header={"Tasks to do"} bsStyle="primary">
                    <TasksList completed={false} />
                </Panel>

            </Col>

            <Col xs={12} md={4}>

                <Panel header={"Completed Tasks"} bsStyle="primary">
                    <TasksList completed={true} />
                </Panel>

            </Col>
        </div>;
    }

}
