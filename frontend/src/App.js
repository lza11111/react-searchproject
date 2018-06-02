import React, { Component } from 'react';
import { Input } from 'antd';
import { Layout } from 'antd';
import logo from './logo.svg';

import './App.css';
import InfiniteListExample from './InfiniteListExample';

const Search = Input.Search
const { Header, Content } = Layout;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
    };
  }

  handleChange = value => this.setState({ text: value });

  render() {
    return (
      <div>
        <Layout>
          <Header className="header">
            <img src={logo} className="App-logo" alt="logo"/>
          </Header>
          <Header className="header">
            <Search
              placeholder="输入搜索内容"
              enterButton="搜索"
              size="large"
              onSearch={this.handleChange}
            />
          </Header>
          <Content className="content">
            <InfiniteListExample
              word = {this.state.text}
            >

            </InfiniteListExample>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
