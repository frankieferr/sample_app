SampleApp::Application.routes.draw do

  root 'home#index'

  #######################
  # HOME                #
  #######################
  
  get "home" => "home#index"
  

  #######################
  # CLIENTS             #
  #######################
  get "clients", to: "clients#index"
  post "clients", to: "clients#create"
  put "clients/:id", to: "clients#update"
  patch "clients/:id", to: "clients#update"
  delete "clients/:id", to: "clients#destroy"


  #######################
  # NOTICES             #
  #######################
  get "notices", to: "notices#index"
  post "notices", to: "notices#create"
  put "notices/:id", to: "notices#update"
  patch "notices/:id", to: "notices#update"
  delete "notices/:id", to: "notices#destroy"
  post "notices/order_notices" => "notices#order_notices"


  #######################
  # PLAYERS             #
  #######################
  post "players", to: "players#create"
  put "players/:id", to: "players#update"
  patch "players/:id", to: "players#update"
  delete "players/:id", to: "players#destroy"


  #######################
  # TEAMS               #
  #######################
  get "teams", to: "teams#index"
  post "teams", to: "teams#create"
  put "teams/:id", to: "teams#update"
  patch "teams/:id", to: "teams#update"
  delete "teams/:id", to: "teams#destroy"
  patch "teams/:id/accept_team" => "teams#accept_team"


  #######################
  # USERS               #
  #######################
  devise_for :users, :skip => [:registrations] 
  as :user do
    get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'
    put 'users' => 'devise/registrations#update', :as => 'user_registration'
  end

 
  #######################
  # REGISTER TEAM       #
  #######################
  get "register" => "register_team#register"
  post "register_team" => "register_team#create"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
