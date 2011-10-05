class PeopleController < ApplicationController
 
  # GET /people
  # GET /people.xml
  # GET /people.json
  def index
    
    @people = Person.search_for(params[:query].to_s).order("surname ASC").limit(params[:limit].to_i ? params[:limit].to_i : 30).offset(params[:offset].to_i ? params[:offset].to_i : 0)
		
		#respond_to formats
    respond_to do |format|
      
      format.html {
        #fieldgroups for the people detail view
        @fieldgroups = Fieldgroup.all        
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
    
    @fields = Fieldgroup.all
    
    @person.city = City.find_or_create_by_name(params[:city]) if params[:city] != ""
    @person.province = Province.find_or_create_by_name(params[:province]) if params[:province] != ""
    
    params[:person].each do |index, par|
      if index == "address_attributes"
        params[:person][:address_attributes].each do |a_index, a_par|
          params[:person][:address_attributes].delete(a_index) if params[:person][:address_attributes][a_index] == ""
        end
        
        params[:person].delete(index) if params[:person][index].count == 0
        
      else
        params[:person].delete(index) if params[:person][index] == ""
      end
    end
    
    logger.debug params[:person][:address_attributes]
    
    #save avatar
    if !params[:person][:avatar].nil? && params[:person][:avatar] != ""
      uploaded_io = params[:person][:avatar]
      file = Time.now.to_i.to_s + uploaded_io.original_filename
      File.open(Rails.root.join('tmp', file), "wb") { |f| f.write(uploaded_io.read) }
      params[:person][:avatar] = file
    end
            
    @person = Person.new(params[:person])

    respond_to do |format|
    	
      if @person.save
      	
      	if !params[:field].nil?      	
        	params[:field].each do |index, content|
  					@value = Fieldvalue.find_or_create_by_person_id_and_field_id(@person.id, index.to_i)
  					@value.value = content.to_s
  					@value.save
  				end
	      end
      	
        format.html { redirect_to(people_url, :notice => 'Person was successfully created.') }
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
    
    @fields = Fieldgroup.all
    
    @person = Person.find(params[:id])
    
    params[:person].delete(:password) if params[:person][:password] == ""
    params[:person].delete(:password_confirmation) if params[:person][:password_confirmation] == ""
    
    @person.city = City.find_or_create_by_name(params[:city]) if params[:city] != ""
    @person.province = Province.find_or_create_by_name(params[:province]) if params[:province] != ""
    
    #save avatar
    if !params[:person][:avatar].nil? && params[:person][:avatar] != ""
      uploaded_io = params[:person][:avatar]
      file = Time.now.to_i.to_s + uploaded_io.original_filename
      File.open(Rails.root.join('tmp', file), "wb") { |f| f.write(uploaded_io.read) }
      params[:person][:avatar] = file
    end
        
    logger.debug params
    
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
      
        format.html { redirect_to(people_url, :notice => 'Person was successfully updated.') }
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
    
    if params[:l_id]
      @list = List.find(params[:l_id])
      @list.people.delete(@person)
    else
      @person.destroy
    end
    
    
    
    
    @p_id = params[:id]
    @l_id = params[:l_id]

    respond_to do |format|
      format.js
      format.html { redirect_to(people_url) }
      format.xml  { head :ok }
    end
  end
end
