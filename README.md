<h1 align="center">
  @pansy/request
</h1>

<div align="center">
基于 <a href="https://axios-http.com/zh">Axios</a> 的统一网络请求和错误处理方案。
</div>

<br />

[![docs by dumi](https://img.shields.io/badge/docs%20by-dumi-blue)](https://d.umijs.org/)
[![layout](https://img.shields.io/npm/dw/@pansy/request.svg)](https://www.npmjs.com/package/@pansy/request)
[![layout](https://img.shields.io/npm/v/@pansy/request.svg)](https://www.npmjs.com/package/@pansy/request)


## 🌈 前言

后端接口一般情况下区别请求是否成功主要为以下三种情况

1. 完全按照 Http 状态码，`[200 ~ 300)` 表示成功，其他表示请求失败
2. 始终保证请求返回 Http 状态码为 `200`，根据返回数据的中约定的 code 去判断请求是否成功
3. 两者混用

为了满足第二种情况，对 `axios` 进行了改造，发布了 `@pansy/axios`，主要区别如下：

添加 `validateDataStatus` 配置项，类型定义如下

```ts
{
  // 根据请求返回的数据判定该请求是否成功
  // data 为后端返回的数据
  validateDataStatus: (data?: any) => { success: boolean; message?: string };
}
```

一个请求的响应包含以下信息 [Axios 响应结构](https://axios-http.com/zh/docs/res_schema)

```ts
interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}
```

后端返回的数据格式一般情况下都包含以下类似字段 

```ts
{
  /** 接口状态码 */
  code: number;
  /** 接口返回数据 */
  data: any;
  /** 接口报错信息 */
  message: string;
}
```

前端开发时，大多数情况下只需要消费上述数据格式中的 data，例如下面的示例中的 `{ name: 'test' }`

```ts
{
  code: 0;
  data: { name: 'test' },
  message: 'success'
}
```

## ✨ 特性

- 🌈 在 Axios 基础上进行了自己的封装，更加易用
- 🎨 支持根据接口返回数据判定请求是否成功
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件

## 📦 安装

```sh
# npm install
npm install @pansy/request --save

# yarn install
yarn add @pansy/request

# pnpm install
pnpm i @pansy/request
```

## 🔨 示例

```ts
import { request, setConfig } from '@pansy/request';

// 需要初始化
setConfig({
  baseURL: 'https://api.pansy.com'
})

export async function fetchUser(params) {
  return request<{ name: string }>('/api/user', {
    method: 'GET',
    params,
  })
}
```

接口返回数据格式

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
  showType?: ErrorShowType;
  [key: string]: any;
}
```
