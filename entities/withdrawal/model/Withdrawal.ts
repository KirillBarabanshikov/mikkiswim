export interface Withdrawal {
  id: number
  bank: string
  recipient: string
  bik: string
  sum: number
  correspondentAccount: string
  status: string
  statusText: string
  createdAts: string
}

export interface WithdrawalRequest {
  bank: string
  recipient: string
  correspondentAccount: string
  bik: string
  sum: number
}
