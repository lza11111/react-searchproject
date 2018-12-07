import React, { Component } from 'react';
import { Input, Radio, Checkbox, Transfer } from 'antd';
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
      textTemp: '',
      target: 'baidu',
      webSiteStatus: false,
      website: '',
      websiteTemp: '',
      webSiteStatusTemp: false,
    };
  }

  handleWordChange = value => this.setState({ 
    text: value, 
    website: this.state.websiteTemp,
    webSiteStatus: this.state.webSiteStatusTemp
  });

  handleWebSiteStatusChange = e => this.setState({ webSiteStatusTemp: e.target.checked })

  handleWebSiteChange = e => this.setState({ websiteTemp: e.target.value })

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
            {/* <img src={logo} className="App-logo" alt="logo"/> */}
            <h3>广度优先文本挖掘爬虫系统</h3>
          </Header>
          <br/>
          <Header className="search">
            <Search
              placeholder="输入搜索内容"
              enterButton="搜索"
              size="large"
              onSearch={this.handleWordChange}
            />
          </Header>
          <Header className='options silm'> 
            <div className='website-group'>
              <Checkbox onChange={this.handleWebSiteStatusChange}>限定站点</Checkbox>
              <Input disabled={!this.state.webSiteStatusTemp} onChange={this.handleWebSiteChange} className="website-input" size="small" placeholder="example.com"/>
            </div>
            
          </Header>
          <Content className="content">
            <InfiniteListExample
              params = {{
                search: this.state.text,
                target: this.state.target,
                website: this.state.webSiteStatus ? this.state.website : ''
              }}
            >
            </InfiniteListExample>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
