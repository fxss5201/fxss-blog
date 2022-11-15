import { defineClientConfig } from '@vuepress/client'

let path = ''

export default defineClientConfig({
  enhance({ router }) {
    router.beforeEach((to) => {
      if (typeof _hmt !== "undefined") {
        if (to.path && path !== to.path) {
          path = to.path
          _hmt.push(["_trackPageview", to.fullPath])
        }
      }
    })
  },
})
