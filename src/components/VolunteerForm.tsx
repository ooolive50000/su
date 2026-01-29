import { useState } from 'react'
import { UserCheck, GraduationCap, Phone, Mail, MapPin, Calendar, CheckCircle, Loader2 } from 'lucide-react'
import { saveVolunteer } from '../lib/supabase'

interface VolunteerFormProps {
  onSuccess: () => void
}

export function VolunteerForm({ onSuccess }: VolunteerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    university: '',
    major: '',
    preferred_location: '',
    preferred_time: '',
    skills: '',
    motivation: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = await saveVolunteer(formData)
    
    if (result) {
      setSubmitted(true)
      setTimeout(() => {
        onSuccess()
      }, 2000)
    } else {
      setError('提交失败，请稍后重试')
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-secondary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">报名成功！</h3>
        <p className="text-muted-foreground">
          感谢您的爱心！我们会在3个工作日内与您联系，请保持电话畅通。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            姓名 <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
              placeholder="请输入姓名"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            手机号 <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
              placeholder="请输入手机号"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          邮箱
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
            placeholder="请输入邮箱"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            学校 <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              name="university"
              required
              value={formData.university}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
              placeholder="请输入学校名称"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            专业
          </label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
            placeholder="请输入专业"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            意向支教地区
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              name="preferred_location"
              value={formData.preferred_location}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground appearance-none"
            >
              <option value="">请选择地区</option>
              <option value="云南">云南</option>
              <option value="贵州">贵州</option>
              <option value="四川">四川</option>
              <option value="甘肃">甘肃</option>
              <option value="广西">广西</option>
              <option value="不限">不限地区</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            意向支教时间
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              name="preferred_time"
              value={formData.preferred_time}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground appearance-none"
            >
              <option value="">请选择时间</option>
              <option value="暑假">暑假支教</option>
              <option value="寒假">寒假支教</option>
              <option value="周末">周末支教</option>
              <option value="线上">线上支教</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          特长技能
        </label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
          placeholder="如：英语、音乐、美术、编程等"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          支教动机
        </label>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground resize-none"
          placeholder="请简单描述您参与支教的动机..."
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            提交中...
          </>
        ) : (
          '提交报名'
        )}
      </button>
      
      <p className="text-xs text-center text-muted-foreground">
        提交即表示您同意我们的服务条款和隐私政策
      </p>
    </form>
  )
}
