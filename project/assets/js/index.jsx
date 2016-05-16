import React from 'react';
import { render } from 'react-dom';

import DummyComponent from 'dummy/components/DummyComponent';

class App extends React.Component {

  render () {
    return (
        <div>
            <DummyComponent />
        </div>
    );
  }

}

render(
    <App />,
    document.querySelector('.Content')
);
console.log('hi');
