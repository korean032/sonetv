/**
 * 动漫内容检测工具
 * 用于判断内容是否为动漫类型,以决定是否优先使用Bangumi API
 */

/**
 * 检测内容是否为动漫
 * @param title 标题
 * @param type 类型(movie/tv)
 * @param genres 类型标签
 * @returns 是否为动漫内容
 */
export function isAnimeContent(
  title?: string,
  type?: string,
  genres?: string[],
): boolean {
  // 1. 检查类型标签中是否包含动画/动漫相关关键词
  if (genres && genres.length > 0) {
    const animeGenres = ['动画', '动漫', 'Animation', 'Anime', 'アニメ'];
    const hasAnimeGenre = genres.some((genre) =>
      animeGenres.some((keyword) => genre.includes(keyword)),
    );
    if (hasAnimeGenre) {
      return true;
    }
  }

  // 2. 检查标题中是否包含动漫相关关键词
  if (title) {
    const animeKeywords = [
      '动画',
      '动漫',
      'アニメ',
      '番剧',
      '新番',
      // 常见日本动画工作室
      'TRIGGER',
      'ufotable',
      'MAPPA',
      'Bones',
      'A-1 Pictures',
      'Kyoto Animation',
      'P.A.Works',
      'Shaft',
      'Production I.G',
      'Madhouse',
      'Studio Ghibli',
      'CloverWorks',
      'WIT STUDIO',
    ];

    const titleLower = title.toLowerCase();
    const hasAnimeKeyword = animeKeywords.some((keyword) =>
      titleLower.includes(keyword.toLowerCase()),
    );
    if (hasAnimeKeyword) {
      return true;
    }
  }

  // 3. 默认返回false
  return false;
}

/**
 * 从Bangumi搜索结果中提取详情
 * @param bangumiData Bangumi搜索结果
 * @returns 格式化的详情数据
 */
export function extractBangumiDetails(bangumiData: any) {
  if (!bangumiData || !bangumiData.id) {
    return null;
  }

  return {
    id: bangumiData.id,
    name: bangumiData.name || bangumiData.name_cn || '',
    name_cn: bangumiData.name_cn || bangumiData.name || '',
    summary: bangumiData.summary || '',
    rating: bangumiData.rating?.score || 0,
    rating_count: bangumiData.rating?.total || 0,
    air_date: bangumiData.air_date || bangumiData.date || '',
    images: {
      large: bangumiData.images?.large || bangumiData.images?.common || '',
      medium: bangumiData.images?.medium || bangumiData.images?.common || '',
      small: bangumiData.images?.small || bangumiData.images?.grid || '',
    },
    type: bangumiData.type || 2, // 2 = 动画
    eps: bangumiData.eps || bangumiData.total_episodes || 0,
    source: 'bangumi',
  };
}
