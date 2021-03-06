import { Button, message } from 'antd';
import { useRequest } from '@pansy/react-hooks';
import { fetchUsername1 } from './service';

export default () => {

  const usernameRequest = useRequest(fetchUsername1, {
    manual: true,
    onSuccess: (data) => {
      message.info(JSON.stringify(data));
    }
  })

  const handleClick = () => {
    usernameRequest.run();
  }

  return (
    <>
      <Button onClick={handleClick}>
        获取用户名
      </Button>
    </>
  )
}
