import * as React from 'react';
import {Component} from 'react';

export interface TimerProps {
    minutes: number;
}

export interface TimerState {
    seconds: number;
    runningIntervalID: any;
}

export default class Timer extends Component<TimerProps, TimerState> {

    private intervalID: any;

    public constructor(props: TimerProps, context: any) {
        super(props, context);
        this.state = {seconds: props.minutes * 60, runningIntervalID: null};
        this.toggleInterval = this.toggleInterval.bind(this);
    }

    public renderTime(): string {
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
            }
            clearInterval(this.state.runningIntervalID);
        }


        this.setState({runningIntervalID: intervalID});
    }

    render(): JSX.Element {
        return <div>
            <h1>{this.renderTime()}</h1>
            <button onClick={() => this.toggleInterval()}>{this.state.runningIntervalID === null ? 'Start' : 'Stop'}</button>
            <button onClick={() => this.toggleInterval(true)}>Pause</button>
        </div>;
    }

}