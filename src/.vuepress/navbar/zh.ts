import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "文章列表", link: "/article/" },
  { text: "文章分类", link: "/category/javascript/" },
  { text: "文章标签", link: "/tag/签字板/" },
  { text: "时间线", link: "/timeline/" },
  { text: "宝宝学习屋", link: "https://learn.fxss.work/" },
  { text: "算法", link: "https://fxss5201.github.io/fxss-leetcode/" },
]);
