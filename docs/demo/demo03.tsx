import { Button, message } from 'antd';
import { useRequest } from '@pansy/react-hooks';
import { fetchUsername2 } from './service';

export default () => {

  const usernameRequest = useRequest(fetchUsername2, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
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
