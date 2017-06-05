
import * as React from 'react';
import {Col, Panel} from 'react-bootstrap';


export default class App extends React.Component<undefined, undefined> {

    public render(): JSX.Element {
        return <div>
            <Col xs={12} className="text-center">
                <h1>Reactdoro</h1>
                <h3>A pomodoro-like application made with react and typescript</h3>
            </Col>

            <Col xs={12} md={4}>

                <Panel header={"Timer"} bsStyle="primary">
                    00:00
                </Panel>

            </Col>

            <Col xs={12} md={4}>

                <Panel header={"Tasks to do"} bsStyle="primary">
                    <ul>
                        <li>A</li>
                        <li>B</li>
                    </ul>
                </Panel>

            </Col>

            <Col xs={12} md={4}>

                <Panel header={"Completed Tasks"} bsStyle="primary">
                    <ul>
                        <li>A</li>
                        <li>B</li>
                    </ul>
                </Panel>

            </Col>
        </div>;
    }

}
