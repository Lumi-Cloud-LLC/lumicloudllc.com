import Scene from './components/canvas/Scene'
import MotifLayer from './components/overlay/MotifLayer'
import Navbar from './components/sections/navbar/Navbar'
import Hero from './components/sections/hero/Hero'
import Approach from './components/sections/approach/Approach'
import Work from './components/sections/work/Work'
import About from './components/sections/about/About'
import Footer from './components/sections/footer/Footer'
import ControlPanel from './components/panel/ControlPanel'

export default function App() {
  return (
    <>
      {/* Layer 0: Three.js canvas backdrop */}
      <Scene />

      {/* Layer 1: Ambient SVG motifs */}
      <MotifLayer />

      {/* Layer 3: Content */}
      <div className="relative z-[3]">
        <Navbar />
        <main className="max-w-[1000px] mx-auto px-6">
          <Hero />
          <Approach />
          <Work />
          <About />
          <Footer />
        </main>
      </div>

      {/* Control panel (z-index 55-60) */}
      <ControlPanel />
    </>
  )
}
