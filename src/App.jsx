import IntroStage from './scenes/IntroStage.jsx'
import SceneResult, { SiteFooter } from './scenes/SceneResult.jsx'

export default function App() {
  return (
    <>
      <main>
        <IntroStage />
        <SceneResult />
      </main>
      <SiteFooter />
    </>
  )
}
