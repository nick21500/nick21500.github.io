// global variables that are used in the Mail and Calendar portlets
// and any future portlets using the Luminis Integration Service architecture
var externalSystemCookiePrefix = "externalLuminisApp_";
var externalAppLaunchClassPrefix = "externalAppLaunch_";

var luminisSignOutUrl = "";

/**
 * Creates a javascript cookie for an application based on the window name.
 * Called by the Mail and Calendar portlets whenever a user launches the
 * external application (Google).
 * 
 * @param appWindowName - window name that is assigned to the external application 
 * browser window by the portlet
 * @return
 */
function createCookieForExternalApp(appWindowName)
{
    var cookieName = externalSystemCookiePrefix + appWindowName;
    jQuery.cookies.set(cookieName, "true");
}

/**
 * Delete the javascript cookie for the external application.
 * 
 * @param appWindowName - window name that is assigned to the external application 
 * browser window by the portlet
 * @return
 */
function deleteCookieForExternalApp(appWindowName)
{
    var cookieName = externalSystemCookiePrefix + appWindowName;
    jQuery.cookies.del(cookieName);
}

/**
 * Check to see if a cookie exists for a specific external application
 * based on the application window name.
 * 
 * @param appWindowName - window name that is assigned to the external application 
 * browser window by the portlet
 * @return true if the cookie exists
 */
function checkExternalAppCookie(appWindowName)
{
    var cookieName = externalSystemCookiePrefix + appWindowName;
    if ( jQuery.cookies.get(cookieName) )
        return true;
    else
        return false;
}

/**
 * Check to see if at least one external application cookie exists in the current
 * session.
 * 
 * @return true if at least one cookie exists
 */
function checkAllExternalAppCookies()
{
    // if there is at least one external app cookie, return true
    if ( document.cookie.indexOf(externalSystemCookiePrefix) != -1 )
        return true;
    else
        return false;
}

/**
 * Wrapper function for the Liferay sign out button. If current user session
 * has launched any external application (Google calendar, etc), this handles
 * logging out of those applications. If user has not launched any applications
 * then simply redirects to the Liferay sign out URL.
 *  
 * @param luminisSignOutUrl - url for the Liferay sign out process
 * @return
 */
function luminisLogout(luminisSignOutUrl)
{
    this.luminisSignOutUrl = luminisSignOutUrl;
  
    // start the logout chain with the GCF open connections
    handleAppsSSOdThroughGCF(handleAppsSSOdThroughSAML);
}

function handleAppsSSOdThroughGCF(chainedLogoutFunc)
{
    var urlString = "/luminis/gcf/list/active";
    var options = 
    {
        url: urlString,
        type: "GET",
        dataType: "json",
        async: true,
        success: function(data)
        {
            if (data.gcfLogout && data.gcfLogout.appToLogout && data.gcfLogout.appToLogout.length > 0)
            {
                // there are GCF Connector sessions that need to be logged out
                // for this user create the modal popup
                var theModalDiv = document.createElement("div");
                theModalDiv.id = "gcfLogoutExternalAppsDiv";

                // create title div for the popup
                var theModalDivTitle = document.createElement("div");
                theModalDivTitle.id = "gcfLogoutExternalAppsTitle";
                theModalDivTitle.innerHTML = data.gcfLogout.header;

                // create the content div for the popup
                var theModalDivContent = document.createElement("div");
                theModalDivContent.id = "gcfLogoutExternalAppsContent";

                jQuery("#wrapper").append(theModalDiv);
                jQuery("#gcfLogoutExternalAppsDiv").append(theModalDivTitle);
                jQuery("#gcfLogoutExternalAppsDiv").append(theModalDivContent);

                jQuery("#gcfLogoutExternalAppsDiv").modal();

                logoutGCFApps(data.gcfLogout.appToLogout, data.gcfLogout.done);

                // give the user a chance to read the popup before going to the
                // next function in the chain
                setTimeout(chainedLogoutFunc, 3000);
            }
            else
            {
                chainedLogoutFunc();
            }
        },
        error: function(data)
        {
            chainedLogoutFunc(); 
        }    
    };            
    jQuery.ajax(options);
}

function logoutGCFApps(appsToLogout, doneStr)
{
    if ( appsToLogout.length )
    {
        for (var i=0; i<appsToLogout.length; i++)
        {
            logoutGCFApp(appsToLogout[i].connectorId, appsToLogout[i].logoutString, doneStr);
        }
    }
    else
    {
        logoutGCFApp(appsToLogout.connectorId, appsToLogout.logoutString, doneStr);
    }
}

function logoutGCFApp(connectorId, loggingOutString, doneStr)
{                
    var paragraph = document.createElement("p");
    paragraph.innerHTML = loggingOutString;
    jQuery("#gcfLogoutExternalAppsContent").append(paragraph);
    
    var urlString = "/luminis/gcf/" + connectorId + "/silentlogout";
    var options = 
    {
        url: urlString,
        type: "POST",
        dataType: "json",
        async: true,
        success: function(data)
        {
          paragraph.innerHTML = loggingOutString + "..." + doneStr;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {
          paragraph.innerHTML = loggingOutString + "..." + doneStr;
        } 
    };            
    jQuery.ajax(options);
}



function handleAppsSSOdThroughSAML()
{
    // The following is specific to Google SAML SSO to either Mail or Calendar app    
    if ( checkAllExternalAppCookies() )
    {
        // if there's at least one cookie, then we need to handle the session logout
        // if not, then don't bother sending a request to the server
        // liferay sign out will be handled in the callbacks of the ajax request
        logoutExternalApps();
    }
    else
    {
        invokeLuminisSignOut();
    }
}

/**
 * Calls a webservice to get a list of applications enabled for current user
 * for each application returned, removes the cookie and opens the logout URL.
 * Following processing (success or fail), redirects to the Liferay sign out URL.
 *
 * @return
 */
function logoutExternalApps() 
{
    var urlString = "/luminis/luminisService/integration/service/admin/getWindowLaunchDataForApps";
    var options = 
    {
        url: urlString,
        type: "GET",
        dataType: "json",
        success: function(data)
        {
           if(data.AppLaunchDataList && data.AppLaunchDataList.dataList)
           {
                var dataList = data.AppLaunchDataList.dataList;
                if ( dataList.length )
                {
                    jQuery.each(dataList, function(i, theData){
                        if ( checkExternalAppCookie(theData.windowName) )
                        {
                            window.open(theData.logoutUrl, theData.windowName);
                            deleteCookieForExternalApp(theData.windowName);
                        }
                    });
                }
                else
                {
                    if ( checkExternalAppCookie(dataList.windowName) )
                    {
                        window.open(dataList.logoutUrl, dataList.windowName);
                        deleteCookieForExternalApp(dataList.windowName);
                    }
                }
           }
           invokeLuminisSignOut();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {
            //TODO: the axaj call failed... should the user be notified?
            invokeLuminisSignOut();
        }
    };            
    jQuery.ajax(options);
}



function invokeLuminisSignOut()
{
    // simply redirect to the liferay sign out
    window.location.href = unescape(this.luminisSignOutUrl);
}



/**
 * Assign an event handler to all html elements with a classname
 * based on the var externalAppLaunchClassPrefix and the appWindowName.
 * Uses jQuery to bind an onclick event handler to each element that will
 * create a javascript cookie for the application. Uses the jQuery
 * event handling namespacing to prevent conflicting with any other
 * click events on these elements.
 * 
 * Called by the Mail and Calendar portlets each time the data is refreshed.
 * In the Mail and Calendar portlets, any element that launches the external
 * application should be assigned the correct classname 
 * (externalAppLaunchClassPrefix + appWindowName) so that the cookie
 * will be created when the app is launched, and thus the app logout can be handled
 * correctly.
 * 
 * @param appWindowName
 * @return
 */
function addLogoutHandlerToExternalAppLinks(appWindowName)
{
    jQuery("." + externalAppLaunchClassPrefix + appWindowName).each(function(intIndex){
        jQuery(this).unbind("click." + appWindowName + ".applogout");
        jQuery(this).bind("click." + appWindowName + ".applogout", function(){
            createCookieForExternalApp(appWindowName);
        });
    });
}
 
 
/**
 * Called by the Tools->Calendar link in the main menu for Luminis
 * @return
 */
function launchCalendar()
{
    launchApplication("/luminis/luminisService/calendarServices/calendar/getCalendarAppLaunchData"); 
}

/**
* Called by the Tools->Email link in the main menu for Luminis
* @return
*/
function launchEmail()
{
   launchApplication("/luminis/luminisService/mailAccountServices/mailAccount/getMailAppLaunchData");
}

function launchApplication(urlString)
{
   var options = 
   {
       url: urlString,
       type: "GET",
       dataType: "json",
       success: function(data)
       {
           appWindowName = data.AppWindowLaunchData.windowName; 
           appLaunchUrl = data.AppWindowLaunchData.launchUrl;

           // create the appropriate cookie so logout will complete
           createCookieForExternalApp(appWindowName);
           window.open(appLaunchUrl, appWindowName);
       }
   };            
   jQuery.ajax(options);
}
