export interface IGuest {
  id: number
  uuid: string
  fullname: string
  address: string
  phone_number: string
  email: string
  title: string
  visit: boolean
}

export interface ICreateGuest {
  fullname: string
  address: string
  phone_number: string
  title: string
  email: string
}

export interface IRsvp {
  address: string
  visit: boolean
}
