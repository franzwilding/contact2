module ApplicationHelper

	def current_controller?(c)
  	controller.controller_name == c
	end

end
