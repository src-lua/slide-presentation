import { defineAppSetup } from '@slidev/types'
import TikzMorph from '../../../shared/components/TikzMorph.vue'
import LogoBar from '../../../shared/components/LogoBar.vue'
import Author from '../../../shared/components/Author.vue'
import Copyright from '../../../shared/components/Copyright.vue'
import FinalSlide from '../../../shared/components/FinalSlide.vue'
import AnnotationBox from '../../../shared/components/AnnotationBox.vue'
import Counter from '../../../shared/components/Counter.vue'

export default defineAppSetup(({ app }) => {
  app.component('TikzMorph', TikzMorph)
  app.component('LogoBar', LogoBar)
  app.component('Author', Author)
  app.component('Copyright', Copyright)
  app.component('FinalSlide', FinalSlide)
  app.component('AnnotationBox', AnnotationBox)
  app.component('Counter', Counter)
})
