import { NextResponse } from 'next/server';
import os from 'os';

/**
 * System Info API
 * 提供系统信息用于性能监控
 */
export async function GET() {
  try {
    const cpus = os.cpus();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    // 获取CPU使用率（需要采样）
    const getCPUUsage = () => {
      const cpuUsage = cpus.map((cpu) => {
        const total = Object.values(cpu.times).reduce(
          (acc, time) => acc + time,
          0,
        );
        const idle = cpu.times.idle;
        return {
          model: cpu.model,
          usage: ((total - idle) / total) * 100,
        };
      });
      return cpuUsage;
    };

    // 获取进程信息
    const processMemory = process.memoryUsage();
    const processUptime = process.uptime();

    return NextResponse.json({
      success: true,
      data: {
        // CPU信息
        cpu: {
          count: cpus.length,
          model: cpus[0]?.model || 'Unknown',
          speed: cpus[0]?.speed || 0,
          usage: getCPUUsage(),
        },
        // 内存信息
        memory: {
          total: totalMemory,
          free: freeMemory,
          used: usedMemory,
          usagePercent: ((usedMemory / totalMemory) * 100).toFixed(2),
        },
        // 进程信息
        process: {
          memory: {
            rss: processMemory.rss, // 常驻集大小
            heapTotal: processMemory.heapTotal,
            heapUsed: processMemory.heapUsed,
            external: processMemory.external,
          },
          uptime: processUptime,
          pid: process.pid,
        },
        // 系统信息
        system: {
          platform: os.platform(),
          arch: os.arch(),
          hostname: os.hostname(),
          uptime: os.uptime(),
          loadavg: os.loadavg(),
        },
      },
    });
  } catch (error) {
    console.error('[System Info API] 获取系统信息失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: '获取系统信息失败',
        message: error instanceof Error ? error.message : '未知错误',
      },
      { status: 500 },
    );
  }
}
