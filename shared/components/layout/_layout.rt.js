import React from 'react';
import _ from 'lodash';
function repeatExample1(example, exampleIndex) {
    return React.createElement('button', {
        'key': example.scoped_id,
        'data-param': 'example_id',
        'data-value': example.id,
        'className': _.keys(_.pick({ active: this.example && this.example.id === example.id }, _.identity)).join(' ') + ' ' + 'btn btn-primary',
        'onClick': this.goToExample.bind(this),
        'type': 'button'
    }, example.data.name);
}
export default function () {
    return React.createElement('div', { 'id': 'layout' }, React.createElement('h1', {}, 'Basic Layout Component'), this.route_name === 'MissingRoute' ? React.createElement('div', { 'className': 'alert alert-danger' }, '\n    Sorry, the page you requested does not exist.\n  ') : null, this.route_name === 'IndexRoute' ? React.createElement('div', { 'className': 'alert alert-warning' }, '\n    Choose an example.\n  ') : null, this.route_name === 'ExampleRoute' ? React.createElement('div', { 'className': 'alert alert-info' }, '\n    ', this.example.introduce(), '\n  ') : null, React.createElement.apply(this, [
        'div',
        {
            'className': 'btn-group',
            'role': 'group'
        },
        _.map(this.examples, repeatExample1.bind(this))
    ]));
};