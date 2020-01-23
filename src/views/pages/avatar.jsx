import React, { Component } from 'react'
import { browserHistory, Link } from  'react-router'
import classnames from 'classnames';
import ListView from 'components/listView';
import BaseComponent from 'core/baseComponent'
import Ajax from 'core/ajax';
import Util from 'core/util';

export default class AvatarList extends BaseComponent {

	constructor(props){
		super(props);
		Util.setTitle("头像");
		// this.onRefresh();
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

	componentDidMount() {
		document.addEventListener("reload", function(data){
			window.location.reload();
		}, false);
	}

	render() {
		let { avatarList, selectedFace, actions } = this.props;
		return (
			<div className="avatarWrap">
				<ListView onRefresh={this.onRefresh} onLoad={ this.onLoad } isEnd={true}>
					<div className="avatar weui-uploader__input-box">
						<input id="uploaderInput" className="weui-uploader__input" type="file" accept="image/*" multiple="" />
					</div>
					<For each = "avatar" of = { avatarList } index = "index">
						<div className="avatar" key={avatar.id} onClick={ () => { actions.selectCurrentFace(avatar) }} >
							<img src={avatar.avatar} alt={avatar.name} />
						</div>
		            </For>
				</ListView>
				<div className={classnames("weui-gallery", {"gallery-show": !!selectedFace.avatar})}>
			        <span className="weui-gallery__img" style={{backgroundImage: `url(${selectedFace.avatar})`}}></span>
			        <div className="weui-gallery__opr">
			            <a href="javascript:" className="weui-gallery__del" onClick={() => { actions.clearCurrentFace() }}>
			                <i className="weui-icon-delete weui-icon_gallery-delete"></i>
			            </a>
			        </div>
			    </div>				
			</div>
		)
	}
}