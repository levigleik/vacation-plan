export interface UpdateVacationDTO {
  id: number
  title: string
  description: string
  userIds: number[]
  dates: string[]
  location: string
}
