Rails.application.routes.draw do
	get 'home/index'
	devise_for :users, sign_out_via: [:get, :delete]
	root to: 'home#index'
	resources 	:to_do_list
				:to_do_dump
	
	resources :get_user do
		match :get_user_details, via: [:get],  on: :collection
		match :get_users, via: [:get],  on: :collection

	end 
	
	resources :to_do_list do
		match :batch_update, via: [:post],  on: :collection
	end 
	
end
