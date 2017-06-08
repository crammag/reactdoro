import * as React from 'react';
import {Component} from 'react';
import Task from '../model/Task';

// require('!style-loader!css-loader!sass-loader!./main.scss');

require('!style-loader!css-loader!sass-loader!./main.scss');

export interface TimerProps {
    minutes: number;
    activeTask: Task;
    onCompleteTask: any;
    onIncompleteTask: any;
}

export interface TimerState {
    seconds: number;
    runningIntervalID: any;
}

export default class Timer extends Component<TimerProps, TimerState> {

    private rgbChangeStep: number;
    private rgbValue: number;

    public constructor(props: TimerProps, context: any) {
        super(props, context);
        this.state = {seconds: props.minutes * 60, runningIntervalID: null};

        this.toggleInterval = this.toggleInterval.bind(this);
        this.surrender = this.surrender.bind(this);
        this.completeTask = this.completeTask.bind(this);

        this.rgbChangeStep = 255 / this.state.seconds;
        this.rgbValue = 255;
    }


    public componentWillReceiveProps(nextProps: Readonly<TimerProps>) {
        let seconds = nextProps.activeTask.assignedTime * 60;

        if (seconds !== this.state.seconds && nextProps.activeTask != this.props.activeTask) {
            this.setState({ seconds: seconds });
            this.rgbChangeStep = 255 / seconds;
            this.rgbValue = 255;

            //to stop the clock if it's running
            if(this.state.runningIntervalID) {
                this.toggleInterval();
            }
        }
    }


    public shouldComponentUpdate(nextProps: Readonly<TimerProps>, nextState: Readonly<TimerState>, nextContext: any): boolean {
        return nextState.seconds != this.state.seconds || nextProps.activeTask.name != this.props.activeTask.name;
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

        if(this.props.activeTask.name === '') {
            return;
        }

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

    private surrender(incompletedTask: Task) {
        this.state.runningIntervalID && this.toggleInterval();
        this.props.onIncompleteTask(incompletedTask);
    }

    private completeTask(completedTask: Task) {

        if(this.props.activeTask.name === '') {
            return;
        }

        this.state.runningIntervalID && this.toggleInterval();
        completedTask.completedTime = completedTask.assignedTime - this.state.seconds / 60;
        this.props.onCompleteTask(completedTask);

    }

    public render(): JSX.Element {

        return <div>

            <h1 style={{
                color: `rgb(${255 - this.rgbValue}, ${this.rgbValue}, 0)`,
                transition: 'all .5s',
            }}>{this.renderTime()}</h1>

            {this.state.seconds === 0 ? this.surrender(this.props.activeTask) : null}

            <button className="mainColor" onClick={() => this.toggleInterval()}>{this.state.runningIntervalID === null ? 'Start' : 'Stop'}</button>
            <button onClick={() => this.toggleInterval(true)}>Pause</button>

            <button onClick={() => this.completeTask(this.props.activeTask)}>Complete</button>
            <button onClick={() => this.surrender(this.props.activeTask)}>Surrender</button>

            <h4>Active Task: {this.props.activeTask ? this.props.activeTask.name : ''}</h4>

        </div>;
    }

}