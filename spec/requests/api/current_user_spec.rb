require 'rails_helper'

RSpec.describe "Api::CurrentUsers", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/api/current_user/show"
      expect(response).to have_http_status(:success)
    end
  end

end
