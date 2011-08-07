class PeopleController < ApplicationController
 
  # GET /people
  # GET /people.xml
  # GET /people.json
  def index
		
		where = ""
		
		if(params["whereable"])
  		params["whereable"].each do |key, value|
  		  if(key && value)
          
          value = '1' if value == "checked"
          #key = 'addresses.provinces.name' if key == "provinces"
          
          where += key + " = '" + value + "' AND "
          
  		  end
  		end
		end
		
		#params["sortable"] = "province.name" if params["sortable"] == "province"
		
		logger.debug where
		
		#do the big select		
    @people = Person.search_for(params[:query]).order(params[:sortable] ? params["sortable"] +" "+params["asc"] : "surname ASC").limit(params[:limit].to_i ? params[:limit].to_i : 30).offset(params[:offset].to_i ? params[:offset].to_i : 0)
		
		#respond_to formats
    respond_to do |format|
      
      format.html {
        
        #fieldgroups for the people detail view
        @fieldgroups = Fieldgroup.all
        
        #array of keys, the searchform its sortable for
        @sortable = [
          "surname", 
          "firstname", 
          "created_at", 
          "province"
        ]
        
        #array of where-able fields
        @whereable = {}
        @whereable["province.name"] = ["Wien", "Tirol", "Steiermark"]
        @whereable["avatar"] = TRUE
        @whereable["twitter"] = TRUE 
        @whereable["facebook"] = TRUE
        
      }
      
      format.xml  { render :xml => @people }
      format.json  { render :json => @people }
    end
  end

  # GET /people/1
  # GET /people/1.xml
  def show
    @person = Person.find(params[:id])
    
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @person }
      format.json  { render :json => @person.to_json(:include => [:fieldvalues, :address, :city, :province]) }
    end
  end  

  # GET /people/new
  # GET /people/new.xml
  def new
    @person = Person.new
    @person.address = Address.new
    
    @fields = Fieldgroup.all

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @person.include(:person, :include => :fieldvalues) }
    end
  end

  # GET /people/1/edit
  def edit
    @person = Person.find(params[:id])
    @fields = Fieldgroup.all
  end

  # POST /people
  # POST /people.xml
  def create
    
    @person.city = City.find_or_create_by_name(params[:city]) if params[:city] != ""
    @person.province = Province.find_or_create_by_name(params[:province]) if params[:province] != ""
    
    @person = Person.new(params[:person])
		
    respond_to do |format|
    	
      if @person.save
      	
      	params[:field].each do |index, content|
					@value = Fieldvalue.find_or_create_by_person_id_and_field_id(@person.id, index.to_i)
					@value.value = content.to_s
					@value.save
				end
	
      	
        format.html { redirect_to(@person, :notice => 'Person was successfully created.') }
        format.xml  { render :xml => @person, :status => :created, :location => @person }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @person.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /people/1
  # PUT /people/1.xml
  def update
    @person = Person.find(params[:id])

    @person.city = City.find_or_create_by_name(params[:city]) if params[:city] != ""
    @person.province = Province.find_or_create_by_name(params[:province]) if params[:province] != ""
    
    
    respond_to do |format|
      if @person.update_attributes(params[:person])
      	
      	if params[:field]
        	#wir mŸssen fŸr alle checkboxen einen string: "off" als value erzeugen, da html-forms den status von leere checkboxen nicht als eigene variable mitschicken
        	Field.all.each do |field|
        		params[:field][field.id] = "off" if field.itype == "BOOLEAN" and !params[:field][field.id]
        	end
      	
        	params[:field].each do |index, content|
	   				@value = Fieldvalue.find_or_create_by_person_id_and_field_id(@person.id, index.to_i)
	 	   			@value.value = content.to_s
			   		@value.save
  				end
  		  end
      
        format.html { redirect_to(@person, :notice => 'Person was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @person.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /people/1
  # DELETE /people/1.xml
  def destroy
    @person = Person.find(params[:id])
    @person.destroy

    respond_to do |format|
      format.html { redirect_to(people_url) }
      format.xml  { head :ok }
    end
  end
end
