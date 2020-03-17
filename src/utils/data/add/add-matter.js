import{ service, formatParams, config } from '@/utils/request.js'
// 款项收支提交
export function CashierSubmit(params) {
    return service(
        Object.assign(formatParams("POST", params), {
            url: `${config.proxy}/journal/user/journal`
        })
    );
}
// 收支事项提交
export function AccountingSubmit(params) {
    return service(
        Object.assign(formatParams("POST", params), {
            url: `${config.proxy}/matter/matter/add`
        })
    );
}
// 款项收支图片上传
export function CashierImg(params) {
    return service(
        Object.assign(formatParams("POST", params), {
            url: `${config.proxy}/matterFile/upload/+ 1,`
        })
    );
}