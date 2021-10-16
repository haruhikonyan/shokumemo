app_name = 'tabelbum'
Rails.application.config.session_store :cookie_store, key: "_#{app_name}_session", expire_after: 1.month
