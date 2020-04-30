class ToDoListController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index
		
		if params[:all]
			
			@to_do_list = ToDoList.all.order("id")
			
		elsif params[:latest]
		
			@to_do_list = ToDoList.where("to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') > ?", params[:latest]).order("id")
		
		elsif params[:create_date]
		
			@to_do_list = ToDoList.maximum("to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS')")
		
		end
		
		render json: {status: 'SUCCESS', message: 'ToDo List Details', data: @to_do_list}, status: :ok
		
	end
	
	def show

		@to_do_list = ToDoList.find(params[:id])

		render json: {status: 'SUCCESS', message: 'ToDo List Details', data: @to_do_list}, status: :ok
	end
	
	def create
		@to_do_list = ToDoList.new(create_params)

		if @to_do_list.save

			render json: {status: 'SUCCESS', message: 'ToDo List is added', data: @to_do_list}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create ToDo List', data: @to_do_list.errors},
			status: :unprocessable_entity
		end
	end
	
	def update 
	
		@to_do_list = ToDoList.find(params[:id])

		if @to_do_list.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated ToDo List', data: @to_do_list}, status: :ok
		else

			render json:{status: 'ERROR', message: 'Error while updating ToDo List', data: @to_do_list.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_update
		
		batch_upd_params['to_do_list'].each do |lists|
			
			@to_do_list = ToDoList.find(lists[:id])

			if @to_do_list.update_attributes(lists)

			else

				render json:{status: 'ERROR', message: 'Error while updating ToDo List', data: @to_do_list.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'ToDo List updated', data: @to_do_list}, status: :ok
		
	end
	
	def destroy
	
		@to_do_list = ToDoList.find(params[:id])

		if @to_do_list.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted ToDo List', data: @to_do_list}, status: :ok
		else

			render json:{status: 'ERROR', message: 'Error while deleting ToDo List', data: @to_do_list.errors},
			status: :unprocessable_entity
		end	
	end 
	
	private

	def create_params
		params.permit(	:task,
						:description,
						:start_date,
						:end_date,
						:comments)
	end
	
	def update_params
		params.permit(	:task,
						:description,
						:start_date,
						:end_date,
						:comments,
						:assigned_to,
						:status)
	end
	
	def batch_upd_params
	
		params.permit( :to_do_list => [	:id,
										:task,
										:description,
										:start_date,
										:end_date,
										:comments,
										:assigned_to,
										:status])
	end	
	
end