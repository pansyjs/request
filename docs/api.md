---
title: API
nav:
  title: API
  path: /api
  order: 10
---

# API

## setConfig

设置请求配置参数

```ts
setConfig(config?: RequestConfig): void;
```

### RequestConfig

```ts
interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  /** 异常处理相关配置 */
  errorConfig?: ErrorConfig;
  /** 请求拦截器 */
  requestInterceptors?: RequestInterceptorTuple[];
  /** 响应拦截器 */
  responseInterceptors?: ResponseInterceptorTuple[];
}
```

|参数|描述|默认值|
|---|---|------|
|errorConfig|异常处理相关配置|`{}`|
|requestInterceptors|请求拦截器|--|
|responseInterceptors|响应拦截器|--|

#### AxiosRequestConfig

具体请查看 [请求配置](https://axios-http.com/zh/docs/req_config)

## request

请求方法

request 接收的 options 除了透传 axios 的所有 config 之外，我们还额外添加了几个属性 `skipErrorHandler`，`getResponse`，当你的某个请求想要跳过错误处理时，可以通过设置`skipErrorHandler = true` 来实现。

```ts
export interface Request {
  <T = any>(url: string, opts: RequestOptionsWithResponse): Promise<AxiosResponse<T>>;
  <T = any>(url: string, opts: RequestOptionsWithoutResponse): Promise<T>;
  // getResponse 默认是 false， 因此不提供该参数时，只返回 data
  <T = any>(url: string, opts: RequestOptions): Promise<T>;
  // 不提供 opts 时，默认使用 'GET' method，并且默认返回 data
  <T = any>(url: string): Promise<T>;
}
```
