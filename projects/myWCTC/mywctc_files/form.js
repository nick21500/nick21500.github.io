    /* ui/form.validation.js */

    /* Contains common validation stuff, to be used across all JSP's */

    

    /* This is a shared variable for proper error placement. */ 

    var node = "";

    

    /* Finds the nearest node to the inputElement for the given 'nodeType'. */

    function closest(inputElement, nodeType) {



        var cur = inputElement;

        while(cur && cur.ownerDocument ) {

            if(jQuery(cur).is(nodeType))

                return cur;

            cur = cur.parentNode;

        }

    }

    /*  Add error highlighting for the given inputElement

     *    called from 'setDefaults() function. */

    function highlight(inputElement, errorStyleClass) {
        if(jQuery(inputElement).is('input:checkbox') || jQuery(inputElement).is('input:radio'))
        {
            jQuery(inputElement).addClass('error-checkbox');
        }
        else
        {
            jQuery(inputElement).addClass(errorStyleClass);
        }
        /* show image next to the highlighted error field. */
        insertErrorImage(inputElement);

        /* set current node to be used for 'errorplacement'. */
        node = closest(inputElement,"tr");        
    }

  

    /*  Remove error highlighting for the given inputElement

     *    called from 'setDefaults() function. */

    function unHighlight(inputElement, errorStyleClass) {
        /* no unhighlight operations required for luminis editor's select object events(with class name - luminisEditorSelect */        
        if(jQuery(inputElement).attr("class") == "luminisEditorSelect")
            return;

        if(jQuery(inputElement).is('input:checkbox') || jQuery(inputElement).is('input:radio'))
        {
            jQuery(inputElement).removeClass('error-checkbox');
        }
        else
        {
            jQuery(inputElement).removeClass(errorStyleClass);
        }

        jQuery(inputElement).siblings("span#errorImageSpan").remove();

        /* delete the 'tds' added inside 'tr#errorDisplay' for error message display. */
        jQuery(closest(inputElement,"tr")).next("tr#errorDisplay").html("");
    }

  

    function insertErrorImage(inputElement)
    {
    	var errorImageSpanEle;
        var errorImageSpanHTML;
        if(jQuery(inputElement).is('textarea')) {
        	if(jQuery(inputElement).parent('div').parent('span').attr('id') == 'descriptionContainer')	{
        		inputElement = jQuery(inputElement).parent('div').parent('span');
        	}
        }
        
    	if(!(jQuery(inputElement).is('input:checkbox') || jQuery(inputElement).is('input:radio'))) {
    		
    		errorImageSpanHTML = jQuery(inputElement).siblings("span#errorImageSpan").html();        	
    		if(errorImageSpanHTML == null || errorImageSpanHTML == "" || errorImageSpanHTML == undefined) {
        		
            	if (jQuery(inputElement).is('INPUT')) {
                	errorImageSpanEle = '<span id="errorImageSpan" style="display:inline;">&nbsp;<img src="/cps/images/messages/icon-error.png"/></span>';
                }
                else {
                	errorImageSpanEle = '<span id="errorImageSpan" style="display:inline; position:absolute;">&nbsp;<img src="/cps/images/messages/icon-error.png"/></span>';
                }
                jQuery(errorImageSpanEle).insertAfter(inputElement);
            }
        }
    }
    

    /*    Sets the default behaviour for JQuery validator plugin. */

    jQuery.validator.setDefaults({

        

        errorPlacement: function(error, inputElement) {            

            /* Weave error message dynamically, in the designated table row */

            jQuery(node).next("tr#errorDisplay").html("<td></td><td><div></div></td>");

            error.appendTo(jQuery(node).next("tr#errorDisplay").children("td").children("div"));

        },

        

        debug: true,

        highlight: highlight,

        unhighlight: unHighlight

    });

    

    /* 

     * Modify JQuery to include custom validation for description element. 

     * Description can be entered either from plain text area or fck editor 

     */

    jQuery.validator.addMethod('required_group', function(val, el, params) {

        var result = false;

        var plainTextData = "";

        

    /*

     * if rich text editor is displayed get the plain text and validate

     */         

        if(params[0].isRichText() == true){

            plainTextData = params[0].getPlainTextData();

            if(plainTextData != ''){

                jQuery("span#descriptionContainer").removeClass("portlet-form-span-mandatory");

                jQuery("span#descriptionContainer").siblings("span#errorImageSpan").remove();

                result = true; 

            }else{

                insertErrorImage(jQuery("span#descriptionContainer"));

                jQuery("span#descriptionContainer").addClass("portlet-form-span-mandatory");                 

            }

            return result;

        }

        

    /*

     * if plain text editor then validate on the element

     */         

        else{

             // synchronize data for description fied, since input can be from either 'textarea' or 'richTextEditor'

            //params[0].synchEditorData();

            

            //changed this to fix issue of "Creating a description within angle brackets fails validation"

            //var elementValue = TrimString(jQuery(el).val().replace(/<(.|\n)*?>|(&nbsp;)/g, ""));

            var elementValue = TrimString(jQuery(el).val().replace(/(\n)|(&nbsp;)/g, ""));

            if(elementValue){

                jQuery("span#descriptionContainer").removeClass("portlet-form-span-mandatory");

                jQuery("span#descriptionContainer").siblings("span#errorImageSpan").remove();

                result = true; 

            }else{/* if validation fails change style calls */

                insertErrorImage(jQuery("span#descriptionContainer"));

                jQuery("span#descriptionContainer").addClass("portlet-form-span-mandatory");

            }   

              return result;

        }

    }, 'custom message');



    /* Modify JQuery validator to include custom validation for flex objects. */

    jQuery.validator.addMethod('required_flexValue', function(val, el, params) {

    

        /* get the flex list object */

        var theApp = getFlexApp(params[0]);

        if (undefined == theApp)

            theApp = getFlexApp(params[1]);



        var selectedGroups = theApp.getGroups();    

                

        if(selectedGroups.length==0) {

            jQuery('.groupselectortd').addClass("portlet-form-span-mandatory");

            return false;

        }else{

            jQuery('.groupselectortd').removeClass("portlet-form-span-mandatory");

    

            /*  if there are selected objects, populate the 'combo box' html element(id passed from the jsp-params[2]), 

                with selelcted values of flext object */

            for(var iCount=0; iCount<selectedGroups.length; iCount++) {

                var theOpt = new Option( selectedGroups[iCount], selectedGroups[iCount], false, true );    

                document.getElementById(params[2]).options[document.getElementById(params[2]).options.length] = theOpt;            

            }



            return true;

        }

    }, 'custom message');    

    

    jQuery.validator.addMethod("requiredOnPage", function(value, element, params) { 

        var result = true;

        if (statusA == params[0]){

                  

            // synchronize data for description fied, since input can be from either 'textarea' or 'richTextEditor'

           // if(params[2] == "required_synch")

            //    params[3].synchEditorData();

                   

            var elementValue = jQuery(element).val(); 

            elementValue = jQuery.trim(elementValue);

            if(params[1] == "select"){

                if(elementValue == 0) 

                    /* this section is for select box */

                    result = false;

                }else if (params[1] == "checkBox"){

                    if(!(jQuery(element).attr("checked")))

                        result = false;

                }else{

                    if(elementValue == "")

                        result = false;

                } 

            }

            return result;

    },"custom message");



    /* adding new method to check the max length for create community. 

        The max lenght will be checked only if the display is the relevent panel(params[0])

        The default maxlenght cannot be used as it is not checking the current panel of create community  */

    jQuery.validator.addMethod("max_length_On_Page", function(value, element, params) { 

        if (statusA == params[0]){

            return this.getLength(jQuery.trim(value), element) <= params[1];

        }else

            return true;

    },"custom message");

    

    /* Modify JQuery validator to validate expireon and post on date. */

    jQuery.validator.addMethod('required_expireon_poston_date', function(val, el, params) {
        var postOnDate = new Date(document.getElementById(params[0]).value);
        postOnDate.setHours(document.getElementById(params[1]).value);
        postOnDate.setMinutes(document.getElementById(params[2]).value);
        var expireOnDate=new Date(document.getElementById(params[3]).value ) 
        expireOnDate.setHours(document.getElementById(params[4]).value);
        expireOnDate.setMinutes(document.getElementById(params[5]).value);
         if(document.getElementById(params[0]).value != '' && document.getElementById(params[3]).value  != '' &&  expireOnDate<=postOnDate){
            return false;

        }else{

            return true;

        }

    }, 'custom message');

    

    jQuery.validator.addMethod("required_from_group", function(value, element, params) { 

     

       selector = params[1]; 

       var commonParent = jQuery(element).parents('form'); 

       var inputNumber = 0; // the number of input fields filled.   

       var fieldsSetArray = commonParent.find(selector).each(function(){ 

        //Look through fields matching our selector and total up how many of them have been filled 

         if (jQuery(this).val()) { 

           inputNumber++; 

         } 

       }); 

    

       if (inputNumber >= params[0]) { 

         //For imputs matching our selector, remove error class 

         //from their text 

         commonParent.find(selector).each(function(){

             jQuery(this).removeClass('error');

    

            /* Find the asterisk and REMOVE the error style */

            jQuery(closest(this,"td")).prev("td").children("span:last").removeClass("portlet-form-field-mandatory");

    

            jQuery(this).siblings("span#errorImageSpan").remove();

         });

        /* delete the 'tds' added inside 'tr#errorDisplay' for error message display. */

        jQuery("tr#errorDisplay").html("");

    

         //Also look for inserted error messages and mark them 

         //with class 'checked' 

         var remainingErrors = commonParent.find(selector).next('label.error').not('.checked'); 

         remainingErrors.text("").addClass('checked'); 

         //Tell the Validate plugin that this test passed 

         return true; 

       }else {

         commonParent.find(selector).each(function(){

             jQuery(this).addClass('error');

    

            /* show image next to the highlighted error field. */

            insertErrorImage(this);

    

            /* Find the asterisk and APPLY the error style */

            jQuery(closest(this,"td")).prev("td").children("span:last").addClass("portlet-form-field-mandatory");

         });

       }

        

    },"custom message");



    /* validation special characters in an input value */

    jQuery.validator.addMethod('checkSpecialChars', function(val, el, params) {

        var result = true;

        /*    

            special characters '.'(\.) and '-' are avoided here since,

            this function is primarily for community short name and 

             the two mentioned characters are allowed in short name.

         */

         var regex = new RegExp(/[^\.\sa-zA-Z0-9_-]/); 

         /*

             \s(space) is avoded here while matching since it is checked in a seperate

             function, for displaying a seperate message for space/tab.

         */

        if (val.match(regex)) {

            result = false;

          }

        return result;

        

    }, 'No special characters allowed');


    /* Alpha numeric check - validation for any special character other than 'Comma' and 'Space'*/

    jQuery.validator.addMethod('checkAlphaNumericAndComma', function(val, el, params) {

        var result = true;

        var regex = new RegExp(/[^,\sa-zA-Z0-9\u0600-\u06ff\u00C0-\u00FF]/); 

        if (val.match(regex)) {
            result = false;
          }
        return result;
    }, 'No special characters allowed');
    

    /* validation to check Liferay not supported characters in an input value */

    jQuery.validator.addMethod('liferayNotSupportCharsCheck', function(val, el, params) {

        var result = true;

        /*    

            characters like asterisk (*), comma (,) and forward slash (/) are avoided here since,

            Liferay woun't support few characters while creating community

         */

         var regex = new RegExp(/[\*,\/\?]/);

        if (val.match(regex)) {

            result = false;

          }

        return result;

        

    }, 'characters not supported for community creation');



    /* validation for period as first or last character in an input value */

    jQuery.validator.addMethod('checkPeriodBoundaryString', function(val, el, params) {

        var result = true;

         var regex = new RegExp(/^\.|\.$/); 

        if (val.match(regex)) {

            result = false;

          }

        return result;

        

    }, 'Period cannot be first or last character');



    /* validation for consecutive periods(eg '..') in an input value */

    jQuery.validator.addMethod('checkConsecutivePeriods', function(val, el, params) {

        var result = true;

         var regex = new RegExp(/\.{2}/); 

        if (val.match(regex)) {

            result = false;

          }

        return result;

        

    }, 'No consecutive period symbols are allowed');



    /* validation for checking space/tab characters in the input value */

    jQuery.validator.addMethod('check_space_char', function(val, el, params) {

        var result = true;

        if(val.match(/\s/) != null)

            result = false;

        return result;

        

    }, 'No space allowed');

    

    jQuery.validator.addMethod('check_file_type', function(val, el, params) {

        var result = true;



        var img_url = jQuery(el).val();

        var index_dot=img_url.lastIndexOf(".");

        var extn=jQuery.trim(img_url.substring(index_dot+1,img_url.length).toLowerCase());

                

        var allowedPhotoTypes = "bmp*BMP*gif*GIF*jpeg*JPEG*jpg*JPG*pbm*PBM*png*PNG*pgm*PGM*pnm*PNM*ppm*PPM*tiff*TIFF";

        if(params[0] == 'photo') {

            if(allowedPhotoTypes.indexOf(extn) < 0) {                

                result = false;

            }

        }



        var allowedVideoTypes = "mp4*MP4*flv*FLV";

        if(params[0] == 'video') {

            if(allowedVideoTypes.indexOf(extn) < 0) {                

                result = false;

            }

        }

        

        return result;

    }, 'custom message');

    

    /*Validator to check if atleast one checkbox is selected before an operation is called on it*/

    jQuery.validator.addMethod('check_select_checkbox', function(val, el, params) {

        var result = true;

            

        var elementName = jQuery(el).attr("name");

        var values = jQuery('input[name=' + elementName +']:checked').val();

        var columName = "td[id=" + params[0] + "]";

        if(!values || values == "" || values == 'undefined'){

           result = false;

           jQuery(columName).addClass("error");

        }else{

          jQuery(columName).removeClass("error");            

        }

        return result;

    }, 'custom message');



    /* validation for duplicate name/shortname */

    jQuery.validator.addMethod('notEqualTo', function(val, el, params) {

        

        var result = true;

        if(params[0].toLowerCase() == (jQuery.trim(val)).toLowerCase()){

            result = false

        }

        return result;

        

    }, 'This is a reserved keyword, not allowed');

    

    /* Validation to check whether a number contains a decimal point  - added in order to address the requirement

     * as par the defect ID 1047 in focal point*/

    jQuery.validator.addMethod('check_noperiods_in_number', function(val, el, params) {

        var result = true;

         var regex = new RegExp(/\d+[\\.]/);

        if (val.match(regex)) {

            result = false;

          }

        return result;

        

    }, 'Numbers with decimal point are not allowed');
    
   
    // if rich text editor is used, avoid all appended tags by the richtext
    // editor and get only the plain text and validate
    jQuery.validator.addMethod('maxlength_editor_richtext', function(val, el, params) {
        var result = false;
        var content = jQuery("body", jQuery("iframe", jQuery(el).parent()).contents()).html();
        
        if ( content != null && content.length > 0 )
        {
            var ckEditor = new CKEDITOR.dom.element.createFromHtml(content);
            // only measure the plain text content - not the markup
            content = ckEditor.getText();
        }
        
        if(jQuery.trim(content).length <= params[0]){
            jQuery(el).parents("span#descriptionContainer").removeClass("portlet-form-span-mandatory");
            jQuery(el).parents("span#descriptionContainer").siblings("span#errorImageSpan").remove();
            result = true; 
        }else{
            insertErrorImage(jQuery(el).parents("span#descriptionContainer"));
            jQuery(el).parents("span#descriptionContainer").addClass("portlet-form-span-mandatory");                 
        }
        return result;
    }, 'custom message');
    
    jQuery.validator.addMethod('contentRequired', function(val, el, params) {

        if ( jQuery(el).parents().filter('tr[data-ready-for-validation="false"]').length == 1 )
        {
            // user has not yet seen the panel with the editor - don't apply the validation yet.
            return true;
        }
        
        var result = false;
        var content = jQuery("body", jQuery("iframe", jQuery(el).parent()).contents()).html();

        if ( content != null && content.length > 0 )
        {
            var ckEditor = new CKEDITOR.dom.element.createFromHtml(content);
            content = ckEditor.getHtml();
        }
        
        if(content != '' && TrimString(content.replace(/([<br />]|[&nbsp;])/g,''))!=''){
        	jQuery(el).parents("span#descriptionContainer").removeClass("portlet-form-span-mandatory");
        	jQuery(el).parents("span#descriptionContainer").siblings("span#errorImageSpan").remove();
            result = true; 
        } else {
            jQuery(el).parents("span#descriptionContainer").addClass("portlet-form-span-mandatory");
        }
        return result;
    }, 'Content is required.');
    
    jQuery.validator.addMethod("requiredForSelect", function(value, element, params) {
        var result = true; 
        var elementValue = jQuery(element).val(); 
        elementValue = jQuery.trim(elementValue);
        if(elementValue == params[0]) {
            result = false;
        }
        return result;
   },"Please select an option.");
    
    /* function to check for right url: here there is a default text 'http://' populated in the url field.
     * default url check by jQuery validator will give false if we use this function directly.
     * this function is customized to by pass only 'http://' which is a default text, and used the default url
     * check for all other cases.
     */
    jQuery.validator.addMethod('validate_url_with_default_text', function(val, el, params) {
        var result = true;
        var trimmedVal = jQuery.trim(val); 
        if(trimmedVal.length >0 && trimmedVal.toLowerCase()!='http://'){
            result = jQuery.validator.methods.url.call(this,val,el);
         }
        return result;
    }, 'custom message');
    
    jQuery.validator.addMethod('validate_url_abs_or_relative', function(val, el, params) {
        /* source: http://jmrware.com/articles/2009/uri_regexp/URI_regex.html */
        /* should validate URI's according to the rules specified in RFC3986 - both absolute and relative */
        var re_js_rfc3986_URI_reference = /^(?:[A-Za-z][A-Za-z0-9+\-.]*:(?:\/\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\.[A-Za-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?(?:\#(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?|(?:\/\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\.[A-Za-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\-._~!$&'()*+,;=@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?(?:\#(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?)$/;
        var result = true;
        var trimmedVal = jQuery.trim(val);
        result = re_js_rfc3986_URI_reference.test(val);
        return result;
    }, 'custom message');
    