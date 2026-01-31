/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Cat,
  Clover,
  Film,
  Globe,
  Home,
  MoreHorizontal,
  PlaySquare,
  Radio,
  Search,
  Sparkles,
  Star,
  Tv,
  X,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FastLink } from './FastLink';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { useSite } from './SiteProvider';

interface NavItem {
  icon: any;
  label: string;
  href: string;
  color: string;
  gradient: string;
}

interface ModernNavProps {
  showAIButton?: boolean;
  onAIButtonClick?: () => void;
}

export default function ModernNav({
  showAIButton = false,
  onAIButtonClick,
}: ModernNavProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(pathname);
  const { siteName } = useSite();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const [menuItems, setMenuItems] = useState<NavItem[]>([
    {
      icon: Home,
      label: '首页',
      href: '/',
      color: 'text-green-500',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Search,
      label: '搜索',
      href: '/search',
      color: 'text-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Globe,
      label: '源浏览器',
      href: '/source-browser',
      color: 'text-emerald-500',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: Film,
      label: '电影',
      href: '/douban?type=movie',
      color: 'text-red-500',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: Tv,
      label: '剧集',
      href: '/douban?type=tv',
      color: 'text-blue-600',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      icon: PlaySquare,
      label: '短剧',
      href: '/shortdrama',
      color: 'text-purple-500',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      icon: Cat,
      label: '动漫',
      href: '/douban?type=anime',
      color: 'text-pink-500',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Clover,
      label: '综艺',
      href: '/douban?type=show',
      color: 'text-orange-500',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: Radio,
      label: '直播',
      href: '/live',
      color: 'text-teal-500',
      gradient: 'from-teal-500 to-cyan-500',
    },
  ]);

  useEffect(() => {
    const runtimeConfig = (window as any).RUNTIME_CONFIG;
    if (runtimeConfig?.CUSTOM_CATEGORIES?.length > 0) {
      setMenuItems((prevItems) => [
        ...prevItems,
        {
          icon: Star,
          label: '自定义',
          href: '/douban?type=custom',
          color: 'text-yellow-500',
          gradient: 'from-yellow-500 to-amber-500',
        },
      ]);
    }
  }, []);

  useEffect(() => {
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;
    setActive(fullPath);
  }, [pathname, searchParams]);

  const isActive = (href: string) => {
    const typeMatch = href.match(/type=([^&]+)/)?.[1];
    const decodedActive = decodeURIComponent(active);
    const decodedHref = decodeURIComponent(href);

    return (
      decodedActive === decodedHref ||
      (decodedActive.startsWith('/douban') &&
        typeMatch &&
        decodedActive.includes(`type=${typeMatch}`))
    );
  };

  return (
    <>
      {/* Desktop Bottom Floating Dock - iOS/macOS Style */}
      <nav className='hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center gap-2 p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/10 transition-all duration-300 hover:scale-105 hover:bg-white/20 dark:hover:bg-black/30'>
        {/* Navigation Items */}
        <div className='flex items-center gap-1'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <FastLink
                key={item.label}
                href={item.href}
                useTransitionNav
                onClick={() => setActive(item.href)}
                className='group relative flex items-center justify-center'
              >
                {/* Tooltip */}
                <span className='absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm'>
                  {item.label}
                </span>

                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    active
                      ? 'bg-white dark:bg-white text-black shadow-lg scale-110'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:scale-110'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-black' : ''}`} />
                </div>

                {/* Active Indicator Dot (Optional, removed for clean circle style) */}
              </FastLink>
            );
          })}
        </div>

        {/* Divider */}
        <div className='w-px h-8 bg-gray-300/30 dark:bg-white/20 mx-1' />

        {/* Right Side Actions */}
        <div className='flex items-center gap-2'>
          {showAIButton && onAIButtonClick && (
            <button
              onClick={onAIButtonClick}
              className='relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group'
              aria-label='AI 推荐'
            >
              <span className='absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm'>
                AI 助理
              </span>
              <Sparkles className='h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform' />
            </button>
          )}

          <div className='relative group'>
            <span className='absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm'>
              主题
            </span>
            <ThemeToggle />
          </div>

          <div className='relative group'>
            <span className='absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm'>
              用户
            </span>
            <UserMenu />
          </div>
        </div>
      </nav>

      {/* More Menu Modal - Render outside nav to avoid z-index issues */}
      {showMoreMenu && (
        <div
          className='md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm'
          style={{ zIndex: 2147483647 }}
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className='absolute bottom-20 left-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/30 overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                全部分类
              </h3>
              <button
                onClick={() => setShowMoreMenu(false)}
                className='p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors'
              >
                <X className='w-5 h-5 text-gray-600 dark:text-gray-400' />
              </button>
            </div>

            {/* All menu items in grid */}
            <div className='grid grid-cols-4 gap-4 p-4'>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <FastLink
                    key={item.label}
                    href={item.href}
                    useTransitionNav
                    onClick={() => {
                      setActive(item.href);
                      setShowMoreMenu(false);
                    }}
                    className='flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 active:scale-95 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-2xl ${
                        active
                          ? `bg-linear-to-br ${item.gradient}`
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          active
                            ? 'text-white'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        active ? item.color : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {item.label}
                    </span>
                  </FastLink>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation - Netflix Full-Width Style with Light Mode Support */}
      <nav
        className='md:hidden fixed left-0 right-0 z-40 bg-white/80 dark:bg-black/95 backdrop-blur-lg border-t border-black/5 dark:border-white/5 shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/40'
        style={{
          bottom: 0,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className='flex items-center justify-around px-2 py-2'>
          {/* Show first 4 items + More button */}
          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <FastLink
                key={item.label}
                href={item.href}
                useTransitionNav
                onClick={() => setActive(item.href)}
                className='flex flex-col items-center justify-center min-w-[60px] flex-1 py-2 px-1 transition-all duration-200 active:scale-95'
              >
                <Icon
                  className={`w-6 h-6 mb-1 transition-colors duration-200 ${
                    active ? item.color : 'text-gray-600 dark:text-gray-400'
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    active ? item.color : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </FastLink>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setShowMoreMenu(true)}
            className='flex flex-col items-center justify-center min-w-[60px] flex-1 py-2 px-1 transition-all duration-200 active:scale-95'
          >
            <MoreHorizontal className='w-6 h-6 mb-1 text-gray-600 dark:text-gray-400' />
            <span className='text-[10px] font-medium text-gray-600 dark:text-gray-400'>
              更多
            </span>
          </button>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className='hidden h-16' />
      <div className='md:hidden h-20' />
    </>
  );
}
