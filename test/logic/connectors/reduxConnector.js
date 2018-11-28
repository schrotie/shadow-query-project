import $          from '../../../node_modules/shadow-query/shadowQuery.mjs';
import Connector  from '../../../src/logic/connectors/reduxConnector.mjs';
import {setHello} from '../../../src/logic/actions/hello.mjs';

class Test extends Connector {
	constructor(node) {
		super(node);
		this.binding({path:'hello', operation: 'prop', key:'testStr'});
		this.binding({path:'test.coverage', operation: 'prop', key:'coverage'});
		this.binding({path:this._path, operation: 'prop', key:'testFunc'});
		this.dispatcher('test', evt => setHello('testReduxConnector'));
		this.dispatcher('test2', evt => setHello('testReduxConnector2'));
	}
	_path() {return 'testReduxConnectorFunction';}
}

describe('ReduxConnector', () => {
	let node;
	beforeEach(() => {
		const test = document.querySelector('#test');
		test.innerHTML = '<span></span>';
		node = test.children[0];
	});
	it('should bind via string', () => {
		new Test($(node));
		node.dispatchEvent(new CustomEvent('test'));
		node.testStr.should.equal('testReduxConnector');
	});
	it('should bind via function', () => {
		new Test($(node));
		node.dispatchEvent(new CustomEvent('test'));
		node.testFunc.should.equal('testReduxConnectorFunction');
	});
});
