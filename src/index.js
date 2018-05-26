import dva from 'dva';
import './index.less';
import browserHistory from 'history/createBrowserHistory';
import { Component } from 'react';
import { is } from 'immutable';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

// 1. Initialize
const app = dva({
  history: browserHistory(),
});

Component.shouldComponentUpdate = (nextProps, nextState) => {
  return !(this.props === nextProps || is(this.props, nextProps)) ||
         !(this.state === nextState || is(this.state, nextState));
};

// 默认情况客户端会发送到相同主机名(域名)下的/graphql端点
const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

export default app;

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/demo').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
const App = app.start();

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
), document.querySelector('#root'));
