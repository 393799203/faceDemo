import React from 'react';
import {
  Route,
  IndexRoute,
  IndexRedirect,
  Redirect
} from 'react-router';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';

/* ************* smart components regist start... ***************** */
/* action */
import * as layoutAction from 'actions/layout';
import * as videoAction from 'actions/video';
import * as videoDetailAction from 'actions/videoDetail';
import * as avatarAction from 'actions/avatar';
import * as opusAction from 'actions/opus';
// import * as travelAuditListAction from 'actions/auditList';
// import * as travelAuditedListAction from 'actions/auditedList';
// import * as travelMyListAction from 'actions/myList';
// import * as travelDetailAuditAction from 'actions/detailAudit';

/* components */
import LayoutView from 'views/layout/Layout';
import VideoView from 'views/pages/video';
import VideoDetailView from 'views/pages/videoDetail';
import AvatarView from 'views/pages/avatar';
import OpusView from 'views/pages/opus';

// import TravelApplyView from 'views/pages/apply'
// import TravelAuditListView from 'views/pages/auditList'
// import TravelAuditedListView from 'views/pages/auditedList'
// import TravelMyListView from 'views/pages/myList'
// import TravelDetailAuditView from 'views/pages/detailAudit';

var connectRedux = function(component, model = [], actions = null) {
  return connect(
    (state) => {
      let needState = {};
      if (model.length) {
        model.map((item) => {
          Object.assign(needState, state[item]);
        })
      } else {
        needState = state;
      }
      return needState;
    },
    actions ? (dispatch) => {
      return {
        actions: bindActionCreators(actions, dispatch)
      }
    } : null
  )(component);
}

let Layout = connectRedux(LayoutView, ['layout'], layoutAction);
let Video = connectRedux(VideoView, ['video'], videoAction);
let VideoDetail = connectRedux(VideoDetailView, ['videoDetail'], videoDetailAction);
let Avatar = connectRedux(AvatarView, ['avatar'], avatarAction);
let Opus = connectRedux(OpusView, ['opus'], opusAction);

// let TravelApply = connectRedux(TravelApplyView, ['travelApply'], travelApplyAction)
// let TravelAuditList = connectRedux(TravelAuditListView, ['travelAuditList'], travelAuditListAction)
// let TravelAuditedList = connectRedux(TravelAuditedListView, ['travelAuditedList'], travelAuditedListAction)
// let TravelMyList = connectRedux(TravelMyListView, ['travelMyList'], travelMyListAction)
// let TravelDetailAudit = connectRedux(TravelDetailAuditView, ['travelDetailAudit'], travelDetailAuditAction)

/* ************* smart components regist end... ******************* */
export default (
  <Route path="/">
    <Route component={Layout}>
      <IndexRedirect to="/opus"/>
      <Route path="video" component={ Video } />
      <Route path="avatar" component={ Avatar } />
      <Route path="opus" component={ Opus } />
      <Route path="detail/:id" component={ VideoDetail } />
      <Route path="opus/:id" component={ Opus } />
      <Redirect from="*" to="/opus" />
    </Route>
  </Route>
);