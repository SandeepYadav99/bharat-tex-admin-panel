import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AuthReducer from "./Auth.reducer";
import User from "./User.reducer";
import DashboardReducer from "./Dashboard.reducer";
import AppSettingReducer from "./AppSettings.reducer";
import ProviderUser from "./ProviderUser.reducer";
import Services from "./Service.reducer";
import MasterListReducer from "./MasterList.reducer";
import AdminUserReducer from "./AdminUser.reducer";
import MemberListReducer from "./MemberList.reducer";
import CityAssocListReducer from "./CityAssocList.reducer";
import EventListReducer from "./EventList.reducer";
import PendingEventListReducer from "./PendingEventList.reducer";
import LeadMemberListReducer from "./LeadMemberList.reducer";
import PolicyListReducer from "./PolicyList.reducer";
import StateMemberReducer from "./StateMember.reducer";
import EventParticipantReducer from "./EventParticipant.reducer";
import EventOrganiserReducer from "./EventOrganiser.reducer";
import EventPollsReducer from "./EventPolls.reducer";
import EventOrganiserUserReducer from "./EventOrganiserUser.reducer";
import GalleryAlbumReducer from "./GalleryAlbum.reducer"
import EventScheduleReducer from "./EventSchedule.reducer";
import EventSponsorReducer from "./EventSponsor.reducer";
import EventSpeakerReducer from "./EventSpeaker.reducer";
import TypeListReducer from "./TypeList.reducer";
import EventBannerReducer from "./EventBanner.reducer";
import EventCityGuideReducer from "./EventCityGuide.reducer";
import CityGuideReducer from "./CityGuide.reducer";
import CityGuideContentReducer from "./CityGuideContent.reducer";
import EventCityContentReducer from "./EventCityContent.reducer";
import AppUserReducer from "./AppUser.reducer";
import InfoCenterReducer from "./InfoCenter.reducer";
import YoutubeStreemReducer from "./YoutubeStreem.reducer";
import UserCategoryReducer from "./UserCategory.reducer";
import UserListReducer from "./UserList.reducer";
import EventGalleryReducer from "./EventGallery.reducer";
import EventFeedReducer from "./EventFeed.reducer";
import NotificationReducer from "./Notification.reducer";
import ReportedUser from "./ReportedUser.reducer";
import ReportedUserReducer from "./ReportedUser.reducer";
import EventUserRquestReducer from "./EventUserRquest.reducer";
import ReportedPostReducer from "./ReportedPost.reducer";
import ReportedCommentReducer from "./ReportedComment.reducer";
import PollResult from "./PollResult.reducer";
import BusinessGreetingReducer from "./BusinessGreeting.reducer";
import KnowledgeCenter from './KnowledgeCenter.reducer';
import KnowledgeCenterStamp from './KnowledgeCenterStamp.reducer';
import ExhibitorReducer from "./Exhibitor.reducer";
import ProductCategoryReducer from "./ProductCategory.reducer";
import ProductGroupReducer from "./ProductGroup.reducer";
import TestimonialReducer from "./Testimonial.reducer";
import CategoryReducer from "./AddCategory.reducer";
import ExhibitorQueryReducer from "./ExhibitorQuery.reducer";
import CalendarReducer from "./CalendarCount.reducer";
import HallMasterReducer from "./HallMaster.reducer";

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  app_setting: AppSettingReducer,
  dashboard: DashboardReducer,
  user: User,
  auth: AuthReducer,
  provider_user: ProviderUser,
  services: Services,
  master_list:MasterListReducer,
  adminUser:AdminUserReducer,
  member_list:MemberListReducer,
  lead_member_list:LeadMemberListReducer,
  city_assoc_list:CityAssocListReducer,
  event_list:EventListReducer,
  pending_event_list:PendingEventListReducer,
  policyList:PolicyListReducer,
  state_member_list:StateMemberReducer,
  eventParticipant: EventParticipantReducer,
  eventPolls:EventPollsReducer,
  eventOrganiser: EventOrganiserReducer,
  eventOrganiserUser: EventOrganiserUserReducer,
  album_list:GalleryAlbumReducer,
  eventSchedule: EventScheduleReducer,
  event_sponsor:EventSponsorReducer,
  eventSpeaker: EventSpeakerReducer,
  event_sponsor_type:TypeListReducer,
  event_banner:EventBannerReducer,
  event_guide:EventCityGuideReducer,
  event_guide_content:EventCityContentReducer,
  cityGuide:CityGuideReducer,
  cityGuide_Content: CityGuideContentReducer,
  InfoCenter:InfoCenterReducer,
  YoutubeStreem:YoutubeStreemReducer,
  App_User:AppUserReducer,
  event_category:UserCategoryReducer,
  event_user:UserListReducer,
  event_gallery:EventGalleryReducer,
  event_feed:EventFeedReducer,
  notification:NotificationReducer,
  Reported_User:ReportedUserReducer,
  event_userRequest:EventUserRquestReducer,
  Reported_Post:ReportedPostReducer,
  Reported_Comment:ReportedCommentReducer,
  Poll:PollResult,
  Business_Greeting:BusinessGreetingReducer,
  Knowledge_Center:KnowledgeCenter,
  Knowledge_Center_Stamp:KnowledgeCenterStamp,
  // Product Category 2/01/2024
  productCategory:ProductCategoryReducer,
  productGroups:ProductGroupReducer,
  Exhibitor:ExhibitorReducer,
  testimonial:TestimonialReducer,
  category_reducer:CategoryReducer,
  exhibitor_query:ExhibitorQueryReducer,
  calendar_reducer:CalendarReducer,
  hallMaster:HallMasterReducer
});

export default rootReducer;
