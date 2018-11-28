import $ from '../../../node_modules/shadow-query/shadowQuery.mjs';
import {HelloConnector} from '../../../src/logic/connectors/hello.mjs';

describe('hello connector', () => {
	let node;
	beforeEach(() => {
		const test = document.querySelector('#test');
		test.innerHTML = '<span></span>';
		node = test.children[0];
		new HelloConnector($(node));
	});
	it('should set the property according to an event', () => {
		node.dispatchEvent(new CustomEvent('hello', {detail: 'test'}));
		node.hello.should.equal('test');
	});
});
