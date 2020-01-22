import * as ActionTypes from '../constants/ActionTypes';

export function selectCurrentFace(faceId) {
	return (dispatch, getState) => {
		return dispatch({
			type: ActionTypes.SET_FACE,
			faceId
		})
	}
}