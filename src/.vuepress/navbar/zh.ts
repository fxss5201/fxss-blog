import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "文章列表", icon: "article", link: "/article/" },
  { text: "文章分类", icon: "categoryselected", link: "/category/javascript/" },
  { text: "文章标签", icon: "tag", link: "/tag/签字板/" },
  { text: "时间线", icon: "time", link: "/timeline/" },
  { text: "泛积木-低代码", link: "https://www.fxss.work/" },
  { text: "算法", link: "https://fxss5201.github.io/fxss-leetcode/" },
]);
