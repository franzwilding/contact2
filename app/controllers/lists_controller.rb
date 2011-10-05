class ListsController < ApplicationController
  # GET /lists
  # GET /lists.xml
  def index

    @lists = List.search_for(params[:query]).order("title ASC").limit(params[:limit].to_i ? params[:limit].to_i : 30).offset(params[:offset].to_i ? params[:offset].to_i : 0)
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @lists }
      format.xml  { render :xml => @lists }
    end
  end

  # GET /lists/1
  # GET /lists/1.xml
  def show
    @list = List.find(params[:id])
    
    if !@list.query.nil?
      @list.people = Person.search_for(@list.query.to_s).order("surname ASC")
    end
    
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @list }
      format.json  { render :json => @list.to_json(:include =>[:people]) }
    end
  end

  # GET /lists/new
  # GET /lists/new.xml
  def new
    @list = List.new
    
    if params[:query]
      @list.query = params[:query] 
      @list.people = Person.search_for(params[:query].to_s).order("surname ASC")
    end
    
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @list }
    end
  end
  
  def export
    @list = List.find(params[:id])
    
    @file = 'excel_export' + Time.now.to_i.to_s + '.xls'
    @file = Rails.root.join('tmp', @file)

    book = Spreadsheet::Workbook.new
    sheet = book.create_worksheet
    sheet.name = @list.title
    
    #alter people to file
    @people = []
    if @list.query.nil?
      @people = @list.people
    else
      @people = Person.search_for(@list.query).order("surname ASC")
    end

    if @people.count > 0   
      
      @keys = [
        "firstname", 
        "surname", 
        "email", 
        "phone", 
        "street", 
        "number", 
        "PLZ", 
        "city", 
        "province",
        "facebook", 
        "twitter",
        "website"
      ]
      
      #assign basic_data
      @keys.each_with_index do |val, index|
        
        #setting the titles
        sheet[0,index] = val        
        
        #setting the value for each person
        @people.each_with_index do |per, pindex|
          
          if val == "street" || val == "number" || val == "plz" || val == "city" || val == "province"
            sheet[pindex+1, index] = per.address[val] if !per.address.nil?
          else
            sheet[pindex+1, index] = per[val]
          end
        end
      end
      
      #assign field_values
      Field.all.each_with_index do |field, index|
        
        #setting the titles
        sheet[0,@keys.count+index] = field.label  
        
        #setting the value for each person
        @people.each_with_index do |per, pindex|
          field_value = Fieldvalue.find(:first, :conditions => {:field_id => field.id, :person_id => per.id})
          sheet[pindex+1,@keys.count+index] = field_value.value if !field_value.nil?
          
        end
        
      end
      
      #title_color
      my_format = Spreadsheet::Format.new :weight => :bold
      
      sheet.row(0).default_format = my_format
    
      book.write @file
      send_file @file, :type => 'application/vnd.ms-excel', :disposition => 'inline'
    else
      redirect_to(lists_url, :alert => 'Diese Liste enthaelt keine Personen und kann deshalb gar nicht exportiert werden!')
    end
        
  end
  
  # GET /lists/1/edit
  def edit
    @list = List.find(params[:id])
  end
  
  # POST /lists
  # POST /lists.xml
  def create
    
    #if it's a dynamic list, we do not have to save the people
    params[:list].delete(:query) if params[:list][:query] == ""
    
    all_people = []
    
    if params[:list][:query].nil?
      #find people
  
      people_ids = params[:people].split(";")   
      people_ids.each do |pe|
        
        pe = pe.to_i
        
        if pe
          all_people << Person.find(pe) if Person.where(:id => pe).count == 1
        end
      end
    end
    
    @list = List.new(params[:list])
    @list.people = all_people
    
    respond_to do |format|
      if @list.save
        format.html { redirect_to(lists_url, :notice => 'List was successfully created.') }
        format.xml  { render :xml => @list, :status => :created, :location => @list }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @list.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /lists/1
  # PUT /lists/1.xml
  def update
    
    #find people
    all_people = []

    people_ids = params[:people].split(";")   
    people_ids.each do |pe|
      
      pe = pe.to_i
      
      if pe
        all_people << Person.find(pe) if Person.where(:id => pe).count == 1
      end
    end
    
    @list = List.find(params[:id])
    @list.people = all_people

    respond_to do |format|
      if @list.update_attributes(params[:list])
        format.html { redirect_to(lists_url, :notice => 'List was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @list.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /lists/1
  # DELETE /lists/1.xml
  def destroy
    @list = List.find(params[:id])
    @list.destroy

    respond_to do |format|
      format.html { redirect_to(lists_url) }
      format.xml  { head :ok }
    end
  end
end
