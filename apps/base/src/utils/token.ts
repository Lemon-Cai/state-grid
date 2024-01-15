/*
 * @Author: CP
 * @Date: 2024-01-15 15:51:05
 * @Description: 
 */
import Cookies from 'js-cookie'

export const TokenKey = 'saber-access-token'
export const RefreshTokenKey = 'saber-refresh-token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}

