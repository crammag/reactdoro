import * as React from 'react';
import {Component} from 'react';

const style = require('./hidingElement.scss');

export interface HidingElementProps {

}

export interface HidingElementState {

}

export default class HidingElement extends Component<HidingElementProps, HidingElementState> {

    public constructor(props: HidingElementProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return <div className={style.hidingElement}> timer on! </div>;
    }

}