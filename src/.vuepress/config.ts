import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "fxss 个人博客",
  description: "fxss 个人博客",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "fxss 个人博客",
      description: "fxss 个人博客",
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/fxss-blog/logo.png' }],
    [
      'script', {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e8bcff1a50ea5af3b0d0d9824e74f894";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ]
  ],

  theme,

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    })
  ],

  shouldPrefetch: false,
});
