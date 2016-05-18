import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from 'report/components/App';
import reducer from 'report/reducers';
import { fetchReport } from 'report/actions/creators';


let store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

store.subscribe(() => {
  console.debug('store', store.getState());
});

store.dispatch(fetchReport());

render((
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.querySelector('.Content')
);
