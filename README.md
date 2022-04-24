<h1 align="center">
  Pansy Request
</h1>

<div align="center">
基于 <a href="https://axios-http.com/zh">axios</a> 的统一网络请求和错误处理方案。
</div>


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
  showType: ErrorShowType;
  [key: string]: any;
}
```
