# shadow-query-project
Project template for modern web applications built upon web components, Redux and ShadowQuery.

This template ships with a `src` tree structured according to the architecture theory explained [here](https://blog.roggendorf.pro/2018/11/17/the-perfect-web-application-framework/) - something you're likely vaguely familiar with if you know React. The code is just a hello world placeholder blown out of proportions by putting it into the structure for a full blown application. It's purpose is solely to create the basic directory tree and give you minimal examples what to put where.

There also is a `test` directory with tests for the placeholders. The `test` directory has the same structure as the `src` directory.

Beyond that, this template also comes with the essential tools to get you started with coding right away. As discussed in the [already mentioned article](https://blog.roggendorf.pro/2018/11/17/the-perfect-web-application-framework/) I believe you should eventually assemble your very own perfect stack. But when starting a project - or just messing around - this process may delay you for days if not weeks. So the idea is to get you started right away and let you learn what you need while you go.

Run `npm i` to enable all tools discussed below.

Thus you should consider the following parts of the toolchain placeholders for your eventual choices.

## Server Intro
In order to develop a web application you need a web server - ideally one that is optimized for your workflow and keeps you coding as much as possible instead of fiddling with browser. The mentioned article discusses how the architecture underlying this template facilitates a test driven development approach for web applications, and this is what I built this server for.

## Test
Manually run tests with `npm test`. If the server is running (see below) it will use the running server during the tests, otherwise it will spin it up for testing and spin it down afterwards.

The test suite is built on mocha and chai and runs in a headless Chrome (puppeteer). Chrome has a built in code coverage tool, puppeteer extracts that coverage data and makes it available to mocha where tests for coverage are automatically added to the test suite - if it is run in the headless Chrome! The coverage data is also stored in a file (`dev/server/coverage.json`).

The test suite is driven from `dev/test/index.html` and augmented with a few small utilities there that process the coverage data and _load all files from the `test` directory_. So whatever you put in the `test` directory will automatically be added to the test suite. Just drop your mocha test descriptions there and you're fine. You cannot rely on the load order of test files! Use `import` in your tests to specify order, but if one file in `test` loads another file from there, the second may be loaded first!

When the server is running you can also open [http://localhost:8080/dev/test/](http://localhost:8080/dev/test/) in your Chrome and see test and coverage results in the browser. More importantly: you can debug your tests right in the browser debugger! Coverage data is displayed from the file that was generated during the previous headless Chrome test run.

You can then also use Chrome's coverage tool in its dev-tools to figure out what you're missing. Note that Chrome's coverage sometimes misinterprets whitespaces and curly closing brackets as not covered. The coverage processing tries to make up for this, but there may be problems I haven't encountered, yet. Anyway: Chrome will highlight your code green or red in its debugger with respect to its coverage.

Together these tools provide a powerful suite that allows you write and refine tests with high productivity. Back to how the server helps with this:

## Server Continued
The server is started with `npm start` (in the background, your shell remains available!) and stopped with `npm stop`. By default the server uses port 8080. You can change this with `config.port` in `package.json`. `npm run pid` will provide the pid of the currently running server if any.

By default whenever you save your code - `src` or `test` code - the server will do things. If you update a `test` file it will
1. run the test suite and collect test coverage data
2. reload any open test tab

If you update a `src` file it will
1. run the test suite and collect test coverage data
2. notify any open application tab
    1. of test failures - the app will open a test tab or update an existing one
	 2. of the update - the app tab will automatically reload

Thus you can stay in your editor and hopefully see tests turn green or coverage improve.

You can turn off the automatic testing by setting `config.tdd` to `false` in `package.json`.

## Documentation
JsDoc is included in the template. `npm run doc` will generate the docs from the `src` tree and dump it into the `doc` directory.

## Build
`npm run build` will build the project.

The build is minimal and completely implemented as `npm` scripts. You should choose your favorite toolchain for this ... or maintain the npm based built.

It uses rollup, babel, and uglify to do its thing. You may continue using this process as long as you keep a single `src/app.mjs` entry point, don't need bundles and don't need more scripts to be built that are included by `index.html`.

The build result consists of three files:
* full.html  
full build with babel for IE and other browsers that miss modern ECMAScript features
* minimal.html  
minimal build with just bundling and uglification for modern browsers
* polyfill.html  
build for browsers that support modern ECMAScript but miss some web component tech (e.g. shadow DOM)

Each build result consists of just one HTML file with everything wrapped into it. If you don't go crazy with dependencies you can thus build even complex web-apps at below 100K. If you do need more, though, customize the build.

## Coda
That's it, I hope you find this template useful!
