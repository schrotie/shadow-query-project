import {setHello} from '../actions/hello.mjs';
import ReduxConnector from './reduxConnector.mjs';

export class HelloConnector extends ReduxConnector {
	constructor(node) {
		super(node);
		this.binding({path:'hello', operation: 'prop', key:'hello'});
		this.dispatcher('hello', evt => setHello(evt.detail));
	}
}
