# React Server Base

[![Build Status](https://travis-ci.org/arbolista-dev/react-server-base.svg?branch=react-design-builder)](https://travis-ci.org/arbolista-dev/react-server-base)

This repository is intended for cloning to get up and running with the following stack:
- [React](https://facebook.github.io/react/)
- [React Templates](http://wix.github.io/react-templates/)
- [ReactJs History](https://github.com/mjackson/history) - JS framework agnostic
- [Babel with ES2015 support](https://babeljs.io/docs/learn-es2015/)
- [Bootstrap](http://getbootstrap.com/) and jQuery for UI prototyping.
- [Webpack](https://webpack.github.io/) - for compiling client assets
- [Karma](https://karma-runner.github.io/0.13/index.html) and [Jasmine](http://jasmine.github.io/) for testing

Run your server in `/server` and connect to your api in client/api/{env}.

We may want to evolve this base architecture and set of dependencies with the following:
- A documented state management system (redux/relay)

## Scripts

Install dependencies
```
npm install
```

Build React app.
```
gulp build --env development
```

Serve standalone React app.
```
cd ./client/build/development
python3 -m http.server
```

Run tests.
```
karma start
```
## Building the design pack

To build a design pack, you first need to install [sass.js](https://github.com/medialize/sass.js/) in the design build directory so the design build can compile the sass in the browser.

```sh
cd client/build/design
git clone https://github.com/medialize/sass.js.git
```

Then build the app with webpack:

```sh
gulp build --env design
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


