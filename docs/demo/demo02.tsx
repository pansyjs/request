import { Button, message } from 'antd';
import request from './request';

export default () => {

  const handleClick = () => {
    request<string>('/api/usernameError', {
      method: 'GET',
    }).then((response) => {
      console.log(response);
    });
  }

  return (
    <Button onClick={handleClick}>
      获取用户名
    </Button>
  )
}
