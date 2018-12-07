import React from 'react';
import qs from 'qs';
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
			target: 'baidu'
		}
	}

	componentWillReceiveProps(nextProps){
		const { search, target, website } = this.props.params;

		if(search !== nextProps.params.search || 
			 target !== nextProps.params.target || 
			 website!== nextProps.params.website){
			this.setState({
				loading: true,
			});
			this.getData({
					...nextProps.params,
					pn: 0
				},
				(res) => {
				this.setState({
					data: res.result,
					loading: false
				});
			});
			this.setState({
				target: nextProps.params.target,
			});
		}
	}

	// getData = (word,pn,target,callback) => {
  getData = (data,callback) => {
		console.log(data);
		if(data.search !== ''){
			data.search = encodeURIComponent(data.search)
			const fakeDataUrl = `http://localhost:8000/search/?${qs.stringify(data)}`
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
		
    this.getData({
			...this.props.params,
			pn: 0
		},
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
    this.getData({
				...this.props.params,
				pn: sum
			},
			(res) => {
				data = data.concat(res.result);
				this.setState({
					data,
					loading: false,
				});
			}
		);
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