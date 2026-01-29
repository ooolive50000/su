-- 益心支教网数据库表结构
-- 请在Supabase SQL Editor中执行此脚本

-- 创建志愿者表
CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  university VARCHAR(200) NOT NULL,
  major VARCHAR(100),
  preferred_location VARCHAR(50),
  preferred_time VARCHAR(50),
  skills TEXT,
  motivation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建学校表
CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  school_name VARCHAR(200) NOT NULL,
  province VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  address TEXT,
  contact_name VARCHAR(100) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  contact_email VARCHAR(100),
  student_count VARCHAR(20),
  teacher_count VARCHAR(20),
  subjects TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用RLS（行级安全）并允许公开访问
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

-- 创建公开访问策略
CREATE POLICY "Allow public read volunteers" ON volunteers FOR SELECT USING (true);
CREATE POLICY "Allow public insert volunteers" ON volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete volunteers" ON volunteers FOR DELETE USING (true);

CREATE POLICY "Allow public read schools" ON schools FOR SELECT USING (true);
CREATE POLICY "Allow public insert schools" ON schools FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete schools" ON schools FOR DELETE USING (true);
