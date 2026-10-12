import IntroStage from './scenes/IntroStage.jsx'
import SceneResult, { SiteFooter } from './scenes/SceneResult.jsx'
import ScrollRail from './components/ScrollRail.jsx'

export default function App() {
  return (
    <>
      <main>
        <IntroStage />
        <SceneResult />
      </main>
      <SiteFooter />
      <ScrollRail />
    </>
  )
}
