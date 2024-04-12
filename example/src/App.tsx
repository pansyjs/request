import { Button, Divider } from '@arco-design/web-react'
import apis from '@/apis'

function App() {
  const handleNormal = () => {
    apis.user.fetchList()
      .then((res) => {
        console.log(res)
      })
  }

  const handleDataCodeError = () => {
    apis.user.dataError()
      .then((res) => {
        console.log(res)
      })
  }

  const handleHttpCodeError = () => {
    apis.user.httpError()
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={handleNormal}>正常请求</Button>
      <Divider />
      <Button onClick={handleDataCodeError}>数据状态码异常请求</Button>
      <Divider />
      <Button onClick={handleHttpCodeError}>Http状态码异常请求</Button>
    </div>
  )
}

export default App
