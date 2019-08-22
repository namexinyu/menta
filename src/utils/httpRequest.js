import { RequestTransfer, toAsync } from "web-react-base-utils";
import Qs from 'qs'
const transfer = new RequestTransfer();
transfer.config = {

  AppSetting: {
    AppVersion: '1.0.0',
    AppId: 'audit',
    AppKey: 'auditweb',
    UidKey: 'AuditID',
    AppSecret: 'a323f9b6-1f04-420e-adb9-b06d142c5e63'
  }
};

export function setAuthInfo(authInfo) {
  transfer.config = { authInfo };
}

export default function request(url, param) {
  let host = process.env.NODE_ENV === 'development' ? 'http://dailyadmin.renzhichu.cn/api/' : process.env.NODE_ENV === 'sitlopment' ? 'http://testadmin.renzhichu.cn/api/' : 'http://image.static.renzhichu.cn/';
  return new Promise((resolve, reject) => {
    fetch(host + url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9'
      },
      mode: "cors",
      body: Qs.stringify(param),
      method: 'POST'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      resolve(data)
    }).catch((e) => {
      reject(e)
    });
  })
}

// export default function request(url, param) {
//   let host = process.env.NODE_ENV === 'development' ? 'http://dailyadmin.renzhichu.cn/api/' : process.env.NODE_ENV === 'sitlopment' ? 'http://testadmin.renzhichu.cn/api/' : 'http://image.static.renzhichu.cn/';
//   console.log("%c请求地址：", "color:red;", url);
//   console.log("%c请求参数：", "color:red;", param);
//   return toAsync(fetch(host + url, transfer.getRequestInit(param)));
// }