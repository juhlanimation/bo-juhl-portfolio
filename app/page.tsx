import { LandingPage } from '@/components/features/pages/landing-page/landing-page'

const defaultSettings = {
  pageTitle: 'Bo Juhl Portfolio',
  showNavbar: true,
}

export default function Home() {
  return <LandingPage settings={defaultSettings} />
}
