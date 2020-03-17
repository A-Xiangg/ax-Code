import{ service, formatParams, config } from '@/utils/request.js'
//获取日记账信息
export function GetJournal (params) {
    return service(Object.assign(formatParams('POST', params), {
        url: `${config.proxy}/chart/chart`
    }))
}
//获取用户权限
export function GetAuthority (params) {
    return service(Object.assign(formatParams('GET', params), {
        url: `${config.proxy}/chart/chart`
    }))
}
// 出纳获取客户信息
export function GetCashierCustomers (params) {
    return service(Object.assign(formatParams('GET', params), {
        url: `${config.proxy}/customer/customer`
    }))
}
// 出纳获取服务人员信息
export function GetCashierPersonnel (params) {
    return service(Object.assign(formatParams('GET', params), {
        url: `${config.proxy}/customer/customer`
    }))
}
//会计获取客户信息
export function GetAccountingCustomers (params) {
    return service(Object.assign(formatParams('GET', params), {
        url: `${config.proxy}/customer/customer`
    }))
}
//会计获取服务人员
export function GetAccountingPersonnel (params) {
    return service(Object.assign(formatParams('GET', params), {
        url: `${config.proxy}/customer/customer`
    }))
}
//会计获取收支事项
export function GetAccountingMatter (params) {
    return service(Object.assign(formatParams('GET', params), {
        url: `${config.proxy}/matter/matter/find`
    }))
}
