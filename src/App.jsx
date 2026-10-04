import IntroStage from './scenes/IntroStage.jsx'
import SceneExperience from './scenes/SceneExperience.jsx'
import DemoBadge from './components/DemoBadge.jsx'

export default function App() {
  return (
    <>
      <main>
        <IntroStage />
        <SceneExperience />
      </main>
      <DemoBadge />
    </>
  )
}
