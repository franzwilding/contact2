
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
	
	var html_string = '';
	html_string += '<div class="detailinfos">';
	html_string += '<h4 class="address">Adresse</h4>';
	html_string += '<p>';
	html_string += 'Roßauer Lände 45/6<br />1090 Wien, Wien<br />Österreich';
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