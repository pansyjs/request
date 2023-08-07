import { Button } from 'antd';
import { useRequest } from '@pansy/react-hooks';
import { Request } from '@pansy/request';

const { request } = new Request({
  checkAuth: () => false,
});

async function fetchUserError() {
  return request<string>('/api/userError')
}

export default () => {
  const userRequest = useRequest(fetchUserError, {
    manual: true
  })

  const handleClick = () => {
    userRequest.run();
  }

  return (
    <Button onClick={handleClick}>
      获取用户名
    </Button>
  )
}
