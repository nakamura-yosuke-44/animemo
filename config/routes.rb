Rails.application.routes.draw do
  root "top#top"
  resources :shops, only: %i[index show]
  resources :posts, only: %i[index]
  namespace :api do
    get 'current_user', to: 'current_users#show'
    get 'my_list', to: 'my_pages#my_list'
    resources :posts
    resources :comments, only: %i[index create destroy] do
      resource :replies, only: %i[index create destroy], controller: 'replies'
      get 'replies', to: 'replies#index'
    end

    resources :profiles, param: :user_name, only: [:show, :update]
    get 'profiles/:user_name/posts', to: 'profiles#user_posts'

    post 'profiles/:user_name/relationships', to: 'relationships#create'
    delete 'profiles/:user_name/relationships', to: 'relationships#destroy'
    get 'follow/followings', to: 'relationships#followings'
    get 'follow/followers', to: 'relationships#followers'
    get 'follow_posts', to: 'relationships#follow_posts'

    get 'notifications', to: 'notifications#unchecked_notifications'

    resources :likes, only: [:create, :destroy]
    resources :shops, only: %i[index show] do
      collection do
        get 'search'
        post :nearest
      end
    end
    resource :current_user, only: %i[show]
    resources :visits, only: %i[show update], param: :user_id
  end

  devise_for :users, controllers: {
    omniauth_callbacks: 'omniauth_callbacks',
    registrarions: 'users/registrations'
  }

  get 'privacy_policy', to: 'top#privacy_policy'
  get 'terms_of_use', to: 'top#terms_of_use'
  get 'features', to: 'top#features'

  get "up", to: "rails/health#show", as: :rails_health_check

  get 'my_list', to: 'my_pages#my_list'

  get 'profiles/:user_name', to: 'profiles#show', as: :user_profile

  get 'follow', to: 'relationships#show'

  get 'follow_posts', to: 'relationships#follow_posts'

  resources :notifications, only: %i[index]

  resources :contacts, only: [:new, :create]

  get '/sitemap', to: redirect("#{ENV['SITEMAPS_HOST']}/sitemap.xml.gz")

  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
