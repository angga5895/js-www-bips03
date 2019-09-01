// This source contains global application states to be shared across applications
import React from 'react';

const stateTemplate = {
  vars: {},
};

// this actionTemplate will be copied to state as property 'actions'
// make sure to use ... (spread) notation to clone actionTemplate object, unless it will interfere for each
// Provider !

const actionTemplate = {
  init: function(circProvider, circState, actionDefs) {
    this.provider = circProvider;
    this.state = circState;
    this.actionDefs = {...actionDefs};
    // console.log('actionDefs init');
    // console.log(actionDefs);
  },

  __internalUpdateStateVars: function(newVars) {
    var newState = {vars: newVars};
    newState.actions = this;
    this.state = newState;
    // console.log('newState: ');
    // console.log(newState);
    this.provider.setState(newState);
  },

  sendAction: function(actionName, parameter) {
    var action = this.actionDefs[actionName];
    // console.log('sendAction executed');
    // console.log('actionDefs');
    // console.log(this.actionDefs);
    if (typeof(action) != 'function')
      throw new Error(`Action "${actionName}" is not defined`);
    var newVars = action.call(null, this.state.vars, parameter);
    // console.log('sendAction. newVars: ' + Object.keys(newVars).toString());
    if (newVars != undefined && newVars != null && newVars != this.state.vars) {
      this.__internalUpdateStateVars(newVars);
    }
  },

  updateVar: function(keyName, newValue) {
    if (this.state.vars[keyName] !== newValue) {
      var newVars = {...this.state.vars, [keyName]: newValue};
      this.__internalUpdateStateVars(newVars);
    }
  },

  updateVars: function(varSets) {
    var newVars = {...this.state.vars, ...varSets};
    this.__internalUpdateStateVars(newVars);
  }
}

const AppContext = React.createContext({});

class ContextProvider extends React.Component {
  constructor (props) {
    super(props);
    this.dataContext = props.context;
    this.state = {...stateTemplate, vars: props.vars, provider: this, actions: {...actionTemplate}};
    var actionDefs = props.actions;
    this.state.actions.init(this, this.state, actionDefs);
    //console.log('ContextProvider created');
  }

  sendAction(actionName, parameter) {
    //console.log('ContextProvider.sendAction called');
    this.state.actions.sendAction(actionName, parameter);
  }

  updateVar(keyName, newValue) {
    //console.log('ContextProvider.updateVar called');
    this.state.actions.updateVar(keyName, newValue);
  }

  updateVars(varSets) {
    //console.log('ContextProvider.updateVars called');
    this.state.actions.updateVars(varSets);
  }

  render() {
    var ThisProvider = this.dataContext.Provider;
    return (
      <ThisProvider value={this.state}>
        {this.props.children}
      </ThisProvider>
    );
  }
}

function areEqualShallow(a, b) {
  // copied from stackoverflow@Paul Draper
  // https://stackoverflow.com/questions/22266826/how-can-i-do-a-shallow-comparison-of-the-properties-of-two-objects-with-javascri/47532787
  var key;
  for(key in a) {

      if(!(key in b) || a[key] !== b[key]) {
          return false;
      }
  }
  for(key in b) {
      if(!(key in a) || a[key] !== b[key]) {
          return false;
      }
  }
  return true;
}

class ContextConsumerFilter extends React.Component {

  constructor (props) {
    super(props);
    this.mapper = typeof(props.mapper) == 'function' ? props.mapper : ((vars, actions, ownProps) => undefined);
    this.contentProps = this.mapper(props.vars, props.actions, props.ownProps);
    this.contentClass = props.contentClass;
    this.ownProps = props.ownProps;
  }

  shouldComponentUpdate(nextProps, nextState) {
    var newContentProps = this.mapper(nextProps.vars, nextProps.actions, this.props.ownProps);
    
    // console.log('ContextConsumerFilter.shouldComponentUpdate started');    
    // console.log('newContentProps');
    // console.log(newContentProps);
    // console.log('this.contentProps');
    // console.log(this.contentProps);

    var result = !areEqualShallow(newContentProps, this.contentProps);
    // console.log('ContextConsumerFilter.shouldComponentUpdate result: ' + (result ? 'yes' : 'no'));
    if (result) {
      this.contentProps = newContentProps;
    }
    return result;
  }

  render() {
    var ContentClass = this.contentClass;
    // console.log('ContextConsumerFilter.render() called');
    // console.log(this.props.contentChildren);
    return (
      <>
        <ContentClass {...this.contentProps} {...this.ownProps}>
          {this.props.contentChildren}
        </ContentClass>   
      </>
    )
  }
}

function ContextConnector(Context, mapF) {
  return (
    (ContentClass) => (props) => (
      <Context.Consumer>
          {
            (state) => (
              <ContextConsumerFilter 
                vars={state.vars}
                mapper={mapF} 
                actions={state.actions}
                contentClass={ContentClass}
                contentChildren={props.children}
                ownProps={props}
              />
            )
          }
      </Context.Consumer>
    )
  );
}

class AppContextProvider extends ContextProvider {
  constructor (props) {
    super(props);
    this.dataContext = AppContext;
  }
}

const AppContextConnector = (mapF) => ContextConnector(AppContext, mapF);

export {ContextProvider, ContextConnector, AppContextProvider, AppContextConnector};

