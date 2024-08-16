export type User = {
  token: string
  id: string
  account: string
  mobile: string
  avator: string
}
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'
// 个人信息
type OmitUser = Omit<User, 'token'>

export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}
// 家庭档案-患者信息
export type Patient = {
  /** 患者ID */
  id?: string
  /** 患者名称 */
  name: string
  /** 身份证号 */
  idCard: string
  /** 0不默认  1默认 */
  defaultFlag: 0 | 1
  /** 0 女  1 男 */
  gender: 0 | 1
  /** 性别文字 */
  genderValue?: string
  /** 年龄 */
  age?: number
}

// 家庭档案-患者信息列表
export type PatientList = Patient[]

// Omit 和 Pick是TS的内置类型
// Pick是从对象当中摘取一些属性
// Omit是从对象中排出一些属性，得到对象类型
// type Person = {
//   name: string
//   age: number
//   gender: 0 | 1
// }
// type OmitPerson = Omit<Person, 'age|gender'> 不要age和gender属性
// type PickPerson = Pick<Person, 'gender'> 只要gender属性
