//'^[a-zA-Z0-9 \'|#\*\%\&\\_\\n\\r:;(@)/?.,\$\-]+$';
var regExpAlphaNumeric = '^[a-zA-Z0-9 \'|#=+^>\*\%\&\\_\\n\\r:;(@)/?.,\$\-]+$';
var regExpAlphaNumerics = '^[a-zA-Z0-9 \'|#=+^<>\*\%\&\\_\\n\\r:!;(@)/?.,\$\-]+$';
var regExpAlphabet = '^[a-zA-Z]+$';
var regExpNumeric = '^[0-9]+$';
var myRegxp = /^http:\/\/|https:\/\/|http:\\\\|https:\\\\/;
var message = "can have only a-z, A-Z, 0-9, ', *, |, #,^,>,=, %, &, _, \\n, \\r, :, ;, (, @, ), ?, ., $, -,+, space and ,";

//The following Javascript function will perform a trim of a string.
function TrimString(sInString) {
   sInString = sInString.toString().replace( /^\s+/g, "" );// strip leading
   return sInString.replace( /\s+$/g, "" );// strip trailing
}

//Returns true if matches the pattern else false
function ValidateValue(strValue, strMatchPattern) {
      var objRegExp = new RegExp(strMatchPattern);
      return objRegExp.test(strValue);
      }
     
//Currently this will only replace '<' with '&lt;' and '>' with '&gt;' 
function text2Html(s)
{
    s = s.toString();
	var modifiedString = s.replace(/</g,'&lt;');
    modifiedString = modifiedString.replace(/>/g,'&gt;');
    return modifiedString;
}

function text2HtmlWithAscii(s)
{
	s = s.toString();
	var modifiedString = s.replace(/&/g,'&amp;');
	modifiedString = modifiedString.replace(/</g,'&lt;');
    modifiedString = modifiedString.replace(/>/g,'&gt;');
        
	modifiedString = modifiedString.replace(/&#/g,'&amp;#');
    modifiedString = modifiedString.replace(/"/g,'&quot;');
    return modifiedString;
}

function Html2textWithAscii(s)
{
	s = s.toString();
	var modifiedString = s.replace(/&lt;/g,'<');
    modifiedString = modifiedString.replace(/&gt;/g,'>');
    modifiedString = modifiedString.replace(/&amp;/g,'&');
    modifiedString = modifiedString.replace(/&quot;/g,'"');
    return modifiedString;
}

//sort function - ascending (case-insensitive)
function sortFuncAsc(record1, record2) {
    var value1 = record1.optText.toLowerCase();
    var value2 = record2.optText.toLowerCase();
    if (value1 > value2) return(1);
    if (value1 < value2) return(-1);
    return(0);
}

//sort function - descending (case-insensitive)
function sortFuncDesc(record1, record2) {
    var value1 = record1.optText.toLowerCase();
    var value2 = record2.optText.toLowerCase();
    if (value1 > value2) return(-1);
    if (value1 < value2) return(1);
    return(0);
}

function sortSelect(selectToSort, ascendingOrder) {
    if(arguments.length == 1) 
    	ascendingOrder = true; // default to ascending sort

    var loop=0;
    // copy options into an array
    var myOptions = [];
    for (loop=0; loop<selectToSort.options.length; loop++) {
        myOptions[loop] = { optText:selectToSort.options[loop].text, optValue:selectToSort.options[loop].value };
    }

    // sort array
    if (ascendingOrder) {
        myOptions.sort(sortFuncAsc);
    } else {
        myOptions.sort(sortFuncDesc);
    }

    // copy sorted options from array back to select box
    selectToSort.options.length = 0;
    for (loop=0; loop<myOptions.length; loop++) {
        var optObj = document.createElement('option');
        optObj.text = myOptions[loop].optText;
        optObj.value = myOptions[loop].optValue;
        selectToSort.options.add(optObj);
    }
}

function moveSelectOptions(fromId, toId)
{
    var oSelect = document.getElementById( fromId );
    for (var iCount=0; oSelect.options[iCount]; iCount++) 
    {
        if (oSelect.options[iCount].selected == true) 
        {
            var selectedOption = oSelect.options[ iCount ];
            var theOpt = new Option( selectedOption.text, selectedOption.value, false, false );
            document.getElementById( toId ).options[document.getElementById( toId ).options.length] = theOpt;
            oSelect.options[ iCount ] = null;
            iCount = -1;
        }
    }
    
    sortSelect(document.getElementById( toId ), true);
}

function handleSpCharsForURLEncoding(s)
{
	s = s.toString();
	var modifiedString = s.replace(/\//g,'-slash-');
	modifiedString = modifiedString.replace(/#/g,'-hash-');
    modifiedString = modifiedString.replace(/,/g,'-comma-'); 
    modifiedString = modifiedString.replace(/\?/g,'-qmark-'); 
    modifiedString = modifiedString.replace(/:/g,'-colon-'); 
    modifiedString = modifiedString.replace(/@/g,'-attherate-'); 
    modifiedString = modifiedString.replace(/&/g,'-and-'); 
    modifiedString = modifiedString.replace(/=/g,'-equalto-'); 
    modifiedString = modifiedString.replace(/\+/g,'-plus-'); 
    modifiedString = modifiedString.replace(/\\\$/g,'-dollar-');
    modifiedString = modifiedString.replace(/%/g,'-cent-'); 
    modifiedString = modifiedString.replace(/;/g,'-semicolon-'); 
    modifiedString = modifiedString.replace(/\\/g,'-backslash-');
 
 	return modifiedString;
}

function insertUrlTimeStamp(dataUrl) {
	if(dataUrl != null && dataUrl.indexOf("?") != -1){
		dataUrl += '&urlTime='+new Date().getTime();
	} else {
		dataUrl += '?urlTime='+new Date().getTime();
	}
	return dataUrl;
}

function luminis_showLoadingImage(divId) {
	
	var loadingImage = 
		"<table border='0' width='100%' height='100%'>" +
			"<tr>" +
				"<td align='center' valign='middle'>" +
					"<img src='/cps/images/documents/loadingAnimation.gif'/>" +
				"</td>" +
			"</tr>" +
		"</table>";
		
		jQuery('#'+divId).html(loadingImage);
}

/* ENABLE the button element for the given id */
function luminis_enableButton(id) {
    jQuery('#'+id).attr('disabled', false);
    jQuery('#'+id).removeClass("button-disable");
}

/* DISABLE the button element for the given id */
function luminis_disableButton(id) {
    jQuery('#'+id).attr('disabled', true);
    jQuery('#'+id).addClass("button-disable");
}

/* SHOW the DOM element for the given id */
function luminis_showElement(eleId) {
    jQuery('#'+eleId).css('display','');
}

/* HIDE the DOM element for the given id */
function luminis_hideElement(eleId) {
    jQuery('#'+eleId).css('display','none');
}

function luminis_enableDiv(divId) {
	jQuery('#'+divId).css('display','');
}

function luminis_disableDiv(divId) {
	jQuery('#'+divId).css('display','none');
}

/* Fixes min-width support for IE 7. Use it sparingly. */
function luminis_fixMinWidthForIE() {
	try {
		if(!document.body.currentStyle){
			return;
		} //IE only
	} catch(e) {
	   return;
	}
	
	var elems = document.getElementsByTagName("*");
	for(e = 0; e < elems.length; e++) {
		var eCurStyle = elems[e].currentStyle;
	    var l_minWidth = (eCurStyle.minWidth) 
	    			   ? eCurStyle.minWidth 
	    			   : eCurStyle.getAttribute("min-width"); //IE7 : IE6
	    if(l_minWidth && l_minWidth != 'auto') {
	    	var shim = document.createElement("DIV");
	        shim.style.cssText = 'margin:0 !important; padding:0 !important; border:0 !important; line-height:0 !important; height:0 !important; BACKGROUND:RED;';
	        shim.style.width = l_minWidth;
	        shim.appendChild(document.createElement("span"));
	        if(elems[e].canHaveChildren) {
	        	elems[e].appendChild(shim);
	        } else {
	            //??
	        }
	   }
	}
}