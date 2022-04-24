import { Button, message } from 'antd';
import { useRequest } from '@pansy/react-hooks';
import { fetchUsername } from './service';

export default () => {

  const usernameRequest = useRequest(fetchUsername, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
      // message.info(data);
    }
  })

  const handleClick = () => {
    usernameRequest.run();
  }

  return (
    <Button onClick={handleClick}>
      获取用户名
    </Button>
  )
}
