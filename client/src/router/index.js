import Vue from 'vue'
import Router from 'vue-router'
import CommandLine from '@/components/commandLine/CommandLine'
import CodeEditorPane from '@/components/editor/CodeEditorPane'
import Viewer from '@/components/viewer/Viewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Command',
      component: CommandLine
    }, {
      path: '/cli',
      name: 'Command Line',
      component: CommandLine
    }, {
      path: '/edit',
      name: 'Code Editor',
      component: CodeEditorPane
    }, {
      path: '/viewer',
      name: 'Viewer',
      component: Viewer
    }
  ]
})
