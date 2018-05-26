import React, { Component } from 'react';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function handleComponentsCreator({
    /** redux connect函数 */
    connect,
    /** 初始state */
    initState = {},
    /** 是否在组件Mount完成后立刻获取数据 */
    isFetchAfterMount = true,
    /** 获取数据后的回调 */
    afterFetch = ()=> {},
    /** 获取数据出错回调 */
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

            UNSAFE_componentWillUpdate(nextProps) {
                if(nextProps.location !== this.props.location) {
                    const { state } = this.props.location;

                    this.setState(state);
                    this.fetchData(state);
                }
            }

            fetchData(payload = {}, type = '') {
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
                if(isReplaced) {
                    this.props.history.replace({
                        path: this.props.location.pathname,
                        state: newParams,
                    });
                } else {
                    this.props.history.push({
                        path: this.props.location.pathname,
                        state: newParams,
                    });
                }
                
            }

            handleAnythings(state, type) {
                this.setUrl(state);
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

export default handleComponentsCreator;
