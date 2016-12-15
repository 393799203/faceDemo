import React, { Component } from 'react'
import { browserHistory, Link } from  'react-router'
import classnames from 'classnames';
import ListView from 'components/listView';
import BaseComponent from 'core/baseComponent'
import Ajax from 'core/ajax';
import Util from 'core/util';

export default class Application extends BaseComponent {
	state = {
		params: {
			"outlineType": 12
		},
		ajaxUrl: "/api/fund/transfer/getMyOutlineList",
		isEnd: false,
		list: [],
		currentIndex: 1
	}

	constructor(props){
		super(props);
		Util.setTitle("我的资金");
		this.onRefresh();
	}

	getList = () => {
		let params = Object.assign({}, this.state.params, { pageNum: this.state.currentIndex, pageSize: 10 });
		return Ajax.post(this.state.ajaxUrl, params, 1).then(data => {
			this.state.list = this.state.list.concat(data.data.list || []);
			this.state.isEnd = data.data.isEnd;
			this.state.currentIndex ++;
			this.setState(this.state);
		}, err => {
			this.state.isEnd = true;
			this.setState(this.state);
			setTimeout(() => {
				Util.popWindow('/');
			}, 2000);
		});
	}

	onRefresh = () => {
		this.state.list = [];
		this.state.currentIndex = 1;
		return this.getList(this.state.currentIndex);
	}

	onLoad = () => {
		return this.getList(this.state.currentIndex); 
	}

	render() {
		let params = this.state.params;
		let ajaxUrl = this.state.ajaxUrl;
		let list = this.state.list;
		return (
			<ListView className="weui-cells" onRefresh={this.onRefresh} onLoad={ this.onLoad } isEnd={this.state.isEnd}>
				<For each = "item" of = { list } index = "index">
					<div className={ classnames("weui-form-preview", {"m-b-n": index == list.length - 1 })} key = {index}>
			            <div className="weui-form-preview__hd">
			                <div className="weui-form-preview__item">
			                    <label className="weui-form-preview__label">申请金额</label>
			                    <em className="weui-form-preview__value">¥{Util.money(item.transferAmount)}</em>
			                </div>
			            </div>
			            <div className="weui-form-preview__bd">
			                <div className="weui-form-preview__item">
			                    <label className="weui-form-preview__label">申请人</label>
			                    <span className="weui-form-preview__value">{ item.applyNickname }</span>
			                </div>
			                <div className="weui-form-preview__item">
			                    <label className="weui-form-preview__label">申请类型</label>
			                    <span className="weui-form-preview__value">{item.transferTypeDesc}</span>
			                </div>
			                <div className="weui-form-preview__item">
			                    <label className="weui-form-preview__label">申请公司</label>
			                    <span className="weui-form-preview__value">{item.companyName}</span>
			                </div>
			            </div>
			            <div className="weui-form-preview__ft">
			            <If condition={item.viewerOperateItems.indexOf(21)!=-1}>
			                <Link className="weui-form-preview__btn weui-form-preview__btn_primary pushWindow" to={{pathname: `/fund/audit/${item.id}` , query: { "updated": item.updated}}}>审核</Link>
			            </If>
			            <If condition={item.viewerOperateItems.indexOf(10)!=-1}>
			                <Link className="weui-form-preview__btn weui-form-preview__btn_primary pushWindow" to={{pathname: `/fund/detail/${item.id}` , query: { "updated": item.updated}}}>查看</Link>
			            </If>
			            </div>
			        </div>
	            </For>
			</ListView>
		)
	}
}