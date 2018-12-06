import React from 'react';
import { List, Spin } from 'antd';
import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';
import './InfiniteListExample.css';
//const fakeDataUrl = 'https://localhost:8000/search/?search=';
let sum = 0
class InfiniteListExample extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			loading: false,
			hasMore: true,
			word: props.word,
			target: 'baidu'
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.state.target === nextProps.target){
			this.setState({
				loading: true,
			});
		}
		this.getData(
			nextProps.word,
			0,
			nextProps.target,
			(res) => {
			this.setState({
				data: res.result,
				loading: false
			});
		});
		this.setState({
			word: nextProps.word,
			target: nextProps.target,
			
		});
	}

  getData = (word,pn,target,callback) => {
		if(word !== ''){
			const fakeDataUrl = 'http://localhost:8000/search/?search='+word+'&pn='+pn+'&target='+target;
			reqwest({
				url: fakeDataUrl,
				type: 'json',
				method: 'get',
				contentType: 'application/json',
				success: (res) => {
					callback(res);
				},
			});
		}
  }
  componentDidMount() {
		
    this.getData(
		this.state.word,
		0,
		this.state.target,
    (res) => {
      console.log(res);
      this.setState({
				data: res
      });
    });
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    sum += 10;
    this.getData(
		this.state.word,
		sum,
		this.state.target,
    (res) => {
      data = data.concat(res.result);
      this.setState({
        data,
        loading: false,
      });
    });
  }
  render() {
    return (
			<Spin spinning ={this.state.loading && this.state.hasMore}>
      <div className="demo-infinite-container">
					<InfiniteScroll
						initialLoad={false}
						pageStart={0}
						loadMore={this.handleInfiniteOnLoad}
						hasMore={!this.state.loading && this.state.hasMore}
						useWindow={false}
					>
						
						<List
								dataSource={this.state.data}
								bordered= {true}
								renderItem={item => (
								<List.Item key={item.id}>
										<List.Item.Meta
										title={<a href={item.url} target="_blank">{item.title}</a>}
										description={<p>{item.abs}<br/>{item.url}</p>}
										/>
								</List.Item>
								)}
						>
						</List>		
					</InfiniteScroll>
      </div>
			</Spin>
    );
  }
}

export default InfiniteListExample;