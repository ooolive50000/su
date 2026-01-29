import { useState } from 'react'
import { 
  Heart, 
  GraduationCap, 
  Users, 
  MapPin, 
  BookOpen, 
  Gift,
  ArrowRight,
  ChevronDown,
  School,
  UserCheck,
  Calendar,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Shield,
  Settings
} from 'lucide-react'
import { Modal } from './components/Modal'
import { VolunteerForm } from './components/VolunteerForm'
import { SchoolForm } from './components/SchoolForm'
import { AdminPage } from './components/AdminPage'

function App() {
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false)
  const [schoolModalOpen, setSchoolModalOpen] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  // 如果显示管理后台，渲染AdminPage
  if (showAdmin) {
    return <AdminPage onBack={() => setShowAdmin(false)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-foreground">益心支教</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">关于我们</a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">服务内容</a>
              <a href="#impact" className="text-muted-foreground hover:text-primary transition-colors">公益影响</a>
              <a href="#stories" className="text-muted-foreground hover:text-primary transition-colors">支教故事</a>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setSchoolModalOpen(true)} className="btn-outline text-sm py-2 px-4">学校入驻</button>
              <button onClick={() => setVolunteerModalOpen(true)} className="btn-primary text-sm py-2 px-4">志愿者报名</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Heart className="w-4 h-4" fill="currentColor" />
                用爱心点亮山区教育
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight text-balance">
                让每一个山区孩子
                <span className="gradient-text block mt-2">都能拥有优质教育</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                益心支教网是聚焦贫困山区教育公平的公益信息交换平台，
                致力于连接大学生志愿者与贫困山区学校，
                共同为山区孩子铺就求知之路。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setVolunteerModalOpen(true)} className="btn-primary">
                  <UserCheck className="w-5 h-5" />
                  立即报名支教
                </button>
                <button onClick={() => setSchoolModalOpen(true)} className="btn-outline">
                  <School className="w-5 h-5" />
                  学校申请入驻
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">1,200+</div>
                  <div className="text-sm text-muted-foreground">志愿者加入</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <div className="text-3xl font-bold text-secondary">86</div>
                  <div className="text-sm text-muted-foreground">合作学校</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <div className="text-3xl font-bold text-accent">15,000+</div>
                  <div className="text-sm text-muted-foreground">受益学生</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop" 
                  alt="山区学校的孩子们在教室里学习"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-card-hover animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">教育改变命运</div>
                    <div className="text-sm text-muted-foreground">知识点亮未来</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-card-hover animate-float animate-delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">爱心传递</div>
                    <div className="text-sm text-muted-foreground">温暖每一颗心</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">关于益心支教</h2>
            <p className="section-subtitle mx-auto">
              我们相信教育是改变命运的力量，每一个孩子都值得被看见
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">我们的使命</h3>
              <p className="text-muted-foreground">
                促进教育公平，让贫困山区的孩子能够获得优质的教育资源，
                用知识点亮他们的未来之路。
              </p>
            </div>
            
            <div className="card text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">我们的愿景</h3>
              <p className="text-muted-foreground">
                搭建志愿者与山区学校之间的桥梁，让爱心与知识无障碍传递，
                共同创造美好的教育生态。
              </p>
            </div>
            
            <div className="card text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">我们的价值观</h3>
              <p className="text-muted-foreground">
                以真诚与爱心为本，坚持公益透明，用专业的态度服务每一位志愿者和学校。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">我们的服务</h2>
            <p className="section-subtitle mx-auto">
              为志愿者和学校提供全方位的支持与服务
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Volunteers */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">志愿者服务</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: MapPin, title: '支教地点匹配', desc: '根据您的意向智能匹配适合的山区学校' },
                  { icon: Calendar, title: '灵活支教时间', desc: '暑期支教、寒假支教、线上支教多种形式' },
                  { icon: BookOpen, title: '教学资源支持', desc: '提供完善的教案、课件和教学指导' },
                  { icon: Shield, title: '志愿者保障', desc: '交通补贴、保险保障、证书颁发' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => setVolunteerModalOpen(true)} className="btn-primary w-full">
                加入志愿者 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* For Schools */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <School className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">学校服务</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: Users, title: '志愿者招募', desc: '帮助学校精准匹配优秀大学生志愿者' },
                  { icon: BookOpen, title: '课程资源', desc: '提供丰富的在线课程和教学资源库' },
                  { icon: Star, title: '教师培训', desc: '组织线上线下教师培训和交流活动' },
                  { icon: Gift, title: '物资捐赠', desc: '对接爱心企业和个人的物资捐赠' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => setSchoolModalOpen(true)} className="btn-secondary w-full">
                学校入驻申请 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 bg-gradient-warm text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">我们的公益影响</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              每一份爱心都在创造改变，每一次支教都在点亮希望
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '86', label: '合作学校', suffix: '所' },
              { number: '1,200', label: '注册志愿者', suffix: '+' },
              { number: '15,000', label: '受益学生', suffix: '+' },
              { number: '23', label: '覆盖省份', suffix: '个' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-extrabold mb-2">
                  {stat.number}<span className="text-3xl">{stat.suffix}</span>
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">支教故事</h2>
            <p className="section-subtitle mx-auto">
              记录每一个温暖的瞬间，分享爱与成长的故事
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=300&fit=crop',
                name: '李明',
                university: '北京大学',
                quote: '在云南支教的一个月，我收获的远比我付出的多。那些孩子们纯真的笑容，是我最珍贵的回忆。',
                location: '云南·丽江'
              },
              {
                image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop',
                name: '王雪',
                university: '复旦大学',
                quote: '教育不仅是知识的传递，更是希望的播种。我在贵州看到了教育改变命运的力量。',
                location: '贵州·毕节'
              },
              {
                image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
                name: '张伟',
                university: '浙江大学',
                quote: '线上支教让我能够跨越地域限制，帮助更多的孩子。科技让公益变得更加便捷。',
                location: '四川·凉山'
              },
            ].map((story, index) => (
              <div key={index} className="card group">
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={`${story.name}的支教经历`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-3 py-1 bg-card/90 backdrop-blur rounded-full text-sm">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-foreground">{story.location}</span>
                  </div>
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{story.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center text-primary-foreground font-bold">
                    {story.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{story.name}</div>
                    <div className="text-sm text-muted-foreground">{story.university}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            加入我们
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            让爱心与知识<span className="gradient-text">跨越山海</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            无论您是希望奉献爱心的大学生，还是需要帮助的山区学校，
            益心支教网都是您最可靠的伙伴。现在就加入我们，一起为教育公平贡献力量。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setVolunteerModalOpen(true)} className="btn-primary text-lg px-8 py-4">
              <UserCheck className="w-5 h-5" />
              志愿者报名
            </button>
            <button onClick={() => setSchoolModalOpen(true)} className="btn-outline text-lg px-8 py-4">
              <School className="w-5 h-5" />
              学校入驻
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-foreground text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
                </div>
                <span className="text-xl font-bold">益心支教</span>
              </div>
              <p className="text-primary-foreground/70 mb-6 max-w-md">
                益心支教网是聚焦贫困山区教育公平的公益信息交换平台，
                致力于连接大学生志愿者与贫困山区学校，共同为山区孩子铺就求知之路。
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li><a href="#about" className="hover:text-primary-foreground transition-colors">关于我们</a></li>
                <li><a href="#services" className="hover:text-primary-foreground transition-colors">服务内容</a></li>
                <li><a href="#impact" className="hover:text-primary-foreground transition-colors">公益影响</a></li>
                <li><a href="#stories" className="hover:text-primary-foreground transition-colors">支教故事</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@yixinzhijiao.org
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  400-888-8888
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  北京市海淀区
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-primary-foreground/10 flex items-center justify-between text-primary-foreground/50 text-sm">
            <p>© 2024 益心支教网 版权所有 | 京ICP备XXXXXXXX号</p>
            <button 
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Settings className="w-4 h-4" />
              管理后台
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal 
        isOpen={volunteerModalOpen} 
        onClose={() => setVolunteerModalOpen(false)}
        title="志愿者报名"
      >
        <VolunteerForm onSuccess={() => setVolunteerModalOpen(false)} />
      </Modal>

      <Modal 
        isOpen={schoolModalOpen} 
        onClose={() => setSchoolModalOpen(false)}
        title="学校入驻申请"
      >
        <SchoolForm onSuccess={() => setSchoolModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default App
