import { defineAppSetup } from '@slidev/types'
import TikzMorph from '../components/TikzMorph.vue'
import AnnotationBox from '../components/AnnotationBox.vue'
import Author from '../components/Author.vue'
import Copyright from '../components/Copyright.vue'
import FinalSlide from '../components/FinalSlide.vue'
import LogoBar from '../components/LogoBar.vue'

export default defineAppSetup(({ app }) => {
  app.component('TikzMorph', TikzMorph)
  app.component('AnnotationBox', AnnotationBox)
  app.component('Author', Author)
  app.component('Copyright', Copyright)
  app.component('FinalSlide', FinalSlide)
  app.component('LogoBar', LogoBar)
})
