/*
* Action Message Component
* By: Hemanth Vasudevan [Hemanth.Vasudevan@sungard.com] 
*
* 
* 
*/


Action = function(portletIdentifier) {
    if( portletIdentifier != undefined && portletIdentifier != null && portletIdentifier != "") {
        this.portletIdentifier = portletIdentifier;
    }
    else {
        this.portletIdentifier = "";
    }
};

Action.prototype= {
	setActionMode: function(mode,params){
		var placeHolder=this.portletIdentifier+'modeHolder';
		
		if(mode.modeName != undefined && mode.modeName != null && mode.modeName != ""){
			var modemessage="<strong>&nbsp;"+mode.modeName+"&nbsp;</strong>";
			if(mode.modeRole != undefined && mode.modeRole != null && mode.modeRole != ""){
				modemessage=modemessage+"-&nbsp;"+mode.modeRole+"&nbsp;|&nbsp;";
			}
			else
			{
			modemessage=modemessage+"&nbsp;|&nbsp;";
			}
		}
		document.getElementById(placeHolder).innerHTML=modemessage;
	},
		
	setActionPath: function(params){	
		var placeHolder1=this.portletIdentifier+'actionPathHolder';
		var i=1;
		var path=params.actionPath[0]+"&nbsp;";
		
		while( params.actionPath[i] != undefined && params.actionPath[i] != null && params.actionPath[i] != "") {
     	 	path=path+"/&nbsp;"+params.actionPath[i]+"&nbsp;";
     	 	i++;
     	}
     	document.getElementById(placeHolder1).innerHTML=path;
    }
}; 
