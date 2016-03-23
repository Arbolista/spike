# React Server Base

[![Build Status](https://travis-ci.org/arbolista-dev/react-server-base.svg?branch=react-express-base)](https://travis-ci.org/arbolista-dev/react-server-base)

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


