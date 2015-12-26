/*
    Eigenaar: B/CKC - Rijkshuisstijl Belastingdienst - Helpdesk.Huisstijl.CKC@belastingdienst.nl.
    Versie: 1.3.0
*/

var Library = {};

Library.addStyleSheet = function (relPath) {
	if(document.getElementsByTagName("head")) {
		var head = document.getElementsByTagName("head")[0]; 
		var newStyle = document.createElement("link");
   		newStyle.setAttribute("type", "text/css");
		newStyle.setAttribute("rel", "stylesheet"); 
		newStyle.setAttribute("href", relPath); 
		head.appendChild(newStyle);
	}
}; 

Library.addIpadMetaTags = function() {
	if(document.getElementsByTagName("head")) {
		var head = document.getElementsByTagName("head")[0]; 
		var newTag1 = document.createElement("meta");
   		newTag1.setAttribute("name", "apple-mobile-web-app-capable");
		newTag1.setAttribute("content", "yes");
		head.appendChild(newTag1);
		
		var newTag2 = document.createElement("meta");
   		newTag2.setAttribute("name", "viewport");
		newTag2.setAttribute("content", "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=0.2, maximum-scale=1.0");
		head.appendChild(newTag2);
	}	
};

Library.toggleNestedCheckboxes = function(checkboxId) {
	jQuery("#" + checkboxId).click(function() { 
		if(jQuery(this).prop('checked')) { jQuery(this).parent().next().find("input.checkbox").removeAttr("disabled"); }
		else {  jQuery(this).parent().next().find("input.checkbox").attr("disabled", "disabled").removeAttr("checked");  }
	});
	if(!jQuery("#" + checkboxId).prop('checked')) { jQuery("#" + checkboxId).parent().next().find("input.checkbox").attr("disabled", "disabled"); }
};

Library.addDetailModalscreen = function() {
	jQuery("a.detail").click(function() { 
		var winHeight = Library.getWindowHeight();
		jQuery("#PageContainer").prepend(jQuery("<div id=\"Cover1\" class=\"cover\" style=\"height:" + winHeight + "px\">content disabled</div>"));
		
		var targetModalscreenId = jQuery(this).attr("href");
		var topPos = parseInt(Library.findElementPosition(jQuery(this)[0])[1]) + 20;
		jQuery(targetModalscreenId).css("top", topPos + "px").css("display", "block");
		
		jQuery("#Cover1").fadeIn(800);
		return false;
	});
	
	jQuery("a.close-button").click(function() { 
		jQuery("#Cover1").hide();
		jQuery(this).parent().css("display", "none");
		return false;
	});
};

Library.getWindowHeight = function() {
	var winHeight = jQuery(window).height();
	var pageContainerHeight =  parseInt(jQuery("#PageContainer").height()) + 80;
	if(pageContainerHeight > winHeight) { winHeight = pageContainerHeight; }
	return winHeight;
};

Library.findElementPosition = function (elem) {
    var curleft = curtop = 0;
    if (elem.offsetParent) {

        curleft = elem.offsetLeft
        curtop = elem.offsetTop
        while (elem = elem.offsetParent) {
            curleft += elem.offsetLeft
            curtop += elem.offsetTop
        }
    }
    return [curleft, curtop];
}

Library.addTextboxFocus = function() {
	var textBoxes = jQuery("input.text[title]")
	
	for(var i=0; i < textBoxes.length; i++) {
		if(jQuery(textBoxes[i]).val().length == 0) { jQuery(textBoxes[i]).val(jQuery(textBoxes[i]).attr("title")); jQuery(textBoxes[i]).addClass("no-focus"); }
		else if(jQuery(textBoxes[i]).val() == jQuery(textBoxes[i]).attr("title")) { jQuery(textBoxes[i]).addClass("no-focus"); } 
		else { jQuery(textBoxes[i]).removeClass("no-focus"); }
	}
	
	jQuery(textBoxes).click(function() {  if(jQuery(this).val() == jQuery(this).attr("title")) { jQuery(this).val(""); jQuery(this).removeClass("no-focus"); } });
	
	jQuery(textBoxes).blur(function() {  
		if(jQuery(this).val().length == 0) {  jQuery(this).val(jQuery(this).attr("title"));  jQuery(this).addClass("no-focus"); } 
		else if(jQuery(this).val() == jQuery(this).attr("title")) { jQuery(this).addClass("no-focus"); } 
		else { jQuery(this).removeClass("no-focus"); }
	});      
};

Library.disableTabInCaseOfModalscreen = function() {
	jQuery("*").attr("tabindex", "-1");
	jQuery(".modalscreen a").attr("tabindex", "0");
	jQuery(".modalscreen input").attr("tabindex", "0");
	jQuery(".modalscreen button").attr("tabindex", "0");
};


