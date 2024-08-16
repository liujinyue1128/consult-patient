type QCType = {
  Login: {
    check(): boolean
    getMe(cb: (openId: string) => void): void
  }
}

declare const QC: QCType
