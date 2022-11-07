/**
 * desc: 请在控制台查看
 */
import { Button } from 'antd';
import { useRequest } from '@pansy/react-hooks';
import { fetchUser2 } from './service';

export default () => {
  const userRequest = useRequest(fetchUser2, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
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
