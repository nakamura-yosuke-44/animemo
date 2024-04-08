Rails.application.routes.draw do
  root "top#top"
  resources :shops, only: %i[index show]

  namespace :api do
    get 'current_user/show'
    resources :posts
    resources :shops, only: %i[index show] do
      collection do
        get 'search'
      end
    end
    resource :current_user, only: [:show]
   
    resources :visits, only: [:show, :update], param: :user_id
    
  end

  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }

  get 'privacy_policy', to: 'top#privacy_policy'
  get 'terms_of_use', to: 'top#terms_of_use'

  get "up", to: "rails/health#show", as: :rails_health_check

  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
