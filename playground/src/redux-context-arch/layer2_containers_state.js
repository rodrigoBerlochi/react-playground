/**
 * Container layer is responsible of articulating State's slices with specific Contexts
 */
import React, {createContext, Component} from 'react';
import {connect} from 'react-redux';
import {setCompany, setName, setSurname} from './actions';

/**
 * Create a specific context for the Profile domain
 * The global State would have several domains of information, 
 * probably each one represented by a reducer
 */
const ProfileContext = createContext();
/**
 * Creating the context outside of the class below, 
 * allows us to access the Consumer of it and export it 
 * individually, because nested components of this Container
 * will need the Consumer to access attributes of the Context
 * 
 * withProfileContext() is a HOC that reduces the boilerplate of wrapping
 * each child within a consumer
 * 
 * Our goal with this experiment, is to avoid props drilling from containers
 * to deep nested children, since component using this Consumer just need to access
 * this.context where ever they are to read all of the State attributes that are Properties of
 * the Container
 * 
 * CHALLENGE: from a performance view: "All consumers that are 
 * descendants of a Provider will re-render whenever the Provider’s value prop changes."
 */
export const withProfileContext = (Component) => {
    // remember to name every component in PascalCase
    return function WrapperComponent (props) {
        return (
            <ProfileContext.Consumer>
                {context => {
                    return <Component {...context} {...props} />
                }}
            </ProfileContext.Consumer>
        );
    }
};

/**
 * A container for that context is created
 * It will wrap all the UI tree regarding this domain (the profile) 
 * We export the connected component, result of using react-redux
 * This component has the ability of reading the State and Dispatching actions
 * And will delegate it to their children
 * 
 * We use a render children prop to give it total flexibility a decoupling regards its own tree
 */
class innerProfileContainer extends Component {

    render() {
        const {Provider} = ProfileContext;
        // this experiments passing dispatch() to the context
        // so children (or some inner level) can take care of defining
        // dispatching action methods. Doing all that in a container level, for long trees, 
        // could be overhelming and couple this layers with others
        // Remove children to use in Container and pass remaining props (includes dispatch) as context value
        const {children, ...restProps} = this.props;

        return (
            <Provider value={{...restProps}}>
                {children}
            </Provider>
        );
    }
}

/**
 * 
 * Select the slice of the State 
 * that represents the Domain of this
 * Container
 */
const mapState = (state) => ({
    name: state.profileReducer.name,
    surname: state.profileReducer.surname,
    company: state.profileReducer.company
});

/**
 * Use object shorthand approach
 * This way the Map is an object instead of a function
 * each property of it is an action creator
 * React-Redux will take care of wrapping them in Dispatch()
 * So actions are defined in a separate module, imported and passed here
 * Being them even Async actions
 * And without worrying of dispatching them
 */
const mapDispatch = {
    setName,
    setSurname,
    setCompany
};

// think about Dispatch. Define methods here or make it avail for nested? as context?
export const ProfileContainer = connect(mapState, mapDispatch)(innerProfileContainer);