import{ service, formatParams, config } from '@/utils/request.js'
// 添加员工
export function CashierSubmit(params) {
    return service(
        Object.assign(formatParams("POST", params), {
            url: `${config.proxy}/journal/user/journal`
        })
    );
}
// 获取员工
export function AccountingSubmit(params) {
    return service(
        Object.assign(formatParams("POST", params), {
            url: `${config.proxy}/matter/matter/add`
        })
    );
}
// 编辑员工
export function CashierImg(params) {
    return service(
        Object.assign(formatParams("POST", params), {
            url: `${config.proxy}/matterFile/upload/+ 1,`
        })
    );
}