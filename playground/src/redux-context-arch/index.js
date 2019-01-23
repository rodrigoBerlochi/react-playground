import React, { Component } from 'react';
// here use the Provider to get a general connection between the Application
// and the Global State. This makes available for Container to use connect() and read fragments
// of that Global State
import {Provider} from 'react-redux';
import {appStore} from './layer1_global_state';
// we put the Profile Tree here inside the Redux Provider, this way it is rendered on the UI
// and also gets access to the Redux
import {ProfileTree} from './profileTree';

export class Tree extends Component {
    render() {
        return (
            <Provider store={appStore}>
                <ProfileTree />
            </Provider>
        );
    };
}