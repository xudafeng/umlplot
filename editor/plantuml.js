'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ForkmeonComponent from 'forkmeon.github.io';

import './plantuml.less';
import _ from './utils';
import pkg from '../package';

const data = _.getHashData();

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: data ? _.decode(data) : `class ${pkg.name.toUpperCase()}`
    };
  }

  textareaOnChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  getEncoded() {
    const encoded = _.encode(this.state.text);
    const str = `#data=${encoded}`;
    history.replaceState({}, document.title, str);
    return encoded;
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
    return (
      <div className="container">
        <ForkmeonComponent {...this.getForkmeonProps()}/>
        <textarea onChange={this.textareaOnChange.bind(this)} value={this.state.text}></textarea>
        <p className="links">
          <a href="http://plantuml.com/">document</a>
        </p>
        <div>
          <img src={`http://www.plantuml.com/plantuml/svg/${this.getEncoded()}`} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.querySelector('#app'));
