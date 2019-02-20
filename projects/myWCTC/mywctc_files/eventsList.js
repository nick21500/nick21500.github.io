//List of event that will be available in the application.

// luminisCommunityChange - Event which captures a change in the selected community.
//  params - communityId
var luminisCommunityChange = new Event();

//  luminisCategoryChange - Event whhich is triggered whenever there is a change in the selected community category.
//  params - categoryId, categoryName
var luminisCategoryChange = new Event();
//This event is triggered whenever a community is selected from the
//MyCommunity Portlet
var luminisMyCommunitySelectedEvent = new Event();
// This event is triggered whenever a Category is created or Edited.
// It passes categoryId, categoryName, action as JSON.
// The actions will be create: To create a Category , delete: To delete a Category , edit: To edit a Category.
var luminisCommunityCategoryEdit = new Event();
//This event is triggered to update the MyCommunity portlet whenever a user
//joins the community or creats a community
var updateMyCommunityPortletEvent = new Event();
//This event is triggered whenever a portlet is removed from the layout
var portletCloseEvent = new Event();
//This event is triggered whenever a portlet is added to the layout
var portletAddEvent = new Event();
//This event is triggered on creation of a new  community.
var luminisCreateCommunityEvent = new Event();
//This event is triggered after successfully updating community from community admin portlet.
var luminisCommunityUpdateEvent = new Event();

//The event is used whenever a change in the manage categories portlet.
var manageCategoryEvent = new Event();