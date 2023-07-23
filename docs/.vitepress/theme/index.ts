import { h, onMounted } from 'vue'
import theme from 'vitepress/theme'
import Icon from 'fusion-ui-iconify'
// import FusionUi from '../../../packages/fusion-ui/components/index.ts'
// import '../../../packages/fusion-ui/dist/styles/index.css'
// import '../../../packages/fusion-ui/components/link/src/index.less'
// import '../../../packages/fusion-ui/components/message/src/index.less'
import FusionUi from 'fusion-ui-vue'
import 'fusion-ui-vue/dist/styles/index.css'
import DemoBlock from '../components/demo-block'
import TeamMember from '../components/team-member'
import 'uno.css'
import './main.css'
import './style/var.css'

export default {
  ...theme,
  setup() {
    onMounted(() => {
      const html = document.documentElement
      const toggleTheme = () => {
        if (html.classList.contains('dark'))
          html.setAttribute('data-theme', 'dark')
        else html.setAttribute('data-theme', 'light')
      }

      toggleTheme()

      const observer = new MutationObserver(() => {
        toggleTheme()
        observer.takeRecords()
      })

      observer.observe(html, {
        attributes: true,
        childList: false,
        subtree: false,
      })
    })
  },
  enhanceApp({ app }) {
    // for (const name of Object.keys(components)) {
    //   if (name.startsWith('Fn'))
    //     app.component(name, components[name])
    // }
    app.use(FusionUi)
    app.use(Icon)
    app.component('Demo', DemoBlock)
    app.component('TeamMember', TeamMember)
  },
  Layout() {
    return h(theme.Layout, null, {
      'home-features-after': () => h(TeamMember),
    })
  },
}