import { AboutComponent, AboutHeader, AboutInstuction, AboutMission, AboutPartners } from "@/components"
import AboutResults from "@/components/about/about_results"

function AboutPage() {
  return (
    <>
        <AboutHeader/>
        <AboutComponent/>
        <AboutResults/>
        <AboutMission/>
        <AboutInstuction/>
        <AboutPartners/>
    </>
  )
}

export default AboutPage