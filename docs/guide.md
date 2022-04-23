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
export interface RequestData<D = any> {
  /** 状态码 */
  code: number;
  /** 数据 */
  data: D,
  /** 报错信息 */
  message: string;
  /** 错误处理方式 */
  showType?: ErrorShowType;
  [key: string]: any;
}
```
