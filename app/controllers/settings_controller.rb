class SettingsController < ApplicationController
  
  require 'spreadsheet'
  
  def index
  end
  
  def profile
  end
  
  def peoplefields
  	@fieldgroups = Fieldgroup.all
  end
  
  def addpeoplegroup
  	
  	group = Fieldgroup.new
  	group.name = params[:name]
 		group.save
 		 	
  	redirect_to :action => "peoplefields"
  end
  
  def import
    
  end
  
  def import_submit
    
    @fields = Fieldgroup.all
    
    uploaded_io = params[:excelfile]
    @file = uploaded_io.tempfile.path
    
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open @file

    @sheet = book.worksheet 0
    @first_row = @sheet.row(0)
    
    @file = 'excel_import' + Time.now.to_i.to_s + '.xls'
    File.open(Rails.root.join('tmp', @file), "wb") { |f| f.write(uploaded_io.read) }
    
  end
  
  def import_save
    
    @success_elements = []
    @error_elements = []
    
    #this is the match_map the user set
    params[:match] = params[:match].invert
    params[:address_attributes] = params[:address_attributes].invert
    params[:field] = params[:field].invert if !params[:field].nil?
    
    @hash_map = params[:match]
    @hash_map = params[:match].merge(params[:field])  if !params[:field].nil?
    @hash_map = @hash_map.merge(params[:address_attributes])  if !params[:address_attributes].nil?
    
    #open the excel-file
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('tmp', params[:file])
    @sheet = book.worksheet 0
    
    #we iterate over all rows
    @sheet.each 1 do |r|
      
      @cur_p = Person.new
      @cur_p.address = Address.new
      @cur_field_values = {}
      #every cell
      r.each_with_index do |content, i|
        
        #if this cell is not nil, and there is a match in the map for this column
        if !content.nil? && @hash_map.key?(i.to_s)
          
          key = @hash_map.fetch(i.to_s)
          
          #if our model has this attribute
          if @cur_p.has_attribute? key
            @cur_p.attributes = { key => content.to_s }
            
          #if not, we try if there is a field with this id or a address
          else
            
            #if there is a field with this id we add the value
            if Field.where(:id => key).count == 1
              @cur_field_values[key] = content.to_s
    				
    				#if there is a address_attribute with this key
    				else
    				  
    				  if @cur_p.address.has_attribute? key
                @cur_p.address.attributes = { key => content.to_s }
              end
              
              #if we have a city or province
      				@cur_p.address.city = City.find_or_create_by_name(content.to_s) if key == "city"
              @cur_p.address.province = Province.find_or_create_by_name(content.to_s) if key == "province"
    				  
            end
            
          end
        end
      end
      
      
      
      if @cur_p.save
        #if we save the person we can save the field_values as well
        @cur_field_values.each do |key, value|
          @value = Fieldvalue.find_or_create_by_person_id_and_field_id(@cur_p.id, key)
          @value.value = value
  				@value.save
        end
        @success_elements << @cur_p
      else
        @cur_p.destroy
        @error_elements << @cur_p.errors
      end      
      
    end
    
  end
  
end
