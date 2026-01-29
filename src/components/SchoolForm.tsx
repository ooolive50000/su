import { useState } from 'react'
import { School, Phone, Mail, MapPin, Users, BookOpen, CheckCircle, Loader2 } from 'lucide-react'
import { saveSchool } from '../lib/supabase'

interface SchoolFormProps {
  onSuccess: () => void
}

export function SchoolForm({ onSuccess }: SchoolFormProps) {
  const [formData, setFormData] = useState({
    school_name: '',
    province: '',
    city: '',
    address: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    student_count: '',
    teacher_count: '',
    subjects: '',
    description: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = await saveSchool(formData)
    
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
        <h3 className="text-xl font-bold text-foreground mb-2">申请已提交！</h3>
        <p className="text-muted-foreground">
          感谢您的信任！我们的工作人员会在5个工作日内与您联系，审核通过后即可入驻平台。
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

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          学校名称 <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            name="school_name"
            required
            value={formData.school_name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
            placeholder="请输入学校全称"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            省份 <span className="text-primary">*</span>
          </label>
          <select
            name="province"
            required
            value={formData.province}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground appearance-none"
          >
            <option value="">请选择省份</option>
            <option value="云南">云南省</option>
            <option value="贵州">贵州省</option>
            <option value="四川">四川省</option>
            <option value="甘肃">甘肃省</option>
            <option value="广西">广西壮族自治区</option>
            <option value="西藏">西藏自治区</option>
            <option value="青海">青海省</option>
            <option value="新疆">新疆维吾尔自治区</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            市/县 <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
            placeholder="请输入市或县"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          详细地址
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
            placeholder="请输入详细地址"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            联系人姓名 <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="contact_name"
            required
            value={formData.contact_name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
            placeholder="请输入联系人姓名"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            联系电话 <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              name="contact_phone"
              required
              value={formData.contact_phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
              placeholder="请输入联系电话"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          联系邮箱
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
            placeholder="请输入联系邮箱"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            学生人数
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              name="student_count"
              value={formData.student_count}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
              placeholder="在校学生人数"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            教师人数
          </label>
          <input
            type="text"
            name="teacher_count"
            value={formData.teacher_count}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
            placeholder="现有教师人数"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          急需支教科目
        </label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground"
            placeholder="如：英语、音乐、美术、体育等"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          学校情况简介
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2.5 bg-muted rounded-lg border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors text-foreground resize-none"
          placeholder="请简单介绍学校的基本情况和支教需求..."
        />
      </div>

      <button type="submit" disabled={loading} className="btn-secondary w-full disabled:opacity-50">
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            提交中...
          </>
        ) : (
          '提交申请'
        )}
      </button>
      
      <p className="text-xs text-center text-muted-foreground">
        提交即表示您同意我们的服务条款和隐私政策
      </p>
    </form>
  )
}
