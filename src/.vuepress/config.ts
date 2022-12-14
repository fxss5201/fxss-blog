import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "@vuepress/utils";
import { searchPlugin } from "@vuepress/plugin-search";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "fxss 个人博客",
      description: "fxss 个人博客",
    },
  },

  head: [
    [
      'script', {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?6bb76405c797e3ab3f444480cf4ff8cd";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ]
  ],

  theme,

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
      hotKeys: ['s', '/', { key: 's', ctrl: true }]
    }),
  ],

  shouldPrefetch: false,
});
