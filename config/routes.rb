Rails.application.routes.draw do
  get 'relationships/followings'
  get 'relationships/followers'
  root "top#top"
  resources :shops, only: %i[index show]
  resources :posts, only: %i[index]
  resources :profiles, only: %i[show]
  namespace :api do
    get 'current_user/show'
    get 'my_list', to: 'my_pages#my_list'
    resources :posts
    resources :profiles, only: [:show, :update] do
      get 'posts', to: 'profiles/posts#index'
    end

    resources :likes, only: [:create, :destroy]
    resources :shops, only: %i[index show] do
      collection do
        get 'search'
        post :nearest
      end
    end
    resource :current_user, only: %i[show]
    resources :relationships, only: [:create, :destroy]
    resources :visits, only: %i[show update], param: :user_id
  end

  devise_for :users, controllers: { 
    omniauth_callbacks: 'omniauth_callbacks' 
  }

  get 'privacy_policy', to: 'top#privacy_policy'
  get 'terms_of_use', to: 'top#terms_of_use'

  get "up", to: "rails/health#show", as: :rails_health_check

  get 'my_list', to: 'my_pages#my_list'


  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
