import * as React from 'react';
import {Component} from 'react';
import Task from '../model/Task';


export interface TimerProps {
    minutes: number;
    activeTask: Task;
}

export interface TimerState {
    seconds: number;
    runningIntervalID: any;
}

export default class Timer extends Component<TimerProps, TimerState> {

    private intervalID: any;
    private rgbChangeStep: number;
    private rgbValue: number;

    public constructor(props: TimerProps, context: any) {
        super(props, context);
        this.state = {seconds: props.minutes * 60, runningIntervalID: null};
        this.toggleInterval = this.toggleInterval.bind(this);
        this.rgbChangeStep = 255 / this.state.seconds;
        this.rgbValue = 255;
    }

    public renderTime(): string {
        this.rgbValue -= this.rgbChangeStep;
        this.rgbValue = this.rgbValue < 0  ?  0 : this.rgbValue;

        let seconds:string = (this.withLeadingZeros(this.state.seconds % 60,2));
        let minutes:string = (this.withLeadingZeros(Math.floor(this.state.seconds / 60),2));

        return minutes + ':' + seconds;
    }

    private withLeadingZeros(value: any, length: number): string { //todo ask where to put this on react
        value = value + "";

        while(value.length < length) {
            value = 0 + value;
        }

        return value;
    }

    private toggleInterval(pause?: boolean) {

        let intervalID = null;

        if(!this.state.runningIntervalID) {

            intervalID = setInterval(() => {
                this.setState({seconds: this.state.seconds - 1});
            }, 1000);

        } else {

            if(!pause) {
                this.setState({seconds: this.props.minutes * 60});
                this.rgbValue = 255;
            }

            clearInterval(this.state.runningIntervalID);
        }


        this.setState({runningIntervalID: intervalID});
    }

    render(): JSX.Element {
        return <div>
            <h1 style={{
                color: `rgb(${255 - this.rgbValue}, ${this.rgbValue}, 0)`,
                transition: 'all .5s',
            }}>{this.renderTime()}</h1>
            <button onClick={() => this.toggleInterval()}>{this.state.runningIntervalID === null ? 'Start' : 'Stop'}</button>
            <button onClick={() => this.toggleInterval(true)}>Pause</button>

            <h4>Active Task: {this.props.activeTask ? this.props.activeTask : ''}</h4>
        </div>;
    }

}