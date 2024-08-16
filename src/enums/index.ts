// 问诊类型
export enum ConsultType {
  Doctor = 1,
  Fast,
  Medication
}

// 问诊时间
export enum IllnessTime {
  Week = 1,
  Month,
  HalfYear,
  More
}
// 消息类型
export enum MsgType {
  /** 文字聊天 */
  MsgText = 1,
  /** 消息聊天 */
  MsgImage = 4,
  /** 患者信息 */
  CardPat = 21,
  /** 处方信息 */
  CardPre = 22,
  /** 未评价信息 */
  CardEvaForm = 23,
  /** 已评价信息 */
  CardEva = 24,
  /** 通用通知 */
  Notify = 31,
  /** 温馨提示 */
  NotifyTip = 32,
  /** 取消提示 */
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  /** 未付款 */
  NotPayment = 1,
  /** 已付款 */
  Payment = 2,
  /** 已失效 */
  Invalid = 3
}

// 肝功能
export enum LiverFunction {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}
// 肾功能
export enum KidneyFunction {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}

// 过敏史
export enum AllergicHistory {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}
// 生育状态及计划
export enum FertilityStatus {
  /** 无 */
  Normal,
  /** 备孕中 */
  TryingToConceive,
  /** 已怀孕 */
  AlreadyPregnant,
  /** 哺乳期 */
  Breastfeeding
}

// 枚举:一组可选的常量
// enum Direction {
//   Up = 0,
//   Down = 1,
//   Left = 2,
//   Right = 3
// }

// 索引默认为0,以此类推
// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right
// }

// 给个默认值,以此类推
// enum Direction {
//   Up = 3,
//   Down,
//   Left,
//   Right
// }

// 给枚举个字符串
// enum Direction {
//   Up = 'Up',
//   Down = 'Down',
//   Left = 'Left',
//   Right = 'Right'
// }
// const changeDirection = (direction: Direction) => {
//   console.log(direction)
// }
// changeDirection(Direction.Left)
