import { useState } from 'react'
import { 
  Shield, 
  Eye, 
  EyeOff,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'

interface LoginPageProps {
  onLoginSuccess: () => void
  onBack: () => void
}

export function LoginPage({ onLoginSuccess, onBack }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // 预设的管理员账号密码
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'yixin2024'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // 模拟登录验证延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // 登录成功，保存登录状态到localStorage
      localStorage.setItem('admin_authenticated', 'true')
      onLoginSuccess()
    } else {
      setError('用户名或密码错误')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </button>

        {/* Login Card */}
        <div className="card shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">管理后台登录</h1>
            <p className="text-muted-foreground">请输入管理员账号密码</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                用户名
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="请输入用户名"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                密码
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="请输入密码"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  登录中...
                </>
              ) : (
                '登录管理后台'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}