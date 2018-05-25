import React, { Component } from 'react';

function handleComponentsCreator({
    connect,
    initState = {},
    isFetchAfterMount = true,
    isChangeUrl = false,
    afterFetch = ()=> {},
    afterCatch = ()=> {}
} = {}) {

    if(typeof connect !== 'function') {
        throw new Error('\n请传入connect函数!\nPlease give a connect function!');
    }

    function withHandle(mapStateToProps, WrappedComponent, actionType) {

        // ...and returns another component...
        class WithHandle extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    loading: false,
                    ...initState,
                };
            }

            componentDidMount() {
                if(isFetchAfterMount) {
                    this.fetchData();
                }
            }

            fetchData(payload = {}, type) {
                this.setState({loading: true});

                this.props.dispatch({
                    type: type || actionType,
                    payload: {
                        ...this.state,
                        ...payload
                    }
                });
            }

            setUrl(newParams, isReplaced) {
                const params = net.parseParams(this.props.location.search);
                const finalParams = { ...params, ...newParams };
    
                let url = `${this.props.location.pathname}?`;
    
                for(let key in finalParams) {
                    url += `${key}=${finalParams[key]}&`;
                }
    
                if(isReplaced) {
                    this.props.history.replace(url);
                } else {
                    this.props.history.push(url);
                }
                
            }

            handleAnythings(state, type) {
                if(isChangeUrl) {
                    this.setUrl(state);
                } else {
                    this.setState(state);

                    this.fetchData(state, type);
                }
                
            }

            render() {
                // ... and renders the wrapped component with the fresh data!
                // Notice that we pass through any additional props
                return <WrappedComponent
                        handleAnythings={(state, action)=> this.handleAnythings(state, action)}
                        fetchData={(state, action)=> this.fetchData(state, action)}
                        {...this.state}
                        {...this.props} />;
            }
        }

        WithHandle.displayName = `WithHandle(${getDisplayName(WrappedComponent)})`;

        return connect(mapStateToProps)(WithHandle);
    }

    return withHandle;

}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default handleComponentsCreator;
