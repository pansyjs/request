---
title: 指南
nav:
  title: 指南
  path: /guide
---

# 指南

`@pansy/request` 基于 axios 提供了一套统一的网络请求和错误处理方案。

为了更好的约束，做以下约定

## 接口数据格式

```ts
export interface ResponseData<D = any> {
  /** 接口状态码 */
  code: number;
  /** 接口返回数据 */
  data: D,
  /** 接口报错信息 */
  message: string;
  [key: string]: any;
}
```

### 基本示例

<code src="./demo/demo01.tsx" />

### 接口报错

<code src="./demo/demo02.tsx" />
