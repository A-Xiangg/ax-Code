import { service, formatParams, config } from "@/utils/request.js";
// 登录
export function login(params) {
  return service(
    Object.assign(formatParams("POST", params), {
      url: `${config.proxy}/user/login`
    })
  );
}
// 退出
export function dropout(params) {
  return service(
    Object.assign(formatParams("GET", params), {
      url: `${config.proxy}/user/checkout`
    })
  );
}
// 获取图片验证码
export function ObtainVerificationCode(params) {
  return service(
    Object.assign(
      formatParams("GET", params, { responseType: "arraybuffer" }),
      {
        // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        url: `${config.proxy}/verificationCode/verificationCode`
      }
    )
  );
}
// 发送验证码
export function verificationCode(params) {
  return service(
    Object.assign(formatParams("POST", params), {
      url: `${config.proxy}/verificationCode/verificationCode`
    })
  );
}
//修改密码
export function changePassword(params) {
    return service(
        Object.assign(formatParams("POST", params), {
            url: `${config.proxy}/verificationCode/verificationCode`
        })
    );
}