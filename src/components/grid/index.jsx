import React, { Component } from 'react'
import { Link } from  'react-router';
import Icon from 'components/icon';

export default class Grid extends Component {
	static defaultProps = {
		gridDataList : [{"title":"报销","link":"/audit/expense","icon":"expense"}]
	}
	
	state = {}

	render() {
		let gridDataList = this.props.gridDataList;
		return (
			<div className="weui-grids">
				<For each = "item" of = { gridDataList } index = "index">
			        <Link className="weui-grid bg-white" to={item.link} key = {index}>
			            <div className="weui-grid__icon">
			            	<Icon name={item.icon}/>
			            </div>
			            <p className="weui-grid__label">{item.title}</p>
			        </Link>
		        </For>
		    </div>
		)
	}
}
