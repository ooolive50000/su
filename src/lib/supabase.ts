import { createClient } from '@supabase/supabase-js'

declare global {
  interface ImportMeta {
    env: Record<string, string>;
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase 配置缺失！请设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY 环境变量')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据类型定义
export interface Volunteer {
  id?: number
  name: string
  phone: string
  email: string
  university: string
  major: string
  preferred_location: string
  preferred_time: string
  skills: string
  motivation: string
  created_at?: string
}

export interface School {
  id?: number
  school_name: string
  province: string
  city: string
  address: string
  contact_name: string
  contact_phone: string
  contact_email: string
  student_count: string
  teacher_count: string
  subjects: string
  description: string
  created_at?: string
}

// 志愿者相关操作
export async function saveVolunteer(data: Omit<Volunteer, 'id' | 'created_at'>): Promise<Volunteer | null> {
  const { data: result, error } = await supabase
    .from('volunteers')
    .insert([data])
    .select()
    .single()
  
  if (error) {
    console.error('保存志愿者失败:', error)
    return null
  }
  return result
}

export async function getVolunteers(): Promise<Volunteer[]> {
  const { data, error } = await supabase
    .from('volunteers')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('获取志愿者列表失败:', error)
    return []
  }
  return data || []
}

export async function deleteVolunteer(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('volunteers')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('删除志愿者失败:', error)
    return false
  }
  return true
}

// 学校相关操作
export async function saveSchool(data: Omit<School, 'id' | 'created_at'>): Promise<School | null> {
  const { data: result, error } = await supabase
    .from('schools')
    .insert([data])
    .select()
    .single()
  
  if (error) {
    console.error('保存学校失败:', error)
    return null
  }
  return result
}

export async function getSchools(): Promise<School[]> {
  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('获取学校列表失败:', error)
    return []
  }
  return data || []
}

export async function deleteSchool(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('schools')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('删除学校失败:', error)
    return false
  }
  return true
}

// 统计数据接口
export interface Stats {
  schools_count: number
  volunteers_count: number
  students_count: number
  provinces_count: number
}

// 获取统计数据
export async function getStats(): Promise<Stats> {
  // 并行获取各项统计数据
  const [schoolsRes, volunteersRes] = await Promise.all([
    supabase.from('schools').select('id, province'),
    supabase.from('volunteers').select('id')
  ])

  const schools = schoolsRes.data || []
  const volunteers = volunteersRes.data || []

  // 计算覆盖省份数量
  const provinces = new Set(schools.map(s => s.province)).size

  return {
    schools_count: schools.length,
    volunteers_count: volunteers.length,
    students_count: schools.length * 300, // 假设每所学校平均300名学生
    provinces_count: provinces
  }
}
