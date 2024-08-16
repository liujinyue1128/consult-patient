import { request } from '@/utils/request.ts'
import type { User, CodeType, UserInfo, PatientList, Patient } from '@/types/user.d.ts'
// 密码登录
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'post', { mobile, password })
}
// 验证码登录
export const loginByCode = (mobile: string, type: CodeType) => {
  return request<User>('/code', 'get', { mobile, type })
}
// 登录
export const login = (mobile: string, code: string) =>
  request<User>('/login', 'post', { mobile, code })

// 获取用户信息
export const getUserInfo = () => request<UserInfo>('/patient/myUser')

// 获取患者列表信息
export const getPatientList = () => request<PatientList>('/patient/mylist')

// 添加患者信息
export const addPatient = (patient: Patient) => request('/patient/add', 'POST', patient)

// 编辑患者信息
export const editPatient = (patient: Patient) => request('/patient/update', 'put', patient)

// 删除患者信息
export const delPatient = (id: string) => request(`/patient/del/${id}`, 'DELETE')

// 查询患者详情
export const getPatientDetail = (id: string) => request<Patient>(`/patient/info/${id}`)

// 三方登录
export const loginByQQ = (openId: string) =>
  request<User>('/login/thirdparty', 'post', {
    openId,
    source: 'qq'
  })
