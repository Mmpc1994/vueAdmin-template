// import Cookies from 'js-cookie';
import * as Cookies from 'js-cookie';
import { UserLoginResponseDTO } from '../views/user/dtos/user-login.dto';

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const SessionKey = 'campus-user-info';

export function setUserInfo(userInfo: UserLoginResponseDTO) {
  if (!userInfo) throw new Error('初始化用户信息失败');
  return sessionStorage.setItem(SessionKey, JSON.stringify(userInfo));
}

export function getUserInfo():UserLoginResponseDTO {
  try {
    const _ = sessionStorage.getItem(SessionKey);
    if (_) return JSON.parse(_);
    throw new Error('获取用户信息失败');
  } catch (e) {
    throw new Error('获取用户信息失败');
  }
}