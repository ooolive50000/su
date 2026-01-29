// 本地存储数据管理

export interface Volunteer {
  id: string
  name: string
  phone: string
  email: string
  university: string
  major: string
  preferredLocation: string
  preferredTime: string
  skills: string
  motivation: string
  createdAt: string
}

export interface School {
  id: string
  schoolName: string
  province: string
  city: string
  address: string
  contactName: string
  contactPhone: string
  contactEmail: string
  studentCount: string
  teacherCount: string
  subjects: string
  description: string
  createdAt: string
}

const VOLUNTEERS_KEY = 'yixin_volunteers'
const SCHOOLS_KEY = 'yixin_schools'

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 志愿者相关操作
export function saveVolunteer(data: Omit<Volunteer, 'id' | 'createdAt'>): Volunteer {
  const volunteers = getVolunteers()
  const newVolunteer: Volunteer = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString()
  }
  volunteers.push(newVolunteer)
  localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(volunteers))
  return newVolunteer
}

export function getVolunteers(): Volunteer[] {
  const data = localStorage.getItem(VOLUNTEERS_KEY)
  return data ? JSON.parse(data) : []
}

export function deleteVolunteer(id: string): void {
  const volunteers = getVolunteers().filter(v => v.id !== id)
  localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(volunteers))
}

// 学校相关操作
export function saveSchool(data: Omit<School, 'id' | 'createdAt'>): School {
  const schools = getSchools()
  const newSchool: School = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString()
  }
  schools.push(newSchool)
  localStorage.setItem(SCHOOLS_KEY, JSON.stringify(schools))
  return newSchool
}

export function getSchools(): School[] {
  const data = localStorage.getItem(SCHOOLS_KEY)
  return data ? JSON.parse(data) : []
}

export function deleteSchool(id: string): void {
  const schools = getSchools().filter(s => s.id !== id)
  localStorage.setItem(SCHOOLS_KEY, JSON.stringify(schools))
}
