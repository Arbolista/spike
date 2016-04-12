# Spike

[![Build Status](https://travis-ci.org/AnalyticsFire/spike.svg?branch=master)](https://travis-ci.org/AnalyticsFire/spike)

## Purpose

Spike is collection of Javascript modules, compilers, and libraries intended to ease development of front end applications that interact with web services. Dependencies include:
- [React](https://facebook.github.io/react/)
- [React Templates](http://wix.github.io/react-templates/)
- [ReactJs History](https://github.com/mjackson/history) - JS framework agnostic
- [Babel with ES2015 support](https://babeljs.io/docs/learn-es2015/)
- [Bootstrap](http://getbootstrap.com/) and jQuery for UI prototyping.
- [Webpack](https://webpack.github.io/) - for compiling client assets
- [Karma](https://karma-runner.github.io/0.13/index.html) and [Jasmine](http://jasmine.github.io/) for testing

Spike uses these dependencies to implement the following features within a well defined architecture:
- Polymorphic models and state manager framework to retrieve data on the server or the client.
- Server side rendering on Express server - bypasses initial render and data retrieval on client.
- Client side management of browser history (ie routing).
- Webpack development server for fast and easy development of changes through hot loading.
- Webpack configuration for environment based API calls (see `client/api/{env}`).
- Standalone Webpack builds for offline development of HTML and CSS by designers.
- Karma and Jasmine configurations to test app rendering on both client and server.
- ESLint configuration to ensure consistent code style with Spike base.

## Why no data management library?

With support of classes in ES6, it feels more intuitive to manage data both on the server and in the client with model classes and a single state manager. Models can manage complexity of fetching and storing data, while a central state manager can call those models to update its state.

Spike data management models favors a centralized state pattern rather than independent component states.

See [docs](docs) for how this is accomplished.

## Scripts

Install dependencies
```
npm install
```

## Developing

To run the Webpack development server,

```sh
npm run develop
```

## Testing

`npm test` is equivalent to:

```
BABEL_DISABLE_CACHE=1 karma start --single-run
BABEL_DISABLE_CACHE=1 babel-node test.server.js
eslint --fix .
```

Karma is used to test client side application interactions.

Jasmine is used to test that the application successfully renders server side for a given URL (using [supertest](https://github.com/visionmedia/supertest) to mock requests).

## Design Build

To build a design pack, you first need to install [sass.js](https://github.com/medialize/sass.js/) in the design build directory so the design build can compile the sass in the browser.

```sh
cd client/build/design/assets
git clone https://github.com/medialize/sass.js.git sass
```

Then build the app with webpack:

```sh
gulp run design
```

The design app requires no backend, just a server so files can be downloaded with jQuery. For instance with Python or Python3:

```
cd client/build/design
python -m SimpleHTTPServer 8000
python3 -m http.server
```

*Note*
In order for the design build to work, the following component naming conventions should be followed:
- Component keys are internally generated.
  - For a base component, them naming convention is '{component_name}' from the path 'components/{component_name}/{component_name}.component.js'. For instance, a component at 'components/example/example.component.js' will be keyed as 'example'. This should be unique.
  - For a nested component (shouldn't be nested more than one level deep), the naming convention is '{base}_{component_name}' from the path 'components/{base}/{component_name}/{component_name}.component.js'. For instance, a component at 'components/example/graph/graph.component.js', will be keyed as 'example_graph'. This should be unique.

## Areas for Improvement

Currently, any changes made to React templates are not seen by Webpack's watcher, so you have to force a change in the React component class for Webpack to load the changes in your template files.

The alternative is to set `cache: false` in the development webpack configuration file. However, this dramatically slows down hot patching.


