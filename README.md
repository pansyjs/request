<h1 align="center">
  Pansy Request
</h1>

<div align="center">
基于 <a href="https://axios-http.com/zh">axios</a> 的统一网络请求和错误处理方案。
</div>


接口返回数据格式

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
