import $ from '../node_modules/shadow-query/shadowQuery.mjs';

import './dom/hello.mjs';
import {HelloConnector} from './logic/connectors/hello.mjs';

const template = `
<my-hello></my-hello>
`;
/**
 * `<my-app>` is just a template application for you start building a true
 * modern web application built upon web components, Redux and ShadowQuery.
 * you may want to rename `<my-app>` to `<your-app>` ;-)
 * This comment's main purpose is to demonstrate the documentation generation
 * shipped with this application template. Do `npm run doc` to generate it.
 * If you are building a library-like project or otherwise need good
 * documentation, consider setting .eslintrc.json's `require-jsdoc` to `"on"`.
 * @class my-app
 */
customElements.define('my-app', class extends HTMLElement {
	constructor() {
		super();
		$(this).shadow(template);
		new HelloConnector($(this, 'my-hello'));
	}
});
