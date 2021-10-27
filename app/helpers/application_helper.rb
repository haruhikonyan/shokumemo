# frozen_string_literal: true

module ApplicationHelper
  def default_meta_tags
    description = '誰でも簡単日々の食事投稿ができるタベルバム。旅行先やレストランでの一品をすぐにアップロードし自分だけの食べ物アルバム(タベルバム)を作成！'
    {
      site: 'タベルバム',
      title: 'タベルバム',
      reverse: true,
      charset: 'utf-8',
      description: description,
      keywords: 'タベルバム, tabelbum, たべるばむ, taberubamu',
      canonical: request.original_url,
      separator: '&mdash;".html_safe',
      icon: [
        { href: image_url('favicon.ico') }
        # { href: image_url('icon.jpg'), rel: 'apple-touch-icon', sizes: '180x180', type: 'image/jpg' },
      ],
      og: {
        site_name: 'タベルバム',
        title: 'タベルバム',
        description: description,
        type: 'website',
        url: request.original_url,
        # TODO: それっぽい ogp 画像
        image: image_url('logo.png'),
        locale: 'ja_JP',
      },
      twitter: {
        card: 'summary_large_image'
        # site: '@sasuganaryuseki',
      }
    }
  end
end
