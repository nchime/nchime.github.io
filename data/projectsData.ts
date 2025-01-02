interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: '컨퍼런스 메이트',
    description: `국내 개최되는 각종 컨퍼런스/밋업/세미나/교육 행사정보를 제공합니다. 행사별 간략정보와 관심행사 찜하기 기능 등으로 일정 관리가 가능합니다`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://satellite-app.vercel.app/confmate',
  },
  {
    title: '흑백요리사 가게정보',
    description: `넷플릭스 화제작 흑백요리사 가게 위치 정보를 제공합니다.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://satellite-app.vercel.app/bhcook',
  },
  {
    title: '로또 확률 체험하기',
    description: `로또 구매 갯수 대비 예상 당첨확률을 체험해 볼 수 있습니다. 신뢰도를 높이기 위해 실제 추첨된 회차별 데이터를 기준으로 산정되었습니다`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://satellite-app.vercel.app/lotto',
  }
]

export default projectsData
