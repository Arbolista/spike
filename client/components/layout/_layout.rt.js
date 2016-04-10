import React from 'react';
import _ from 'lodash';
function repeatExample1(example, exampleIndex) {
    return React.createElement('button', {
        'key': example.scoped_id,
        'data-param': 'example_id',
        'data-value': example.data.id,
        'className': _.keys(_.pick({ active: this.example && this.example.data.id === example.data.id }, _.identity)).join(' ') + ' ' + 'btn btn-primary',
        'onClick': this.setParam.bind(this),
        'type': 'button'
    }, example.data.name);
}
export default function () {
    return React.createElement('div', { 'id': 'layout' }, React.createElement('h1', {}, 'Basic Layout Component'), !this.example ? React.createElement('div', { 'className': 'alert alert-warning' }, '\n    Choose an example.\n  ') : null, this.example ? React.createElement('div', { 'className': 'alert alert-info' }, '\n    ', this.example.introduce(), '\n  ') : null, React.createElement.apply(this, [
        'div',
        {
            'className': 'btn-group',
            'role': 'group'
        },
        _.map(this.examples, repeatExample1.bind(this))
    ]));
};