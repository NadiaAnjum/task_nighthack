class ToDoDumpController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index
		
		if params[:all]
			
			@to_do_dump = ToDoDump.all
		
		elsif params[:max_id]
		
			@to_do_dump = ToDoDump.maximum("id")
		
		end
		
		render json: {status: 'SUCCESS', message: 'ToDo Dump Details', data: @to_do_dump}, status: :ok
		
	end
	
	def show

		@to_do_dump = ToDoDump.find(params[:id])

		render json: {status: 'SUCCESS', message: 'ToDo Dump Details', data: @to_do_dump}, status: :ok
	end
	
end