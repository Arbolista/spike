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

## Install

Project supports Node 5.10+, so using [nvm](https://github.com/creationix/nvm):

```sh
nvm install 5.10
nvm use 5.10
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
  - Configuration for pre-rendering application server side.
  - Supporting assets such as stylesheets, fonts, vendor libraries.
  - Models, repositories, and api classes for accessing data from server.
  - Server specific tests.
- shared
  - React components and associated tests, html views, and stylesheets (colocated per component).
  - StateManager subclass for managing application state at top level component.
  - SpikeRouter subclass for configuring routes.
  - SpikeRoute base clase for route specific logic including delegation of data getting/ setting to client and server models and repositories.
  - Model and repository base classes (data getters, setters implemented in client and shared directories).

## Core Classes

The following base classes can be imported from Spike and subclassed in a Spike application.

### SpikeStateManager
`spike/shared/lib/state_manager`

*Super Class Implementation*
- `constructor` - initializes state.
- `setRoute` - Assigns passed route to `StateManager#state.route` and returns `Route#assureData` promise.

*Sub Class Implementation*
- `getInitialData` - Should set any universally needed application data and return a promise.

### SpikeRouter
`spike/shared/lib/router`

*Super Class Implementation*
- `constructor` - accepts instances of `StateManager` and an Array of routes.
- `inititializeHistory` - accepts the top level component and initializes React History. Any time a browser history event is received, Router will pass the new location object to `Router#setLocation`. Upon completion of that promise chain, the top level component's `syncFromStateManager` will be called.
- `setLocation` - accepts a browser history location object, which will be passed to `StateManager#setRoute`.
- `setLocationToCurrentUrl` - Equivalent to above, but rather than accepting a location object, is uses the window's current location. This could be called before React application is initialized in browser, to ensure that it is initialized with StateManager in the intended state.
- `pushHistory` - accepts a URL path (String) which is pushed to browser history, in turn triggering `Router#setLocaiton`.

*Sub Class Implementation*
- `goTo` convenience methods for creating and pushing new urls to browser history.

### SpikeRoute
`spike/shared/lib/route`

*Super Class Implementation*
- `matchesLocation` - accepts browser history location object, and returns true/false if location matches Route.
- `setParams` - accepts browser history location object and parses the url to extract route parameters.

*Sub Class Implementation*
- `assureData` - Get necessary data for route after params have been set. Return promise.

## Mixins

Enable multiple classes and objects to be mixed into class prototypes. For instance:

```js
import mixin from 'spike/shared/lib/mixin';

class BaseClass{}

const someFunctionality = {
  sayHi(){
    console.log('hi')
  }
}

class NewClass extends mixin(BaseClass, someFunctionality){
  // ...
}

```

### Translatable Component
`spike/shared/lib/components/translatable`

*Super Class Implementation*
`t` - pass a translation key to i18n. Returns key if i18n not found on component context.

## Generators

### Application

```sh
spike generate --application
```
Will generate basic basic directory structure, along with the following basic implementations of core classes:

- `server/config/development/server.js` - Webpack development server configuration that wraps and serves `client/config/app/development.js`.
- `server/config/server.base.js` - Base server class for serving `server/assets` and allowing user to configure any required Express middleware.
- `server/test/server.test.js` - to test basic rendering of application.
- `server/views/index.ejs` - Basic HTML page with a root element for React application and script tag for Webpack dev server in development.
- `client/config/webpack/development.js` - Webpack configuration file for running basic app with Webpack dev server.
- `client/config/app/development.js` - Basic wrapper for `shared/app.js` to launch application in browser.
- `shared/lib/state_manager/` - minimal implementation of SpikeStateManager.
- `shared/lib/router/` - minimal implementation of SpikeRouter.
- `shared/lib/routes/home/` - minimal implementation of SpikeRoute.
- `shared/components/layout/` - React component class with associated stylesheet, React Template, and test for rendering a very basic 'Hello World' page.
- `shared/app.js` - Exportable function to be called by server/client wrapper. that renders top level application component.
- `.babelrc` for compiling React Templates through Babel.

### Routes

```sh
spike generate --route Super
```

#### Options

- `template` - file location of a custom route template.

### React Components

```sh
spike generate --component Super
```

#### Options

- `extends` - super class to extend.
- `template` - file location of a custom route template.

### Design Configuration

```sh
spike generate --design_config
```

This will create `client/config/webpack/design.js` and `client/config/app/design.js`, which will be used by the design build process to build an offline app.

`client/config/app/design.js` uses `spike/client/lib/design_component_sass_loader.js` and `spike/client/lib/design_component_template_loader.js` to load and compile those assets client side.

## Configure

A spike application is configurable in several places.

### Client

- Create Webpack configurations in `client/config/webpack`
- Create Webpack entry points in `client/config/entry` for different environments that wrap `shared/app.js`.
- Create Webpack entry points for bundling application stylesheets in `client/config/style`.
- Create Webpack entry points for bundling vendor Javascript and CSS in `client/config/vendor`.

### Server

- Add middleware to Express application in `server/config/server.base.js` in `ServerBase#config`.
- Create production implementations of Express server in `server/config/production/`.

## Develop

To run the Webpack development server:

```sh
spike develop
```

This will run Webpack development server.

### Build

```sh
spike build --env {env}
```

This will build assets in `build/{env}` based on `client/config/webpack/{env}.js`.

#### Design

```sh
spike build_design
```

In addition to Webpack bundling of `client/config/webpac/design.js`, this will also copy `server/assets/` to `build/design/assets/` and all Sass and React Template files in `shared/components/` to `build/design/components/`.

It will also compile `server/views/index.ejs` and copy it to `build/design/index.html` (check `process.env.NODE_ENV` to customize compiled template for design).

This build is meant to run with a simple file server and allow a designer to change Sass and React Template files and view their changes on page refresh.

`spike generate --design_config` should be run beforehand.

#### Production

Production builds can just use `spike build --env production` and simply serve compiled assets with Express static.

## Test

Directory structure emphasizes colaction of unit tests with the files they are testing. Therefore, components and route generators will also generate simple test files.

Tests in the shared directory should run in both browser tests (ie Karma) and server tests (plain mocha/jasmine).

## License

The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice must be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
