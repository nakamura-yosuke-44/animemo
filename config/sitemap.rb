SitemapGenerator::Sitemap.default_host = 'https://kodoguru.com'
SitemapGenerator::Sitemap.sitemaps_host = ENV['SITEMAPS_HOST']
SitemapGenerator::Sitemap.adapter = SitemapGenerator::AwsSdkAdapter.new(
  ENV['AWS_BUCKET_NAME'],
  aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
  aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
  aws_region: ENV['AWS_DEFAULT_REGION'],
)

SitemapGenerator::Sitemap.create do
  add root_path
  add shops_path
  add posts_path
  add privacy_policy_path
  add terms_of_use_path
  add features_path
end
