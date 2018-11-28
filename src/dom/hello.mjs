import $ from '../../node_modules/shadow-query/shadowQuery.mjs';

customElements.define('my-hello', class extends HTMLElement {
	constructor() {
		super();
		$(this).on('prop:hello', this._update.bind(this));
		$(this).on('click', this._event.bind(this));
		$(this).shadow(' ');
		this._update();
	}
	_update() {$(this).text(this.hello);}
	_event() {
		this.dispatchEvent(new CustomEvent('hello', {detail: 'Hello world!'}));
	}
});
