Rails.application.routes.draw do
	get 'home/index'
	devise_for :users, sign_out_via: [:get, :delete]
	root to: 'home#index'
	resources 	:to_do_list
	
	resources :get_user do
		match :get_user_details, via: [:get],  on: :collection

	end 
	
end
