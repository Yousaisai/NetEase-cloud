/*
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-23 10:21:52
 * @LastEditTime: 2020-10-23 11:47:24
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken(val) {
    return Cookies.get(val)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
export function setCookie(name, value) {
    return Cookies.set(name, value)
}



export function removeCookie(val) {
    return Cookies.remove(val)
}