import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	selectedFace: {},
	avatarList: [{
		id: "ssafdera",
		avatar: 'https://s5.mogucdn.com/mlcdn/c45406/191204_0a7ecc5bjif6g7k1d7iaj8kl0k0k8_400x400.jpg_999x999.v1c0.81.webp',
		name: '范范饭'
	}, {
		id: "ssafderx",
		avatar: 'https://s11.mogucdn.com/mlcdn/5abf39/181119_7fg90l58ihf2e95g9bbj86h04ifg3_400x400.jpg_999x999.v1c0.81.webp',
		name: 'Crystal美玲'
	}, {
		id: "ssafderd",
		avatar: 'https://s11.mogucdn.com/mlcdn/5abf39/181119_7fg90l58ihf2e95g9bbj86h04ifg3_400x400.jpg_999x999.v1c0.81.webp',
		name: 'Crystal美玲'
	}, {
		id: "ssafderg",
		avatar: 'https://s11.mogucdn.com/mlcdn/5abf39/181119_7fg90l58ihf2e95g9bbj86h04ifg3_400x400.jpg_999x999.v1c0.81.webp',
		name: 'Crystal美玲'
	}]
};

function handler(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_FACE_IN_AVATAR:
			{
				return Object.assign({}, state, {
					selectedFace: action.face
				})
			}
		case ActionTypes.CLEAR_FACE_IN_AVATAR:
			{
				return Object.assign({}, state, {
					selectedFace: {}
				})
			}
		default:
			return state;
	}
}

export default handler