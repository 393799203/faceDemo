import React, { Component } from 'react'
import { browserHistory, Link } from  'react-router'
import classnames from 'classnames';
import ListView from 'components/listView';
import Icon from 'components/icon'
import BaseComponent from 'core/baseComponent'
import Ajax from 'core/ajax';
import Util from 'core/util';

export default class VideoList extends BaseComponent {

	constructor(props){
		super(props);
		Util.setTitle("视频详情");
	}

	componentDidMount() {

	}

	componentWillUnmount() {
	 
	}

	render() {
		console.log(this.props);
		let { location, avatarList, selectedFace, actions } = this.props;
		return (
			<div className="pageWrap">
				<video id="player" controls preload="auto" poster={location.query.background} style={{'background': '#000'}}>
					<source src={location.query.source} type="video/mp4"></source>
				</video>
				<div className="weui-cells__title">选择要替换的头像</div>
				<div className="weui-flex avatar-list">
					<For each="avatar" of={avatarList}>
						<div className="avatar-item" key={avatar.id}>
							<div className="avatar" onClick={() => { actions.selectCurrentFace(avatar) }}>
								<img src={avatar.avatar} alt={avatar.name} />
							</div>
							<If condition={selectedFace.id == avatar.id}>
								<Icon name="success"/>
							</If>
						</div>
					</For>
				</div>
				<a href="javascript:;" className="weui-btn weui-btn_primary faceBtn">启动换脸</a>
			</div>
		)
	}

}