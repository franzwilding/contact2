class FieldsController < ApplicationController
  # GET /fields
  # GET /fields.xml
  def index
    @fields = Field.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @fields }
    end
  end

  # GET /fields/1
  # GET /fields/1.xml
  def show
    @field = Field.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @field }
    end
  end
  
  def sort

    @elements = Field.all
    @elements.each do |element|
      if !params['position'].index(element.id.to_s).nil?
        element.position = params['position'].index(element.id.to_s) + 1
        element.save
      end
    end

    render :nothing => true
  end

  # GET /fields/new
  # GET /fields/new.xml
  def new
    @field = Field.new(:fieldgroup_id => params[:group])
		
		f = Field.find(:all)
		#if we have less than one book, let's just set this position value to 1
    if f.size < 1
      @field.position = 1
    else
      @field.position = f.last.position+1
    end
		
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @field }
    end
  end

  # GET /fields/1/edit
  def edit
    @field = Field.find(params[:id])
  end

  # POST /fields
  # POST /fields.xml
  def create
    @field = Field.new(params[:field])

    respond_to do |format|
      if @field.save
        format.html { redirect_to(:controller => :settings, :action => :peoplefields, :notice => 'Field was successfully created.') }
        format.xml  { render :xml => @field, :status => :created, :location => @field }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @field.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /fields/1
  # PUT /fields/1.xml
  def update
    @field = Field.find(params[:id])

    respond_to do |format|
      if @field.update_attributes(params[:field])
        format.html { redirect_to(:controller => :settings, :action => :peoplefields, :notice => 'Field was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @field.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /fields/1
  # DELETE /fields/1.xml
  def destroy
    @field = Field.find(params[:id])
    @field.destroy

    respond_to do |format|
      format.html { redirect_to(:controller => :settings, :action => :peoplefields) }
      format.xml  { head :ok }
    end
  end
end
