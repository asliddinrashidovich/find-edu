import { AboutComponent, AboutHeader, AboutInstuction, AboutMission, AboutPartners } from "@/components"
import AboutResults from "@/components/about/about_results"

function AboutPage() {
  return (
    <div className="overflow-hidden max-w-[100vw]">
        <AboutHeader/>
        <AboutComponent/>
        <AboutResults/>
        <AboutMission/>
        <AboutInstuction/>
        <AboutPartners/>
    </div>
  )
}

export default AboutPage