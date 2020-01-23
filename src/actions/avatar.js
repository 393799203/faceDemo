import * as ActionTypes from '../constants/ActionTypes';

export function selectCurrentFace(face) {
	return (dispatch, getState) => {
		return dispatch({
			type: ActionTypes.SET_FACE_IN_AVATAR,
			face
		})
	}
}

export function clearCurrentFace() {
	return (dispatch, getState) => {
		return dispatch({
			type: ActionTypes.CLEAR_FACE_IN_AVATAR,
		})
	}
}