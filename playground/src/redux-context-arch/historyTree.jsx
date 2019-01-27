import React, {Fragment} from 'react';
import {HistoryContainer, withHistoryContext} from './layer2_containers_state';
import {getMethodProperties, getValueProperties} from './utils';

// presentational component
const Counter = (props) => {
    const {previousJobs} = props;
    return (
        <p>There are {previousJobs.length} previous jobs saved.</p>
    );
}

const HistoryCounter = withHistoryContext(Counter);

export const HistoryTree = () => {
    return (
        <HistoryContainer>
            <HistoryCounter />
        </HistoryContainer>
    );
}