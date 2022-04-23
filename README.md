<h1 align="center">
  Pansy Request
</h1>

接口返回数据格式

```ts
export interface RequestData<D = any> {
  /** 状态码 */
  code: number;
  /** 数据 */
  data: D,
  /** 报错信息 */
  message: string;
  /** 错误处理类型 */
  showType?: ErrorShowType;
  [key: string]: any;
}
```
