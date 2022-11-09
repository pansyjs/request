---
title: 指南
nav:
  title: 指南
  path: /guide
---

# 指南

`@pansy/request` 基于 axios 提供了一套统一的网络请求和错误处理方案。

为了规范和更好的开发体验，做以下约定

## 接口数据格式

```ts
enum ErrorShowType {
  /** 不做处理 */
  SILENT = 0,
  /** 全局提示 - 警告 */
  WARN_MESSAGE = 1,
  /** 全局提示 - 异常 */
  ERROR_MESSAGE = 2,
  /** 通知提醒 */
  NOTIFICATION = 3,
  /** 重定向 */
  REDIRECT = 9,
}

interface ResponseData<D = any> {
  /** 接口状态码 */
  code: number;
  /** 接口返回数据 */
  data: D,
  /** 接口报错信息 */
  message: string;
  /** 接口报错处理类型 */
  showType: ErrorShowType;
  [key: string]: any;
}
```

## 处理报错

约定使用 showType 处理接口异常

1. 可在接口返回 `showType` 去处理异常
2. 也可在查询参数里去 设置 `showType` 去处理异常，优先级最高

例如：

```ts
{
  code: 4000001,
  message: '用户不存在',
  showType: ErrorShowType.WARN_MESSAGE
}
```

```ts
import { setConfig, request } from '@pansy/request';

request(`/api/*`, {
  params: {
    showType: ErrorShowType.WARN_MESSAGE
  }
})
```

## 代码示例

### 基本示例

<code src="./demo/demo01.tsx"></code>

### 获取后端完成的数据

<code src="./demo/demo02.tsx" ></code>

### 获取 Response 数据

<code src="./demo/demo03.tsx" ></code>

### 接口报错

<code src="./demo/demo04.tsx"></code>
