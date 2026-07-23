import { genPageMetadata } from 'app/seo'
import SectionContainer from '@/components/SectionContainer'
import Image from 'next/image'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Profile' })

const skills = {
  frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Vue.js',
    'MUI',
    'Semantic UI',
    'Element UI',
  ],
  backend: ['Spring Boot', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'ASP.NET', 'MongoDB', 'Redis'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Argocd', 'Azure DevOps', 'GitHub Actions'],
  tools: [
    'IntelliJ IDEA',
    'Visual Studio Code',
    'Claude Code',
    'Antigravity',
    'Git',
    'Figma',
    'Notion',
    'Jira',
  ],
}

const experiences = [
  {
    period: '2022 - 현재',
    role: '시니어 풀스택 엔지니어',
    company: 'Tech Company',
    description: '대규모 웹 애플리케이션 아키텍처 설계 및 개발',
  },
  {
    period: '2020 - 2022',
    role: '프론트엔드 엔지니어',
    company: 'Software House',
    description: 'React 기반 SPA 개발 및 성능 최적화',
  },
  {
    period: '1999 - 2020',
    role: '백엔드 엔지니어',
    company: 'Startup Inc.',
    description: '풀스택 웹 개발 및 API 설계',
  },
]

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'Next.js와 Node.js로 구현한 대규모 쇼핑몰. 결제 시스템, 재고 관리, 실시간 업데이트 포함.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    title: 'Real-time Dashboard',
    description: 'WebSocket과 React로 만든 실시간 데이터 모니터링 대시보드.',
    tech: ['React', 'WebSocket', 'D3.js', 'Redis'],
  },
  {
    title: 'Mobile App Backend',
    description: 'Flutter 앱을 위한 RESTful API 서버. 인증, 푸시 알림, 파일 업로드 처리.',
    tech: ['Go', 'MongoDB', 'Firebase', 'Docker'],
  },
]

export default function ProfilePage() {
  return (
    <SectionContainer>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero Section */}
        <div className="space-y-2 pb-8 pt-8 md:space-y-5">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg md:h-48 md:w-48">
              <Image
                src="/static/images/nchime_avatar.png"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
                곽채화(ch.kwak)
              </h1>
              <p className="mt-2 text-lg text-primary-500 dark:text-primary-400">
                Full-Stack(Frontend/Backend) Engineer
              </p>
              <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400 md:text-lg">
                사용자 경험을 최우선으로 생각하며, 확장 가능한 웹 애플리케이션을 만드는 것을
                좋아합니다. 프론트엔드부터 백엔드까지 전체 파이프라인을 다룹니다.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
                <Link
                  href="https://github.com/nchime"
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com/in/nchime"
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Link>
                <Link
                  href="mailto:nchime@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="py-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Skills</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50"
              >
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm dark:bg-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="py-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative border-l-2 border-primary-200 pl-6 dark:border-primary-800"
              >
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full border-2 border-primary-500 bg-white dark:bg-gray-900" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{exp.role}</h3>
                </div>
                <p className="text-primary-600 dark:text-primary-400">{exp.company}</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="py-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Featured Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-100">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-center text-white dark:from-primary-600 dark:to-primary-700">
            <h2 className="mb-2 text-2xl font-bold">Let&apos;s Work Together</h2>
            <p className="mb-6 text-primary-100">
              새로운 프로젝트나 협업 기회가 있으시다면 언제든 연락주세요.
            </p>
            <Link
              href="mailto:your@email.com"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
