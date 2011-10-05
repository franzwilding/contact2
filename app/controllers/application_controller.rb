class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :authenticate_person!
  
  def file
    #  @file = nil
    #  File.open(Rails.root.join('private', 'images', params[:path]), "r") { |f| @file = f }
    #end
    
    send_file Rails.root.join('tmp', params[:path]), :type => 'image', :disposition => 'inline'
    #send_data @file
    #send_data data_string, :filename => 'icon.jpg', :type => 'image/jpeg', :disposition => 'inline'
  end
  
end
