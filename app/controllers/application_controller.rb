# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # rubocop:disable Naming/VariableNumber
  def _render_404(e = nil)
    logger.info "Rendering 404 with excaption: #{e.message}" if e

    if request.format.to_sym == :json
      render json: { error: "404 Not Found" }, status: :not_found
    else
      render file: Rails.root.join('public/404.html'), status: 404, layout: false, content_type: 'text/html'
    end
  end
end
