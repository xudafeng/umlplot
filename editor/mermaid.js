'use strict';

import React from 'react';
import mermaid from 'mermaid';
import ReactDOM from 'react-dom';
import ForkmeonComponent from 'forkmeon.github.io';

import './mermaid.less';
import _ from './utils';
import pkg from '../package';

mermaid.initialize({
  theme: 'forest',
  gantt: {
    axisFormatter: [
      [
        '%Y-%m-%d', (d) => {
          return d.getDay() === 1;
        }
      ]
    ]
  }
});

const data = _.getUrlParams('data');

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: data ? _.decode(data) : `
        gantt
        title A Gantt Diagram
        dateFormat  YYYY-MM-DD
        section Section
        A task :a1, 2017-01-01, 5d
        B task :after a1, 2d
      `
    };
  }

  textareaOnChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  getEncoded() {
    const encoded = _.encode(this.state.text);
    const str = `?data=${encoded}`;
    history.replaceState({}, document.title, str);
  }

  getForkmeonProps() {
    return {
      classPrefix: pkg.name,
      fixed: true,
      text: 'Fork me on Github',
      linkUrl: pkg.repository.url,
      onDemoUpdateDid: () => {},
      flat: true
    };
  }

  render() {
    this.getEncoded();
    return (
      <div className="container">
        <ForkmeonComponent {...this.getForkmeonProps()}/>
        <textarea onChange={this.textareaOnChange.bind(this)} value={this.state.text}></textarea>
        <p className="links">
          <a href="https://mermaidjs.github.io">document</a>
        </p>
        <div className="mermaid">{this.state.text}</div>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.querySelector('#app'));
