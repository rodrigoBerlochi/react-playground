import React, {Component, createContext} from 'react';

let profile = {
    name: 'Dan',
    surname: 'Abramov',
    company: 'Facebook',
    changeCompany: () => {}
};

// mandatory step, always creating a context, defaultValue is optional
// if a component uses more than 1 context, it needs wrapping of more than 1 Provider/Consumer
// RULE each context has own Provider and Consumer
const myContext = createContext(profile);

class Card extends Component {
    // not mandatory but also a way to link a Class component
    // to a context: the STATIC prop contextType
    // by this way, you DONT NEED to use the Consumer
    static contextType = myContext;

    companyInput = React.createRef();

    render() {
        // context props aren't part of this.props. They are in this.context
        const {name, surname, changeCompany} = this.context;

        return (
            <div>
                {name && surname && this.props.children}
                {/* dirty code below, just for test */}
                <input type='text' ref={this.companyInput} />
                <button onClick={() => {
                    let v = this.companyInput.current.value;
                    changeCompany(v);
                }}>Change Company</button>
            </div>
        );
    }
}

const NameDisplayer = () => {
    /**
     * functional components do not have a contextType prop
     * so link to Context is done by the Consumer component wrapping content
     * it REQUIRES a function inside that gets the context as argument
     */ 
    return (
        <myContext.Consumer>
            {context => {
                return (<h1>{`${context.name} - ${context.surname}`}</h1>);
            }}
        </myContext.Consumer>
    );
}

const CompanyDisplayer = () => {
    return (
        <myContext.Consumer>
            {c => {
                return <h2>{c.company}</h2>
            }}
        </myContext.Consumer>
    );
}

export class Tree extends Component {
    // here I can skip using the Provider, since I set a defaultValue creating the context (that's important)

    // but if I use it and set a value, that value will OVERRIDE COMPLETELY the default value
    // if use a Provider, setting a value is a MUST
    constructor (props) {
        super(props);
        
        // let's define first the method to change a prop
        // we need it available when we create later the state
        this.changeCompany = (val) => {
           this.setState({company: val});
        }
        
        /**
         * Context is great to allow nested components to read data
         * However changing data from a component to the context is not so clean as in Redux
         * The method to change the context prop, should be included in the context object, which mixes data and routines
         * If it replace Redux at all, we miss debugging tools like ReduxDevTools, actions tracking, time travel, serialization of state (it has methods)
         * and the beauty of of the app history told through dispatched actions
         * Also, it requires mixing context with State in the parent component (the one with the provider), this way when we change the prop, we are
         * changing the state and it triggers a re-rendering. Without it, even if the value is changed, nothing is shown on the UI 
         */
        this.state = {
            name: 'Dan',
            surname: 'Abramov',
            company: 'Facebook, London',
            changeCompany: this.changeCompany
        };
    
    }
    
    render () {
        return (
            <myContext.Provider value={this.state}>
            {/* Here every component no matter how many levels it is nested, will access Context, without passing props manually */}
                <Card>
                    <NameDisplayer />
                    <CompanyDisplayer />
                </Card>
            </myContext.Provider>
        );
    }
}