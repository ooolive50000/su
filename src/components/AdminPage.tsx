import { useState, useEffect } from 'react'
import { 
  Heart, 
  Users, 
  School, 
  Trash2, 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  RefreshCw,
  Loader2
} from 'lucide-react'
import { getVolunteers, getSchools, deleteVolunteer, deleteSchool, Volunteer, School as SchoolType } from '../lib/supabase'

interface AdminPageProps {
  onBack: () => void
}

export function AdminPage({ onBack }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState<'volunteers' | 'schools'>('volunteers')
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [schools, setSchools] = useState<SchoolType[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const [volunteersData, schoolsData] = await Promise.all([
      getVolunteers(),
      getSchools()
    ])
    setVolunteers(volunteersData)
    setSchools(schoolsData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDeleteVolunteer = async (id: number) => {
    if (confirm('确定要删除这条记录吗？')) {
      const success = await deleteVolunteer(id)
      if (success) {
        loadData()
      }
    }
  }

  const handleDeleteSchool = async (id: number) => {
    if (confirm('确定要删除这条记录吗？')) {
      const success = await deleteSchool(id)
      if (success) {
        loadData()
      }
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                返回首页
              </button>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-warm flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
                </div>
                <span className="font-bold text-foreground">管理后台</span>
                <span className="text-xs text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded">Supabase</span>
              </div>
            </div>
            <button 
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-muted rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              刷新数据
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="card flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{volunteers.length}</div>
              <div className="text-muted-foreground">志愿者报名</div>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
              <School className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{schools.length}</div>
              <div className="text-muted-foreground">学校入驻申请</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('volunteers')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'volunteers' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              志愿者列表
            </div>
          </button>
          <button
            onClick={() => setActiveTab('schools')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'schools' 
                ? 'bg-secondary text-secondary-foreground' 
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <School className="w-4 h-4" />
              学校列表
            </div>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="card text-center py-12">
            <Loader2 className="w-8 h-8 mx-auto mb-4 text-primary animate-spin" />
            <p className="text-muted-foreground">加载数据中...</p>
          </div>
        )}

        {/* Content */}
        {!loading && activeTab === 'volunteers' && (
          <div className="space-y-4">
            {volunteers.length === 0 ? (
              <div className="card text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">暂无志愿者报名记录</p>
              </div>
            ) : (
              volunteers.map((volunteer) => (
                <div key={volunteer.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {volunteer.name[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{volunteer.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          报名时间：{formatDate(volunteer.created_at)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => volunteer.id && handleDeleteVolunteer(volunteer.id)}
                      className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{volunteer.phone}</span>
                    </div>
                    {volunteer.email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{volunteer.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span>{volunteer.university} {volunteer.major && `· ${volunteer.major}`}</span>
                    </div>
                    {volunteer.preferred_location && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>意向地区：{volunteer.preferred_location}</span>
                      </div>
                    )}
                    {volunteer.preferred_time && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>意向时间：{volunteer.preferred_time}</span>
                      </div>
                    )}
                  </div>
                  
                  {(volunteer.skills || volunteer.motivation) && (
                    <div className="mt-4 pt-4 border-t border-border">
                      {volunteer.skills && (
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium text-foreground">特长技能：</span>
                          {volunteer.skills}
                        </p>
                      )}
                      {volunteer.motivation && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">支教动机：</span>
                          {volunteer.motivation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {!loading && activeTab === 'schools' && (
          <div className="space-y-4">
            {schools.length === 0 ? (
              <div className="card text-center py-12">
                <School className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">暂无学校入驻申请</p>
              </div>
            ) : (
              schools.map((school) => (
                <div key={school.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                        <School className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{school.school_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          申请时间：{formatDate(school.created_at)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => school.id && handleDeleteSchool(school.id)}
                      className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{school.province} · {school.city} {school.address && `· ${school.address}`}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>联系人：{school.contact_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{school.contact_phone}</span>
                    </div>
                    {school.contact_email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{school.contact_email}</span>
                      </div>
                    )}
                    {school.student_count && (
                      <div className="text-muted-foreground">
                        学生人数：{school.student_count}
                      </div>
                    )}
                    {school.teacher_count && (
                      <div className="text-muted-foreground">
                        教师人数：{school.teacher_count}
                      </div>
                    )}
                  </div>
                  
                  {(school.subjects || school.description) && (
                    <div className="mt-4 pt-4 border-t border-border">
                      {school.subjects && (
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium text-foreground">急需科目：</span>
                          {school.subjects}
                        </p>
                      )}
                      {school.description && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">学校简介：</span>
                          {school.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}
