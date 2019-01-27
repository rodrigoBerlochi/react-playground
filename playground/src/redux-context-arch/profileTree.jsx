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
const ProfileForm = (props) => {

    const propsValues = getValueProperties(props);
    const actions = getMethodProperties(props);


    // below we see that State is modified strictly in a Redux way
    // without passing for the Context
    // From React: "Context is designed to share data that can be considered “global” 
    // for a tree of React components, such as the current authenticated user, theme, 
    // or preferred language."
    // Currently I don't like the idea of components that also UPDATE properties of the Context
    // because that mean having several "states" in the app, in other words, missing the single source of truth
    // the global state and each one of the severals contexts we can have, could diverge, and that'd make
    // debugging and developing more complex. And at some point, a nightmare. 
    // I prefer keeping Redux doing what it is really good to do, and use Context to solve props drilling and
    // all those problems regarding passing values in deep trees of components

    return (
        <form>
        {propsValues.map((item) => {
            return (
                <Fragment key={item[0]}>
                    <input type={'text'} placeholder={'Change ' + item[0]} onChange={(e) => {
                        const nextVal = e.currentTarget.value;

                        switch(item[0]) {
                            case 'name':
                                actions.setName(nextVal);
                            break;
                            case 'surname':
                                actions.setSurname(nextVal);
                            break;
                            case 'company':
                                actions.setCompany(nextVal);
                            break;
                            default:
                                // nothig 
                        }
                    }}/>
                </Fragment>
            );
        })}
        </form>
    );
}

const ProfileFormBinded = withProfileContext(ProfileForm);

/**
 * 
 * This component just shows like we can add more and more
 * nesting levels without the need of passing down props for children
 * nor the need of connecting nested levels to Redux 
 */
const VisFrame = ({children}) => {
    const styles = {
        border: '1px solid lightblue',
        borderRadius: 5,
        backgroundColor: 'lightblue',
        margin: 10
    };
    return (
        <div style={styles}>
            {children}
        </div>
    );
};

// all presentational components binded to a context, 
// must be wrapped by the container matching that context,
// this level take care of it
export const ProfileTree = () => {
    // Notice that thanks to the combination of Redux + Context, there's no need
    // of passing manually each prop needed by each component
    // That benefit is more visible when we have a UI tree here of several levels and multiple components 
    return (
        <ProfileContainer>
            <VisFrame>
                <ProfileList />
                <ProfileFormBinded />
            </VisFrame>
        </ProfileContainer>
    );
};