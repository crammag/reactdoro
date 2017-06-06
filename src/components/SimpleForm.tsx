
import * as React from 'react';
import {Button, Input} from 'react-bootstrap';

export interface SimpleFormProps {
    placeholder: string;
    buttonText: string;
    onChange: any;
    onSubmit: any;
}

export default class SimpleForm extends React.Component<SimpleFormProps, {}> {

    render(): JSX.Element {
        return <form onSubmit={this.props.onSubmit}>
            <input type="text" onChange={this.props.onChange} placeholder={this.props.placeholder} />
            <input type="submit" value={this.props.buttonText} />
        </form>;
    }

}

