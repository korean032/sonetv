/**
 * 智能搜索变体生成器
 * 用于生成不同格式的搜索关键词,提升搜索准确率
 */

/**
 * 生成搜索变体
 * @param query 原始搜索关键词
 * @returns 搜索变体数组
 */
export function generateSearchVariants(query: string): string[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const variants = new Set<string>();
  const trimmedQuery = query.trim();

  // 1. 添加原始查询
  variants.add(trimmedQuery);

  // 2. 去除空格变体
  const noSpaces = trimmedQuery.replace(/\s+/g, '');
  if (noSpaces !== trimmedQuery) {
    variants.add(noSpaces);
  }

  // 3. 添加空格变体(在中英文之间)
  const withSpaces = trimmedQuery
    .replace(/([a-zA-Z])([^\sa-zA-Z])/g, '$1 $2')
    .replace(/([^\sa-zA-Z])([a-zA-Z])/g, '$1 $2');
  if (withSpaces !== trimmedQuery) {
    variants.add(withSpaces);
  }

  // 4. 去除标点符号变体
  const noPunctuation = trimmedQuery.replace(/[^\w\s\u4e00-\u9fa5]/g, '');
  if (noPunctuation !== trimmedQuery && noPunctuation.length > 0) {
    variants.add(noPunctuation);
  }

  // 5. 季度/集数变体处理
  const seasonVariants = generateSeasonVariants(trimmedQuery);
  seasonVariants.forEach((v) => variants.add(v));

  // 6. 年份变体(去除年份)
  const noYear = trimmedQuery.replace(/\s*\(?\d{4}\)?/g, '').trim();
  if (noYear !== trimmedQuery && noYear.length > 0) {
    variants.add(noYear);
  }

  // 7. 常见别名替换
  const aliasVariants = generateAliasVariants(trimmedQuery);
  aliasVariants.forEach((v) => variants.add(v));

  // 过滤掉过短的变体(少于2个字符)
  return Array.from(variants).filter((v) => v.length >= 2);
}

/**
 * 生成季度/集数变体
 * @param query 查询字符串
 * @returns 季度变体数组
 */
function generateSeasonVariants(query: string): string[] {
  const variants: string[] = [];

  // 匹配 "第X季" "Season X" "S0X" 等格式
  const seasonPatterns = [/第(\d+)季/g, /Season\s*(\d+)/gi, /S0?(\d+)/g];

  seasonPatterns.forEach((pattern) => {
    const match = query.match(pattern);
    if (match) {
      // 生成不同格式的季度表示
      const seasonNum = match[0].match(/\d+/)?.[0];
      if (seasonNum) {
        const baseQuery = query.replace(pattern, '').trim();
        variants.push(`${baseQuery} 第${seasonNum}季`);
        variants.push(`${baseQuery} Season ${seasonNum}`);
        variants.push(`${baseQuery} S${seasonNum.padStart(2, '0')}`);
        variants.push(baseQuery); // 不带季度的版本
      }
    }
  });

  return variants;
}

/**
 * 生成常见别名变体
 * @param query 查询字符串
 * @returns 别名变体数组
 */
function generateAliasVariants(query: string): string[] {
  const variants: string[] = [];

  // 常见别名映射
  const aliasMap: Record<string, string[]> = {
    鬼灭之刃: ['鬼滅之刃', 'Demon Slayer'],
    进击的巨人: ['進擊的巨人', 'Attack on Titan'],
    咒术回战: ['咒術回戰', 'Jujutsu Kaisen'],
    间谍过家家: ['間諜過家家', 'SPY×FAMILY'],
    我的英雄学院: ['我的英雄學院', 'My Hero Academia'],
  };

  // 检查是否匹配任何别名
  Object.entries(aliasMap).forEach(([key, aliases]) => {
    if (query.includes(key)) {
      aliases.forEach((alias) => {
        variants.push(query.replace(key, alias));
      });
    }
  });

  return variants;
}

/**
 * 对搜索结果去重
 * @param results 搜索结果数组
 * @param keyExtractor 提取唯一键的函数
 * @returns 去重后的结果
 */
export function deduplicateResults<T>(
  results: T[],
  keyExtractor: (item: T) => string,
): T[] {
  const seen = new Set<string>();
  const deduplicated: T[] = [];

  results.forEach((item) => {
    const key = keyExtractor(item);
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(item);
    }
  });

  return deduplicated;
}

/**
 * 并行执行搜索变体
 * @param variants 搜索变体数组
 * @param searchFn 搜索函数
 * @returns 合并后的搜索结果
 */
export async function executeParallelSearch<T>(
  variants: string[],
  searchFn: (query: string) => Promise<T[]>,
): Promise<T[]> {
  // 限制并发数量,避免过多请求
  const maxConcurrent = 3;
  const results: T[] = [];

  // 分批执行
  for (let i = 0; i < variants.length; i += maxConcurrent) {
    const batch = variants.slice(i, i + maxConcurrent);
    const batchResults = await Promise.allSettled(
      batch.map((variant) => searchFn(variant)),
    );

    batchResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        results.push(...result.value);
      }
    });
  }

  return results;
}
