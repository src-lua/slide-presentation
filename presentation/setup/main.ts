import { defineAppSetup } from '@slidev/types'
import TikzServerSide from '../components/TikzServerSide.vue'
import AnnotationBox from '../components/AnnotationBox.vue'
import Author from '../components/Author.vue'
import Copyright from '../components/Copyright.vue'
import FinalSlide from '../components/FinalSlide.vue'
import LogoBar from '../components/LogoBar.vue'
import { defineAppSetup } from '@slidev/types'
import TikzFade from '../components/TikzFade.vue'


export default defineAppSetup(({ app }) => {
  // Registra todos os componentes globalmente
  app.component('TikzFade', TikzFade)
  app.component('TikzServerSide', TikzServerSide)
  app.component('AnnotationBox', AnnotationBox)
  app.component('Author', Author)
  app.component('Copyright', Copyright)
  app.component('FinalSlide', FinalSlide)
  app.component('LogoBar', LogoBar)

  
  console.log('✅ All components registered successfully!')
})

