(function($){
	
	
	/***** SETTINGS *****/
	var settings = {
  	'loadingHTML'         			: '<p class="loading">Loading...</p>', 
  	'createUrlFunction'					: null, 
  	'formatRowFunction'					: null, 
  	'finishedUpdateFunction'		: null, 
  	'updateOnScroll'            : true
  };



	/***** METHODS *****/
	var methods = {
    
    
    /**
     * initialize
     */
    init : function( options ) {
			
			return this.each(function(){
			
				// If options exist, lets merge them
				// with our default settings
				if (options) { 
					$.extend(settings, options);
				}
				
				$(this).data("fwAjaxList", options);
	
	    	//add a loading animation on init
				$(this).html('<li>' + settings['loadingHTML'] + '</li>');	
	    	
	    	//initial call data
	    	//methods['getData'].call(this, true);
	    	
	    	var curObj = this;
	    	
	    	if(settings['updateOnScroll']) {
  	    	//bind the scrollto-plugin to the 
	       	$(window).bind('scroll', function(){
	      		if($(window).scrollTop() == $(document).height() - $(window).height()){
	      			methods['getData'].call(curObj, false);
	     	   	}
	       	});
	      }
        
	    	
	    });
    }, 
    
    
    /**
     * getData
     */
    
    getData : function(init) {
      
      var curObj = this;
      
      return $(this).each(function(){
        
        options = $(this).data("fwAjaxList");
        
        //do the ajax-call to get the json response
      	$.get(options['createUrlFunction'].call(this, init), function(data){
      		
      		if(init) {
      			$(curObj).html("");
      		}
      		
      		$.each(data, function(index, value) {
      			
      			$(curObj).append(options['formatRowFunction'].call(curObj, value));
      			
      		});
      		
      		options['finishedUpdateFunction'].call(curObj);
      		
      	});
        
      
      });
      
    }, 


    
    /**
     * update
     */
    update : function() {
    	
    	var curObj = this;
    	
    	return this.each(function(){
    		methods['getData'].call(curObj, true);
    	});
    }
    
  };
	
	
	$.fn.fwAjaxList = function(method) {
		


    /***** Method calling logic *****/
    
    //we call the method, and apply all the options
    if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		
		//we call the init-method
		else if(typeof method === 'object' || ! method) {
			return methods.init.apply( this, arguments );
    }
    
    //otherwise we throw an error
    else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    } 
	}
	
})(jQuery);
