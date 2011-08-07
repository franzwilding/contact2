
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



/**************************/
/* FIND-PEOPLE-INPUTFIELD */
/**************************/
//$("input.findpeople").each(function(){
	
	/**
	 * für jedes findpeople feld müssen wir uns neben ajax auch um loading und anzeige kümmern
	 */
	//$(this).wrap('<div class="findpeople_box" />');
	//$(this).after('<p class="loading">Laden...</p>');
	//$(this).after('<input type="hidden" name="' + $(this).attr("name") + '" value="" />');
	//$(this).attr("name", "");
//});

//var old_timestamp = 0;

/*$("input.findpeople").keyup(function(event){
	
	//request nur jede 0.5 sec. wenn leute schnell tippen, killt das sonst den server
	if(event.timeStamp - old_timestamp > 500) {
		
		$(this).parent().find("p.loading").show();
		
		find_people($(this).attr("value"), "output_" + $(this).attr("id"), $(this).parent().find("p.loading"));
		old_timestamp = event.timeStamp;
	}
});*/


});


/*************************/
/* FIND PEOPLE INPUT BOX */
/*************************/
/*function find_people(searchstring, callback, loading) {
	$.get("/people.json?limit=10&query=" + searchstring, function(data){
		
		//wenn unsere callbackfuntion existiert, können wir diese aufrufen
		if(window[callback]) {
			window[callback].apply(null, [data]);
		}
		
		loading.fadeOut();
		
	});
}*/





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
		html_string += '<a class="showdetails" href="javascript:;"><img src="/avatars/' + current_person.avatar + '" alt="' + current_person.firstname.substr(0, 20) + ' ' + current_person.surname.substr(0, 20) + '" /></a>';
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

  if(current_person.avatar != null)
    
    if(current_person.avatar == "") current_person.avatar = "default.png";	   
	   
	   
		html_string += '<a class="showdetails" href="javascript:;"><img src="/avatars/' + current_person.avatar + '" alt="' + current_person.firstname.substr(0, 20) + ' ' + current_person.surname.substr(0, 20) + '" /></a>';
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






/*******************/
/* FORTMAT DETAILS */
/*******************/
function format_details(obj, fieldgroups) {
	
	console.log(obj);
	console.log(fieldgroups);


	city       = obj.city.name;
	province   = obj.province.name;
  street     = obj.address.street;
  PLZ        = obj.address.PLZ;
  number     = obj.address.number;
	
	var html_string = '';
	html_string += '<div class="detailinfos">';
	html_string += '<h4 class="address">Adresse</h4>';
	html_string += '<p>';
	html_string += street + ' ' + number + '<br />' + PLZ + ' ' + city + ', ' + province;
	html_string += '</p>';
	html_string += '</div>';
	
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