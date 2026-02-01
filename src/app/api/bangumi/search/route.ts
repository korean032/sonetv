import { NextRequest, NextResponse } from 'next/server';

/**
 * Bangumi API 搜索代理
 * 用于搜索动漫内容并获取详情
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get('q');
  const type = searchParams.get('type') || '2'; // 默认搜索动画类型

  if (!query) {
    return NextResponse.json({ error: '缺少搜索关键词' }, { status: 400 });
  }

  try {
    // 调用Bangumi API搜索
    const searchUrl = `https://api.bgm.tv/search/subject/${encodeURIComponent(query)}?type=${type}&responseGroup=large`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'korean032/SoneTV (https://github.com/korean032/SoneTV)',
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10秒超时
    });

    if (!response.ok) {
      throw new Error(`Bangumi API error: ${response.status}`);
    }

    const data = await response.json();

    // 返回搜索结果
    return NextResponse.json({
      success: true,
      data: data.list || [],
      total: data.results || 0,
    });
  } catch (error) {
    console.error('Bangumi搜索失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '搜索失败',
        data: [],
      },
      { status: 500 },
    );
  }
}
