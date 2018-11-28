import {setHello} from '../../../src/logic/actions/hello.mjs';

describe('hello action', () => {
	it('should return "hello" action', () => {
		setHello(      ).type.should.equal('SET_HELLO');
		setHello('test').type.should.equal('SET_HELLO');
		setHello('test').hello.should.equal('test');
	});
});
