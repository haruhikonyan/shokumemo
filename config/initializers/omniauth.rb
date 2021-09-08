Rails.application.config.middleware.use OmniAuth::Builder do
  # TODO: env 名は仮置きなので KEY SECRET はそのプロバイダにあった適切な名前に変更
  provider :twitter, ENV['TWITTER_API_KEY'], ENV['TWITTER_API_SECRET'], callback_url: ENV['TWITTER_COLLBACK_URL']
  provider :facebook, ENV['FACEBOOK_API_KEY'], ENV['FACEBOOK_API_SECRET'], callback_url: ENV['FACEBOOK_COLLBACK_URL']
  provider :google, ENV['GOOGLE_API_KEY'], ENV['GOOGLE_API_SECRET'], callback_url: ENV['GOOGLE_COLLBACK_URL']
  provider :line, ENV['LINE_API_KEY'], ENV['LINE_API_SECRET'], callback_url: ENV['LINE_COLLBACK_URL']
end
