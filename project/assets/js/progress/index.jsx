import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from 'progress/components/App';
import reducer from 'progress/reducers';
import { fetchReport } from 'progress/actions/creators';


let store = createStore(reducer);

store.subscribe(() => {
  console.debug('store', store.getState());
});

render((
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.querySelector('.ProgressContent')
);
