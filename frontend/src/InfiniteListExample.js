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
			word: props.word
		}
	}

	componentWillReceiveProps(nextProps){
		this.getData(
			nextProps.word,
			0,
			(res) => {
			this.setState({
				data: res.result,
			});
		});
		this.setState({
			word: nextProps.word
		});
	}

  getData = (word,pn,callback) => {
		if(word !== ''){
			const fakeDataUrl = 'http://localhost:8000/search/?search='+word+'&pn='+pn;
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
    (res) => {
      console.log(res);
      this.setState({
        data: res.result,
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