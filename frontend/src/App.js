import React, { Component } from 'react';
import { Input, Radio } from 'antd';
import { Layout } from 'antd';
import logo from './logo.svg';

import './App.css';
import InfiniteListExample from './InfiniteListExample';

const RadioGroup = Radio.Group;
const Search = Input.Search;
const { Header, Content } = Layout;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      target: 'baidu'
    };
  }

  handleChange = value => this.setState({ text: value });
  handleOptionChange = (e) => {
    this.setState({
      target: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header className="header">
            <img src={logo} className="App-logo" alt="logo"/>
          </Header>
          <br/>
          <Header className="header">
            <Search
              placeholder="输入搜索内容"
              enterButton="搜索"
              size="large"
              onSearch={this.handleChange}
            />
          </Header>
          <Header className='header silm'> 
            <RadioGroup onChange={this.handleOptionChange} value={this.state.target}>
              <Radio value={'baidu'}>百度搜索</Radio>
              <Radio value={'google'}>谷歌搜索</Radio>
            </RadioGroup>
          </Header>
          <Content className="content">
            <InfiniteListExample
              word = {this.state.text}
              target = {this.state.target}
            >
            </InfiniteListExample>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
