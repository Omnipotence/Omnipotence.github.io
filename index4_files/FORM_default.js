/*
    Eigenaar: B/CKC - Rijkshuisstijl Belastingdienst - Helpdesk.Huisstijl.CKC@belastingdienst.nl.
    Versie: 1.3.0
*/

var _Default = {};

jQuery.noConflict();
_Default.clickedCalenderLink = false;

_Default.init = function () { 
    _Default.addSubNavigationRollover();    	
	_Default.addHelpToggle();  
	_Default.addSubPanelToggle();
	_Default.addDatePicker();	
	Library.addTextboxFocus();	 
	_Default.addDetailPanelToggle();	
};

_Default.addSubNavigationRollover = function() {
	jQuery("#Navigation li a").mouseover(function() { jQuery(this).parent().addClass("hover"); });
	jQuery("#Navigation li a").mouseout(function() { jQuery(this).parent().removeClass("hover"); });
};

_Default.addHelpToggle = function() {
	jQuery( '<a href="#" class="closehelp-link" title="sluiten">sluiten</a>').prependTo( ".help-content" );
	
	jQuery("a.help-link").click(function() { 
		var panelId = jQuery(this).attr('href').split('#');
       	return _Default.toggleHelp(panelId[1]); 
	});
	
	jQuery("a.closehelp-link").click(function() { 
		var panelId = jQuery(this).parent().parent().attr("id");
       	return _Default.toggleHelp(panelId); 
	});
};

_Default.toggleHelp = function(panelId) {
	var helpPanel = jQuery("#" + panelId);
	
	if(helpPanel.prev().hasClass("validation")) { helpPanel.addClass("after-validation"); }
	else { helpPanel.removeClass("after-validation"); }
	
	if(jQuery(helpPanel).css("display") == "none") { helpPanel.slideDown(500); jQuery("#" + panelId + "Link").addClass("help-link-active"); }
	else  { helpPanel.slideUp(500); jQuery("#" + panelId + "Link").removeClass("help-link-active"); }
	return false;
};

_Default.addFaqToggle = function() {
	jQuery("ul.faq h5").click(function() { return togglePanel(this); });	
	jQuery("ul.faq h5").attr("tabindex", "0").keypress(function(e) {  if (e.which != '0') { e.preventDefault(); }  if (e.which == '13') { return togglePanel(this); }});
	
	var togglePanel = function(el) {
		var holder = jQuery(el).parent();
		
		if(jQuery(el).find("a.close").length == 0) { jQuery(el).append("<a href=\"javascript:void\" class=\"close\">sluiten</a>") }
		var hiddenContent = jQuery(holder).find(".hide");
		if(jQuery(holder).hasClass("open")) { hiddenContent.slideUp(500, function() { holder.removeClass("open"); }); }
		else  {  hiddenContent.slideDown(500, function() { holder.addClass("open"); }); }
		return false;
	};
};


_Default.addSubPanelToggle = function() {
	jQuery(".sub-panel-header h5").click(function() { return togglePanel(this); });	
	jQuery(".sub-panel-header h5").attr("tabindex", "0").keypress(function(e) {    if (e.which != '0') { e.preventDefault(); }  if (e.which == '13') { return togglePanel(this); }});
	jQuery(".no-fold-out-sub-panel h5").removeAttr("tabindex");
	
	var togglePanel = function(el) {
		var subPanel = jQuery(el).parent().parent();
		if(jQuery(subPanel).hasClass("no-fold-out-sub-panel")) { return false; }
		
		var subPanelContent = jQuery(el).parent().parent().find(".sub-panel-content");
		if(jQuery(subPanelContent).css("display") == "none") { subPanelContent.slideDown(500, function() { subPanel.addClass("open-sub-panel"); subPanelContent.find("a.help-link").fadeIn(); }); }
		else  {  subPanelContent.find("a.help-link").hide(); subPanelContent.slideUp(500, function() {  subPanel.removeClass("open-sub-panel"); }); }
		return false;
	};
};

_Default.addDatePicker = function() {
	jQuery.datepick.setDefaults(jQuery.datepick.regional['nl']);
    jQuery("input.text-date").datepick({ 
		defaultDate: new Date(), 
		onSelect: function() { jQuery(this).removeClass("no-focus"); }, 
		showOnFocus:false,  
		showOtherMonths: true, 
		yearRange: 'c-100:c+3', 
		showTrigger: '<span title="open kalender" class="date-link">selecteer een datum</span>', 
		dateFormat: 'dd-mm-yyyy' 
	});
	
	jQuery("input.text-short-date").datepick({ 
		defaultDate: new Date(), 
		onSelect: function() { jQuery(this).removeClass("no-focus"); }, 
		showOtherMonths: true, 		
		showOnFocus:false,  
		showTrigger: '<span title="open kalender" class="date-link">selecteer een datum</span>', 
		dateFormat: 'dd-mm',
		pickerClass: 'short-datepick'
	});
};


_Default.addDetailPanelToggle = function() {
	jQuery(".sub-panel-header span.sub-header").click(function() {return togglePanel(jQuery(this)); });	
	jQuery(".sub-panel-header span.sub-header").attr("tabindex", "0").keypress(function(e) {   if (e.which != '0') { e.preventDefault(); }  if (e.which == '13') { return togglePanel(this); }});
	
	var togglePanel = function(el) {
		var detailPanel = jQuery(el).parent().parent().parent().parent().parent().parent();
		var detailPanelContent = jQuery(el).parent().parent().parent().parent().parent().parent().find(".sub-panel-content");
		if(jQuery(detailPanelContent).css("display") == "none") { detailPanelContent.slideDown(500, function() { detailPanel.addClass("open-sub-panel"); detailPanelContent.find("a.help-link").fadeIn(); }); }
		else  {  detailPanelContent.find("a.help-link").hide(); detailPanelContent.slideUp(500, function() {  detailPanel.removeClass("open-sub-panel"); }); }
		return false;
	};
};


//add javascript stylesheet
Library.addStyleSheet("css/FORM_javascript.css");

var userAgent = navigator.userAgent.toLowerCase();
if(userAgent.indexOf("mac os") != -1 && userAgent.indexOf("webkit") != -1 && userAgent.indexOf("ipad") == -1) { Library.addStyleSheet("css/FORM_webkit-mac.css"); } 
else if(userAgent.indexOf("ipad") != -1) { Library.addStyleSheet("css/FORM_ipad.css"); Library.addIpadMetaTags(); } 

// on page load
jQuery(document).ready(function () { _Default.init(); });   
jQuery(window).resize(function () {
	if(jQuery(".cover").length > 0 && jQuery(".cover").css("display") == "block") {
		jQuery(".cover").height(Library.getWindowHeight());
	}
});   