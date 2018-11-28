import '../../../src/dom/hello.mjs';

describe('<sq-hello>', () => {
	let node;
	beforeEach(() => {
		const test = document.querySelector('#test');
		test.innerHTML = '<my-hello></my-hello>';
		node = test.children[0];
	});
	it('should attach shadow', () => {
		(node.shadowRoot instanceof ShadowRoot).should.equal(true);
	});
	it('should sync\' its text', () => {
		(node.shadowRoot instanceof ShadowRoot).should.equal(true);
		node.hello = 'test';
		node.shadowRoot.innerHTML.should.equal('test');
	});
	it('should dispatch "hello" on click', done => {
		node.addEventListener('hello', evt => {
			evt.detail.should.equal('Hello world!');
			done();
		});
		node.dispatchEvent(new CustomEvent('click'));
	});
});

/*
customElements.define('my-hello', class extends HTMLElement {
	constructor() {
		super();
		$(this).on('prop:hello', this._update.bind(this));
		$(this).on('click', this._event.bind(this));
		$(this).shadow(' ');
	}
	_update() {$(this).text(this.hello);}
	_event() {
		this.dispatchEvent(new CustomEvent('hello', {detail: 'Hello world!'}));
	}
});
*/
