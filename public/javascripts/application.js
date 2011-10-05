
$(document).ready(function($) {


/***********/
/* TOOLTIP */
/***********/
$("a.tooltip").each(function(){
	var text = $(this).next().html();
	
	$(this).tipTip({
		activation				: "click", 
		keepAlive					: true,
		defaultPosition		: "top",
		content						: text, 
		maxWidth					: "auto"
	});
});


/****************/
/* LOGIN_BUBBLE */
/****************/
bubbleInfo(".popupbox");


$("input.search").each(function(){
  $(this).focus(function(){
    if($(this).val() == "Suchbegriff eingeben")
      $(this).val("");
  });
  
  $(this).focusout(function(){
    if($(this).val() == "")
      $(this).val("Suchbegriff eingeben");
  });
});


/**************************/
/* FIND-PEOPLE-INPUTFIELD */
/**************************/
$("input.findpeople").each(function(){
	
	/**
	 * für jedes findpeople feld müssen wir uns neben ajax auch um loading und anzeige kümmern
	 */
	$(this).wrap('<div class="findpeople_box" />');
	$(this).after('<p class="loading">Laden...</p>');
	$(this).after('<input type="hidden" name="' + $(this).attr("name") + '" value="" />');
	$(this).attr("name", "");
});

var old_timestamp = 0;

$("input.findpeople").keyup(function(event){
	
	//request nur jede 0.5 sec. wenn leute schnell tippen, killt das sonst den server
	if(event.timeStamp - old_timestamp > 500) {
		
		$(this).parent().find("p.loading").show();
		
		find_people($(this).attr("value"), "output_" + $(this).attr("id"), $(this).parent().find("p.loading"));
		old_timestamp = event.timeStamp;
	}
});

$("input.findpeople").click(function(event){
  if($(this).attr("value") != "") {
    $(this).parent().find("p.loading").show();		
    find_people($(this).attr("value"), "output_" + $(this).attr("id"), $(this).parent().find("p.loading"));
  }
});



/*********************/
/* FADE_OUT_MESSAGES */
/*********************/
$(".messages").each(function(){
  cur_msg = this;
  content_length = $(cur_msg).find("p").text().length;
  var timeoutId = setTimeout( function() {
    $(cur_msg).slideUp("slow");
  }, content_length*100);

});

});


/*************************/
/* FIND PEOPLE INPUT BOX */
/*************************/
function find_people(searchstring, callback, loading) {
	$.get("/people.json?limit=10&query=" + searchstring, function(data){
		
		//wenn unsere callbackfuntion existiert, können wir diese aufrufen
		if(window[callback]) {
			window[callback].apply(null, [data]);
		}
		
		loading.fadeOut();
		
	});

}





function add_keyboard_support_for_list(input, find_list, callback) {
  
  var cur_obj = this;
  
  //when i press down inside the search-input
  $(input).bind('keydown', 'down',function (event){
    
    //wenn die find_list nicht angezeigt wird, dann müssen wir die suche updaten
    if(!$(find_list).is(":visible")) {
      $(find_list).fwAjaxList("update");
    }
    
    else {
    
      //get the current item, if it is activated
      cur_active = $(find_list).find("li.hover")[0];
      
      //remove all active-classes
      $(find_list).find("li").each(function(){
        $(this).removeClass("hover");
      });
    
      //activate next item
      if(!cur_active)
        $(find_list).find("li:first").addClass("hover");
      else if($(cur_active).next()[0])
        $(cur_active).next().addClass("hover");
      else
        $(cur_active).addClass("hover");
    
    }
    
    callback.call(cur_obj, event.timeStamp);
    return false; 
  });

  
  
  //when i press up inside the search-input
  $(input).bind('keydown', 'up',function (event){
    
    //get the current item, if it is activated
    cur_active = $(find_list).find("li.hover")[0];
    
    //remove all active-classes
    $(find_list).find("li").each(function(){
      $(this).removeClass("hover");
    });
    
    //activate next item
    if(cur_active && $(cur_active).prev()[0])
      $(cur_active).prev().addClass("hover");
    else
      $(cur_active).addClass("hover");
    
    callback.call(cur_obj, event.timeStamp);
    return false; 
  });
  
  
  $(input).bind('keydown', 'return',function (event){
    
    //get the current item, if it is activated
    cur_active = $(find_list).find("li.hover")[0];
    
    if(cur_active) {
    $(this).val($(cur_active).find("h3 a").text());
    $(this).removeClass("hover");
    }
    
    
    $(find_list).slideUp();
    callback.call(cur_obj, event.timeStamp);
    return false; 
  });

}









/***********************/
/* FORTMAT PERSON LIST */
/***********************/
function format_person_list(current_person, small) {
	
	html_string = '';
	
	html_string += '<li name="' + current_person.id + '">';

	if(current_person.avatar != null)
		html_string += '<a class="showdetails" href="javascript:;"><img src="/file?path=' + current_person.avatar + '" alt="' + current_person.firstname.substr(0, 20) + ' ' + current_person.surname.substr(0, 20) + '" /></a>';
	html_string += '	<h3><a class="showdetails" href="javascript:;">' + current_person.firstname.substr(0, 20) + ' ' + current_person.surname.substr(0, 20) + '</a></h3>';
	
	//wenn wir alles anzeigen wollen
	if(!small) {
		html_string += '<p>';
		
		if(current_person.phone) html_string += '	<span class="phone">' + current_person.phone + '</span>';
		if(current_person.email) html_string += '	<a href="" class="email">' + current_person.email + '</a>';
		
		html_string += '	</p><ul class="meta">';
		
		if(current_person.facebook) html_string += '	<li class="facebook"><a href="http://facebook.com/' + current_person.facebook + '" target="_blank" title="Zum Facebook-Account dieses Users (in einem neuen Tab)">Facebook</a></li>';
		if(current_person.twitter) html_string += '	<li class="twitter"><a href="http://twitter.com/' + current_person.twitter + '" target="_blank" title="Zum Twitter-Account dieses Users (in einem neuen Tab)">Twitter</a></li>';
		if(current_person.website) html_string += '	<li class="website"><a href="http://' + current_person.website + '" target="_blank" title="Zur Website dieses Users (in einem neuen Tab)">Website</a></li>';
		html_string += '</ul><a class="edit" title="Diesen Eintrag bearbeiten" href="people/' + current_person.id + '/edit">Bearbeiten</a>';
		html_string += '<div class="details"></div>';
	}
	
	html_string += '</li>';
	
	return html_string;
}





/*********************/
/* FORTMAT NAME LIST */
/*********************/
function format_name_list(item) {
	
	html_string = '';	
	html_string += '<li name="' + item.id + '">';
	html_string += '	<h3><a class="showdetails" href="javascript:;">' + item.name + '</a></h3>';
	html_string += '</li>';
	
	return html_string;
}




/****************************/
/* FORTMAT INTERACTION LIST */
/****************************/
function format_interaction_list(current_person, small) {
	
	html_string = '';
	
	html_string += '<li name="' + current_person.id + '">';

	if(current_person.avatar == undefined) current_person.avatar = "default.png";	   
	   
		html_string += '<a class="fancybox" href="/file?path=' + current_person.avatar + '"><img src="/file?path=' + current_person.avatar + '" alt="' + current_person.firstname.substr(0, 20) + ' ' + current_person.surname.substr(0, 20) + '" /></a>';
	html_string += '	<h3><a class="showdetails" href="javascript:;">' + current_person.firstname.substr(0, 20) + ' ' + current_person.surname.substr(0, 20) + '</a></h3>';
	
	//wenn wir alles anzeigen wollen
	if(!small) {
		html_string += '<p>';
		
		if(current_person.phone) html_string += '	<span class="phone">' + current_person.phone + '</span>';
		if(current_person.email) html_string += '	<a href="" class="email">' + current_person.email + '</a>';
		
		html_string += '	</p><ul class="meta">';
		
		if(current_person.facebook) html_string += '	<li class="facebook"><a href="http://facebook.com/' + current_person.facebook + '" target="_blank" title="Zum Facebook-Account dieses Users (in einem neuen Tab)">Facebook</a></li>';
		if(current_person.twitter) html_string += '	<li class="twitter"><a href="http://twitter.com/' + current_person.twitter + '" target="_blank" title="Zum Twitter-Account dieses Users (in einem neuen Tab)">Twitter</a></li>';
		if(current_person.website) html_string += '	<li class="website"><a href="http://' + current_person.website + '" target="_blank" title="Zur Website dieses Users (in einem neuen Tab)">Website</a></li>';
		html_string += '</ul><a class="edit" title="Diesen Eintrag bearbeiten" href="people/' + current_person.id + '/edit">Bearbeiten</a>';
		html_string += '<div class="details"></div>';
	}
	
	html_string += '<script type="text/javascript">$(document).ready(function($) { $("a.fancybox").fancybox(); });</script></li>';
	
	return html_string;
}


/****************************/
/* FORTMAT LISTS LIST */
/****************************/
function format_lists_list(current_list) {
	
	avatar = '/file?path=icons/dynamic.png';
	
	if(current_list.query == null)
    avatar = '/file?path=icons/fixed.png';
	 
	html_string = '';
	
	html_string += '<li name="' + current_list.id + '">';
    html_string += '<h3><a class="showdetails" href="javascript:;">' + current_list.title.substr(0, 40);
    html_string += '<img style="border:none; box-shadow:none; width:32px; height:32px;" src="' + avatar + '" alt="" />';
    if(current_list.query != null)
      html_string += ' <em>(dynamisch)</em>';
    
    html_string += '</a></h3>';
    html_string += '<a class="edit" title="Diesen Eintrag bearbeiten" href="lists/' + current_list.id + '/edit">Bearbeiten</a>';
    html_string += '<div class="details"></div>';
	html_string += '</li>';
	
	return html_string;
}





/*******************/
/* FORTMAT DETAILS */
/*******************/
function format_details(obj, fieldgroups) {
	
	html_string = ""
	
	if (obj.city) city = obj.city.name; else city = ""; 
	if (obj.province) province = obj.province.name; else province = "";
  if (obj.address) {
    street     = obj.address.street;
    PLZ        = obj.address.PLZ;
    number     = obj.address.number;
    
    if(street == null) street = ""
    if(PLZ == null) PLZ = ""
    if(number == null) number = ""
    if(city == null) city = ""
    if(province == null) province = ""
  	
  	var html_string = '';
  	html_string += '<div class="detailinfos">';
  	html_string += '<h4 class="address">Adresse</h4>';
  	html_string += '<p>';
  	html_string += street + ' ' + number + '<br />' + PLZ + ' ' + city + ', ' + province;
  	html_string += '</p>';
  	html_string += '</div>';
  }
  	
	//für jede gruppe
	$.each(fieldgroups, function(index, value) {
		
		fieldgroupstring = '';
		
		fieldgroupstring += '<div class="detailinfos">';
		fieldgroupstring += '<h4 class="fields">' + value["fieldgroup"].name + '</h4>';
		fieldgroupstring += '<p>';
		
		var counter = 0;
		
		//für jeden fieldvalue den das objekt hat
		$.each(obj.fieldvalues, function(index, fieldvalue){
			
			//für jedes field, dass es gibt, wird nach dem richtigen für das fieldvalue gesucht
			$.each(value["fieldgroup"].fields, function(index, field){

				if(fieldvalue.field_id == field.id) {
					fieldgroupstring += '<strong>' + field.label + ': </strong>' + fieldvalue.value + '<br />';	
					counter ++;
				}
				
			});
			
		});
		
		fieldgroupstring += '</p>';
		fieldgroupstring += '</div>';	
		
		if(counter > 0) html_string += fieldgroupstring;
		
	});
	
	return html_string;
}

function format_list_details(obj) {
  
  html_string = "";
  
  html_string += '<div class="detailinfos">';
  html_string += '<h4 class="fields">Aktionen</h4>';
  html_string += '<div class="button export"><a href="">Eine Email an diese Liste schicken</a></div><br />';
  html_string += '<div class="button export"><a href="">Eine SMS an diese Liste schicken</a></div><br />';
  html_string += '<div class="button export"><a href="/lists/export/' + obj.id + '">Diese Liste exportieren</a></div>';
  html_string += '</div>';
  
  html_string += '<div class="detailinfos">';
	html_string += '<h4 class="fields">Personen</h4>';
	html_string += '<ul>';
	
	$.each(obj.people, function(i, v){
	  
	  if((i+1)%20 == 0) {
  	  html_string += '</ul><ul>';
	  }
	  
    html_string += '<li style="float:none; width:223px" name="' + v.id + '">' + v.firstname + ' ' + v.surname;
    
    if(obj.query == null)
      html_string += '<a href="/people/' + v.id + '?l_id=' + obj.id + '" class="delete" data-method="delete" data-confirm="Soll dieser User wirklich aus der Liste gelöscht werden?" data-remote="true" rel="nofollow">Löschen</a>';
    
    html_string += '</li>';	
	});
	html_string += '</ul>';
	html_string += '</div>';
  
	return html_string;
  
}


function bubbleInfo(selector) {
  $(selector).each(function () {
    // options
    var distance = 10;
    var time = 250;
    var hideDelay = 500;
  
    var hideDelayTimer = null;
  
    // tracker
    var beingShown = false;
    var shown = false;
    
    var trigger = $(this).find("input");
    var popup = $(this).find(".popup").css('opacity', 0);
    
    // set the mouseover and mouseout on both element
    $([trigger.get(0), popup.get(0)]).mouseover(function () {
      // stops the hide event if we move from the trigger to the popup element
      if (hideDelayTimer) clearTimeout(hideDelayTimer);
  
      // don't trigger the animation again if we're being shown, or already visible
      if (beingShown || shown) {
        return;
      } else {
        beingShown = true;
  
        // reset position of popup box
        popup.css({
          top: -40,
          left: -33,
          display: 'block' // brings the popup back in to view
        })
  
        // (we're using chaining on the popup) now animate it's opacity and position
        .animate({
          top: '-=' + distance + 'px',
          opacity: 1
        }, time, 'swing', function() {
          // once the animation is complete, set the tracker variables
          beingShown = false;
          shown = true;
        });
      }
    }).mouseout(function () {
      // reset the timer if we get fired again - avoids double animations
      if (hideDelayTimer) clearTimeout(hideDelayTimer);
      
      // store the timer so that it can be cleared in the mouseover if required
      hideDelayTimer = setTimeout(function () {
        hideDelayTimer = null;
        popup.animate({
          top: '-=' + distance + 'px',
          opacity: 0
        }, time, 'swing', function () {
          // once the animate is complete, set the tracker variables
          shown = false;
          // hide the popup entirely after the effect (opacity alone doesn't do the job)
          popup.css('display', 'none');
        });
      }, hideDelay);
    });
  });
}


















