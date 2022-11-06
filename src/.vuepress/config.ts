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
