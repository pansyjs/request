import { useEffect } from 'react'
import { Button } from '@arco-design/web-react'
import apis from '@/apis'

function App() {
  useEffect(() => {
    apis.user.fetchList()
      .then((res: any) => {
        console.log(res)
      })
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <Button>点击</Button>
    </div>
  )
}

export default App
