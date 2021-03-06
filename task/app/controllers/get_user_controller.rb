class GetUserController < ApplicationController	
	
	skip_before_action :verify_authenticity_token
 
	def get_user_details		
		
		@user = current_user

		render json: {status: 'SUCCESS', message: 'user details', data: @user}, status: :ok
		
	end
	
	def get_users		
		
		@user = User.where("email not in (?)", current_user['email'])

		render json: {status: 'SUCCESS', message: 'user details', data: @user}, status: :ok
		
	end
	
end 
