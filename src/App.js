import React, { Component } from 'react';
import { StatusBar } from 'react-native'
import ReduxThunk from 'redux-thunk';
import ReduxMulti from 'redux-multi'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Routes from './Routes';
import reducers from './reducers';

class App extends Component {
   
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk, ReduxMulti))}>
                <Routes />
            </Provider>
        );
    }
}

export default App;
