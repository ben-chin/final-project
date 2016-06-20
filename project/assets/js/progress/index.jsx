import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from 'progress/components/App';
import reducer from 'progress/reducers';
import { fetchUser } from 'report/actions/creators';


let store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

store.subscribe(() => {
  console.debug('store', store.getState());
});

store.dispatch(fetchUser());

render((
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.querySelector('.ProgressContent')
);
