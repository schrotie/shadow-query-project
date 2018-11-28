import hello from '../../../src/logic/reducers/hello.mjs';

describe('hello reducer', () => {
	it('should return default state', () => {
		hello(undefined, {}).should.equal('Hello world?');
	});
	it('should return passed state', () => {
		hello('test', {}).should.equal('test');
	});
	it('should return action state', () => {
		const action = {type: 'SET_HELLO', hello: 'test'};
		hello(undefined, action).should.equal('test');
	});
});
