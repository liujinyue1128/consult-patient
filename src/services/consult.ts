import { request } from '@/utils/request.ts'
import type {
  DoctorPage,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  KnowledgeParams,
  KnowledgePage,
  TopDep,
  Image,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  PartialConsult,
  ConsultOrderListParams,
  ConsultOrderPage,
  MedicinePage,
  MedicalParams,
  MedicineDetail,
  DoctorOrderType,
  DoctorParams
} from '@/types/consult.d.ts'
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge/', 'get', params)
// 科室信息数据
export const getAllDep = () => request<TopDep[]>('/dep/all')

// 上传图片接口
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'post', fd)
}

// 获取推荐关注医生
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

// 关注/取消关注api
export const followOrUnfollow = (id: string, type) => request('/like', 'post', { id, type })
// 拉取预支付订单信息
// 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)

// 生成订单id
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)

export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  ordeId: string
  payCallback: string
}) => request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)

export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)

export const getMedicinePage = (params: MedicalParams) => {
  return request<MedicinePage>('patient/medicine', 'GET', params)
}

export const getMedicineDetail = (id: string) => {
  return request<MedicineDetail>(`patient/medicine/${id}`, 'GET')
}

export const getFindDoctorPage = (params: DoctorParams) => {
  return request<DoctorOrderType>('/patient/search/doc', 'get', params)
}
