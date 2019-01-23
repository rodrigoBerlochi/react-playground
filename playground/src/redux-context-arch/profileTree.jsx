import React, {Fragment} from 'react';
import {ProfileContainer, withProfileContext} from './layer2_containers_state';
import {getMethodProperties, getValueProperties} from './utils';

/**
 * 
 * A Presentational component, it does not know about Context, 
 * just gets props. 
 * As a drawback and an implementation detail to be evaluated, 
 * it needs to remove the dispatch from the remaining props values 
 * 
 * A clean and short way to do it, is destructuring in the function signature
 */
const List = (props) => {

    const values = getValueProperties(props);

    const styles = {
        list: {
            listStyle: 'none',
            textAlign: 'left'
        }
    };

    return (
        <ul style={styles.list}>
            {values.map((el) => {
                return (<li key={el[0]}>{`${el[0]}: ${el[1]}`}</li>);
            })}
        </ul>
    );
};

// use HOC to bind presentational component to a context
const ProfileList = withProfileContext(List);

/**
 * Another Presentational component
 * which knows only about props and will serve for
 * testing changes to the State
 */
const _Updater = (props) => {

    const values = getValueProperties(props);
    const actions = getMethodProperties(props);

    const refInput = React.createRef();


    return (
        <Fragment>

            <input type={'text'}  ref={refInput}/>
            <input type={'button'} value={'Change Name'} onClick={(e) => {
                e.preventDefault();
                const val = refInput.current.value;
                actions.setName(val);
            }} />
        </Fragment>
    );
}

const ProfileUpdater = withProfileContext(_Updater);

// all presentational components binded to a context, 
// must be wrapped by the container matching that context,
// this level take care of it
export const ProfileTree = () => {
    // Notice that thanks to the combination of Redux + Context, there's no need
    // of passing manually each prop needed by each component
    // That benefit is more visible when we have a UI tree here of several levels and multiple components 
    return (
        <ProfileContainer>
            <ProfileList />
            <ProfileUpdater />
        </ProfileContainer>
    );
};