import {
	combineReducers
} from 'redux';

import layout from 'reducers/layout';
import video from 'reducers/video';
import videoDetail from 'reducers/videoDetail';
import avatar from 'reducers/avatar';
import opus from 'reducers/opus';

export default combineReducers({
	layout,
	video,
	videoDetail,
	avatar,
	opus,
});