module ApplicationHelper
  def flash_background_color(type)
    case type.to_sym
    when :notice then "bg-green-500"
    when :alert  then "bg-red-500"
    when :error  then "bg-yellow-500"
    else "bg-gray-500"
    end
  end

  def default_meta_tags
    {
      site: 'こどぐるサーチ',
      title: '孤独のグルメの店舗検索・投稿サービス',
      reverse: true,
      charset: 'utf-8',
      description: 'こどぐるサーチでは、孤独のグルメに登場した店舗を検索したり、写真や感想を投稿したりできます。',
      keywords: '孤独のグルメ,五郎,グルメ',
      canonical: request.original_url,
      separator: '|',
      og: {
        site_name: :site,
        title: :title,
        description: :description,
        type: 'website',
        url: request.original_url,
        image: image_url('ogp.png'),
        local: 'ja-JP'
      },
      
      twitter: {
        card: 'summary_large_image',
        site: '@kodoguru_search',
        image: image_url('ogp.png')
      }
    }
  end
end
