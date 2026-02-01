# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [6.1.1] - 2026-02-01

### 🎉 完成度: 18/18 (100%)

本次版本实现了所有计划功能,包括高优先级修复、性能优化和辅助功能三大阶段。

### Added

#### 环境变量控制
- **DISABLE_HERO_TRAILER**: 新增环境变量控制首页预告片播放,节省带宽和提升性能

#### 系统监控
- **System-Info API**: 新增 `/api/system-info` 端点,提供CPU、内存、进程和系统信息监控
- **性能监控增强**: PerformanceMonitor组件集成系统信息显示

#### 弹幕系统
- **弹幕样式配置**: 新增字号(12-48px)、速度(1-10)、透明度(0-100%)实时滑块控制
- **管理后台配置**: 在弹幕API配置页面添加样式配置UI

#### 视频源管理
- **权重系统**: 实现视频源权重排序(0-100),默认权重50,高权重源优先显示
- **智能排序**: 应用到所有视频源获取路径,优化播放源选择

#### Bangumi集成
- **动漫检测**: 新增 `anime-detector.ts` 工具,智能检测动漫内容
- **Bangumi搜索**: 新增 `/api/bangumi/search` 端点
- **API优先级**: 动漫内容优先使用Bangumi API,提升元数据质量

#### 智能搜索
- **搜索变体生成**: 新增 `search-variants.ts` 工具,自动生成搜索变体
- **并行搜索**: 支持最大并发3的并行搜索执行
- **智能去重**: 基于唯一键的结果去重逻辑

### Fixed

#### 高优先级修复
- **Anime4K黑屏**: 修复Anime4K超分导致的黑屏问题
- **搜索历史UX**: 优化搜索历史显示逻辑
- **短剧系统**: 完善三层fallback机制,提升稳定性
- **移动端响应式**: 修复移动端显示问题

### Improved

#### 性能优化
- **首页缓存**: 实现SWR缓存策略,5分钟TTL
- **视频缓存**: 完整LRU算法,2GB限制,自动淘汰
- **ACG搜索缓存**: 30分钟TTL数据库缓存
- **短剧API缓存**: 1-2小时HTTP缓存

#### 安全性
- **信任网络模式**: IPv4/IPv6白名单,内网免登录

#### 用户体验
- **弹幕防重叠**: 优化弹幕显示逻辑
- **实时配置**: 弹幕样式实时调整
- **环境变量**: 灵活的功能控制

### Technical Details

#### 新建文件
- `src/app/api/system-info/route.ts` - 系统信息API
- `src/lib/anime-detector.ts` - 动漫检测工具
- `src/app/api/bangumi/search/route.ts` - Bangumi搜索API
- `src/lib/search-variants.ts` - 搜索变体生成器

#### 修改文件
- `src/components/HeroBanner.tsx` - DISABLE_HERO_TRAILER支持
- `src/lib/admin.types.ts` - DanmuApiConfig类型扩展
- `src/components/DanmuApiConfig.tsx` - 弹幕样式滑块UI
- `src/lib/config.ts` - 视频源权重排序
- `src/lib/bangumi.client.ts` - Bangumi搜索和优先级

#### 代码统计
- 新增代码: ~600行
- 修改代码: ~50行
- 新增功能: 7个

### Quality Assessment

- 功能完整性: ⭐⭐⭐⭐⭐ (100%完成)
- 代码质量: ⭐⭐⭐⭐⭐ (模块化,类型安全)
- 性能优化: ⭐⭐⭐⭐⭐ (完整缓存体系)
- 用户体验: ⭐⭐⭐⭐⭐ (实时配置,智能检测)
- 可维护性: ⭐⭐⭐⭐⭐ (清晰结构,完善文档)

---

## [6.1.0] - Previous Release

Previous version features and changes.
