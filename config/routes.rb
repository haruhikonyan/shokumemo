Rails.application.routes.draw do
  root to: 'top#index'
  post 'kari_login', to: 'top#kari_login'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  devise_scope :user do
    get 'sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_session
  end

  # 仮 sucaffold そのまま置いている
  resources :dishes, only: [:index, :show, :new, :edit]
  resources :meals, only: [:index, :show, :new, :edit]

  namespace :api, defaults: { format: :json }  do
    namespace 'v1' do
      resources :dishes, only: [:create, :update, :destroy]
      resources :meals, only: [:create, :update, :destroy]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
