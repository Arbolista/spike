## What and Why

Spike is a set of generators and organizational preferences to quickly build React web applications to quickly get started with an application that will:

- Serve application through an Express server for prerendering.
- Share application logic on server and client side, while enabling configuration for server and client specific functionality (eg data retrieval from database vs AJAX).
- Manage routing server and client side.
- Test shared logic in both a Node and browser environment.
- Develop in ES6.
- Enable static file build that can run on a simple static file server and compile templates and SASS in browser (ie no setup/configuration for designers).

The project uses the following dependencies :
- [React](https://facebook.github.io/react/)
- [React Templates](http://wix.github.io/react-templates/)
- [ReactJs History](https://github.com/mjackson/history)
- [Babel with ES2015 support](https://babeljs.io/docs/learn-es2015/)
- [Bootstrap](http://getbootstrap.com/) and jQuery for UI prototyping.
- [Webpack](https://webpack.github.io/) - for compiling client assets
- [Karma](https://karma-runner.github.io/0.13/index.html) and [Jasmine](http://jasmine.github.io/) for testing
- [i18next](http://i18next.com/) - for client and server internationalization. Language detection uses URL, and stores information in `lang` cookie.
- [momentjs](http://momentjs.com/) - Moment.js is used and can be accessed by using `moment` property in TranslatableComponent children. Its locale is automatically set to the global locale chosen using method above.

## Install

Project supports Node 5.10+, so using [nvm](https://github.com/creationix/nvm):

```sh
nvm install 5.10
nvm use 5.10
npm install -g npm-run-all
npm install
```

## Directory Structure

A Spike application is separated into 3 main directories:
- client
  - Configuration of entry points in broswer environment.
  - Webpack configuration for client application bundle.
  - Models, repositories, and api classes for accessing data from browser.
  - Browser specific tests.
- server
  - Express server for serving Webpack development server in development.
  - Configuration for isomorphic pre-rendering application server side.
  - Supporting assets such as stylesheets, fonts, vendor libraries.
  - Models, repositories, and api classes for accessing data from server.
  - Server specific tests.
- shared
  - React components and associated tests, html views, and stylesheets (colocated per component).
  - StateManager subclass for managing application state at top level component.
  - SpikeRouter subclass for configuring routes.
  - SpikeRoute base clase for route specific logic including delegation of data getting/ setting to client and server models and repositories.
  - Model and repository base classes (data getters, setters implemented in client and shared directories).

## Best Practices

See [Best Practice documentation](best_practices.md) for a list of concepts and tools meant for keeping code DRY and maintainable.

## Generators

Currently, there are two generator helpers:

- `npm run generate -- --what component --name MySubComponent --where {path_relative_to shared/components}`

This will generate a React component file (`component.js`), a React template file (`rt.html`), a Sas file (`.scss`), and Jasmine test file (`.test.js`).

- `npm run generate -- --what layout --name SomeLayout`

This will generate the template files above, as well as a new directory in `shared/lib/routes` with a route file. You'll still need to initialize the route in `shared/lib/routes.js` to get the layout to render.

## Configuration

A spike application is configurable in several places.

### Client

- Create Webpack configurations in `client/config/{NODE_ENV}/webpack.js`
- Create Webpack entry points in `client/config/{NODE_ENV}/entry.js` for different environments that wrap `client/app.js`.
- Create Webpack entry points for bundling application stylesheets in `client/config/{NODE_ENV}/style.js`.

### Server

- Add middleware to Express application in `server/config/server.base.js` in `ServerBase#config`.
- Create production implementations of Express server in `server/config/{NODE_ENV}/server.js` - should subclass ServerBase class from above.

## Running Server

Can run scripts in four modes:

### Design

`npm run design`

- no server side rendering
- WebpackDevServer hot loading (refreshes page on change).
- No babel caching of templates.

### Development

`npm run develop`

- Server side rendering.
- Babel compiles & caches templates on server (this is a FIXME).
- WebpackDevServer hot loading (refreshes page on change).

### Local Production

`npm run production-local`

- Server side rendering.
- Babel compiles & caches templates on server.
- Plain ol' Express server.
- Uses `client/api/real`.
- This run `gulp build --env production` before launching server (must kill server and re-run to see any changes reflected).
- This is meant for local development.

### Production

`npm run production`

- Same as above, but without the build step (`gulp build --env production`).
- This is meant to be run on a staging or production server.

### Changing API Directory

To change the api directory, for a given node env, change the api module alias for the NODE_ENV in `.babelrc` and `client/config/{NODE_ENV}/webpack.js`.

## Building

`npm run build -- --env {environment}`

This should be run on staging or production server before `npm run production` is called (ie in Docker build).

## License

The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice must be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
