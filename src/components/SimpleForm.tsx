
import * as React from 'react';
import {Button, Input} from 'react-bootstrap';

export interface SimpleFormProps {
    value: string;
    placeholder: string;
    buttonText: string;
    onChange: any;
    onSubmit: any;
}

export default class SimpleForm extends React.Component<SimpleFormProps, {}> {

    render(): JSX.Element {
        return <form onSubmit={this.props.onSubmit}>
            <input required type="text" value={this.props.value} onChange={this.props.onChange} placeholder={this.props.placeholder} />
            <input type="number" min="1" max="99" defaultValue="25" onChange={this.props.onChange} style={{width:'50px', textAlign:'center'}}/>
            <input type="submit" value={this.props.buttonText} />
        </form>;
    }

}

