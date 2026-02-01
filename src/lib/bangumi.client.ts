'use client';

export interface BangumiCalendarData {
  weekday: {
    en: string;
    cn?: string;
    ja?: string;
    id?: number;
  };
  items: {
    id: number;
    name: string;
    name_cn?: string;
    rating?: {
      total?: number;
      count?: Record<string, number>;
      score?: number;
    };
    air_date?: string;
    air_weekday?: number;
    rank?: number;
    images?: {
      large?: string;
      common?: string;
      medium?: string;
      small?: string;
      grid?: string;
    };
    collection?: {
      doing?: number;
    };
    url?: string;
    type?: number;
    summary?: string;
  }[];
}

export async function GetBangumiCalendarData(): Promise<BangumiCalendarData[]> {
  const response = await fetch('/api/proxy/bangumi?path=calendar');
  const data = await response.json();
  return data;
}

/**
 * 搜索Bangumi动漫
 * @param query 搜索关键词
 * @param type 类型(2=动画)
 * @returns 搜索结果
 */
export async function searchBangumi(query: string, type = '2') {
  try {
    const response = await fetch(
      `/api/bangumi/search?q=${encodeURIComponent(query)}&type=${type}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Bangumi搜索失败:', error);
    return { success: false, data: [], error: '搜索失败' };
  }
}

/**
 * 获取Bangumi详情(优先于TMDB用于动漫内容)
 * @param query 搜索关键词
 * @returns Bangumi详情或null
 */
export async function getBangumiDetailsWithPriority(query: string) {
  try {
    const result = await searchBangumi(query);
    if (result.success && result.data && result.data.length > 0) {
      // 返回第一个匹配结果
      return result.data[0];
    }
    return null;
  } catch (error) {
    console.error('获取Bangumi详情失败:', error);
    return null;
  }
}
