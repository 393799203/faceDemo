import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import classnames from 'classnames';
import ListView from 'components/listView';
import BaseComponent from 'core/baseComponent'
import Ajax from 'core/ajax';
import Util from 'core/util';
import Icon from 'components/icon'
import 'weui';
import weui from 'weui.js';

export default class AvatarList extends BaseComponent {
	state = {
		params: {
			"outlineType": 3
		},
		// ajaxUrl: "/api/trip/getMyOutlineList",
		isEnd: false,
		list: [],
		currentIndex: 1
	}

	constructor(props) {
		super(props);
		Util.setTitle("头像");
		this.onRefresh();
	}

	getList = () => {
		let params = Object.assign({}, this.state.params, { pageNum: this.state.currentIndex, pageSize: 10 });
		return Ajax.post(this.state.ajaxUrl, params, 1).then(data => {
			this.state.list = this.state.list.concat(data.data.list || []);
			this.state.isEnd = data.data.isEnd;
			this.state.currentIndex++;
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
		this.uploaderInit();
		document.addEventListener("reload", function (data) {
			window.location.reload();
		}, false);
	}

	uploaderInit = () => {
		let uploadCount = 0;
		weui.uploader('#uploader', {
			url: 'http://localhost:8081',
			auto: true,
			type: 'file',
			fileVal: 'fileVal',
			compress: {
				width: 1600,
				height: 1600,
				quality: .8
			},
			onBeforeQueued: function (files) {
				// `this` 是轮询到的文件, `files` 是所有文件

				if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
					weui.alert('请上传图片');
					return false; // 阻止文件添加
				}
				if (this.size > 10 * 1024 * 1024) {
					weui.alert('请上传不超过10M的图片');
					return false;
				}
				if (files.length > 5) { // 防止一下子选择过多文件
					weui.alert('最多只能上传5张图片，请重新选择');
					return false;
				}
				if (uploadCount + 1 > 5) {
					weui.alert('最多只能上传5张图片');
					return false;
				}

				++uploadCount;

				// return true; // 阻止默认行为，不插入预览图的框架
			},
			onQueued: function () {
				console.log(this);

				// console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
				// console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

				// this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
				// this.stop(); // 中断上传

				// return true; // 阻止默认行为，不显示预览图的图像
			},
			onBeforeSend: function (data, headers) {
				console.log(this, data, headers);
				// $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
				// $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

				// return false; // 阻止文件上传
			},
			onProgress: function (procent) {
				console.log(this, procent);
				// return true; // 阻止默认行为，不使用默认的进度显示
			},
			onSuccess: function (ret) {
				console.log(this, ret);
				// return true; // 阻止默认行为，不使用默认的成功态
			},
			onError: function (err) {
				console.log(this, err);
				// return true; // 阻止默认行为，不使用默认的失败态
			}
		});
	}

	render() {
		let params = this.state.params;
		let ajaxUrl = this.state.ajaxUrl;
		let list = this.state.list;
		return (
			<ListView className="weui-cells" onRefresh={this.onRefresh} onLoad={this.onLoad} isEnd={this.state.isEnd}>
				<div className="page__bd">
					<div className="weui-gallery" id="gallery" style={{ opacity: 0, display: 'none' }}>
						<span className="weui-gallery__img" id="galleryImg"></span>
						<div className="weui-gallery__opr">
							<a href="javascript:" className="weui-gallery__del">
								<i className="weui-icon-delete weui-icon_gallery-delete"></i>
							</a>
						</div>
					</div>
					<div className="weui-cells weui-cells_form" id="uploader">
						<div className="weui-cell  weui-cell_uploader" style={{ padding: '0.25rem' }}>
							<div className="weui-cell__bd">
								<div className="weui-uploader">
									<div className="weui-uploader__bd">
										<div className="weui-uploader__input-box">
											<input
												id="uploaderInput"
												className="weui-uploader__input"
												type="file"
												accept="image/*"
											/>
										</div>
										<ul className="weui-uploader__files" id="uploaderFiles">
											<li className="weui-uploader__file weui-uploader__file_status" >
												<div className="weui-uploader__file-content">
													<i className="weui-icon-warn"></i>
												</div>
											</li>
											<li className="weui-uploader__file weui-uploader__file_status" >
												<div className="weui-uploader__file-content">50%</div>
											</li>
											<li className="weui-uploader__file" >
												<img
													style={{ width: '100%', height: '100%' }}
													src="https://s5.mogucdn.com/mlcdn/c45406/191204_0a7ecc5bjif6g7k1d7iaj8kl0k0k8_400x400.jpg_999x999.v1c0.81.webp" alt="范范饭"
												/>
											</li>
											<li className="weui-uploader__file" >
												<img
													style={{ width: '100%', height: '100%' }}
													src="https://s5.mogucdn.com/mlcdn/c45406/191204_0a7ecc5bjif6g7k1d7iaj8kl0k0k8_400x400.jpg_999x999.v1c0.81.webp" alt="范范饭"
												/>
											</li>
										</ul>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ListView>
		)
	}
}