import { Button, message } from 'antd';
import { useRequest } from '@pansy/react-hooks';
import { fetchUser } from './service';

export default () => {
  const userRequest = useRequest(fetchUser, {
    manual: true,
    onSuccess: (data) => {
      message.info(data);
    }
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
