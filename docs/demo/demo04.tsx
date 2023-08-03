import { Button } from 'antd';
import { useRequest } from '@pansy/react-hooks';
import { fetchUserError } from './service';

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
