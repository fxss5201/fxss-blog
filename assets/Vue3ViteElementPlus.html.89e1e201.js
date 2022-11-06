import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as l,a as n,b as s,d as e,e as t,r as c}from"./app.37bfe7a1.js";const i={},r={href:"https://github.com/vueBlog/viteblog",target:"_blank",rel:"noopener noreferrer"},u={href:"https://v3.cn.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://vitejs.cn/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://element-plus.gitee.io/zh-CN/",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"vue3-相关的",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vue3-相关的","aria-hidden":"true"},"#"),s(" Vue3 相关的")],-1),m=n("h3",{id:"script-setup",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#script-setup","aria-hidden":"true"},"#"),s(" script setup")],-1),b=n("p",null,"首先说说组合式API，将对同一块操作的变量函数等放在一起，比如说搜索功能，将和搜索相关的功能集中一块（写出了以前写jQuery的感觉）。",-1),g={href:"https://github.com/vueBlog/viteblog",target:"_blank",rel:"noopener noreferrer"},h=n("code",null,"src/views/pageHome.vue",-1),y=n("code",null,"getAsideEvent",-1),f=n("code",null,"getArticleEvent",-1),_=t(`<p>其三在 script setup 中无法使用 <code>this</code> ，并且像一些公共API <code>ref/reactive/watch/computed/...</code> 及生命周期钩子 <code>onBeforeMount/onMounted/onBeforeUpdate/onUpdated/onBeforeUnmount/onUnmounted/...</code> 等都需要手动导入（也可以通过<code>unplugin-auto-import</code>自动导入）。</p><h3 id="ref-和-reactive" tabindex="-1"><a class="header-anchor" href="#ref-和-reactive" aria-hidden="true">#</a> ref 和 reactive</h3><p><code>ref</code> 一般用于基础数据的响应式，<code>reactive</code> 一般用于引用数据的响应式，结合上面说到的同一块操作的变量放一起，总结如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> aside <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">total</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue-router-和-vuex" tabindex="-1"><a class="header-anchor" href="#vue-router-和-vuex" aria-hidden="true">#</a> vue-router 和 vuex</h3><p>vue-router 和 vuex 需要导入并生成，后续使用和之前一样：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useRouter<span class="token punctuation">,</span> useRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">useRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token function">useRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vite-和-element-plus" tabindex="-1"><a class="header-anchor" href="#vite-和-element-plus" aria-hidden="true">#</a> Vite 和 Element Plus</h2><p>vite 配置：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>
<span class="token comment">// 自动导入</span>
<span class="token keyword">import</span> AutoImport <span class="token keyword">from</span> <span class="token string">&#39;unplugin-auto-import/vite&#39;</span>
<span class="token comment">// 自动导入按需组件</span>
<span class="token keyword">import</span> Components <span class="token keyword">from</span> <span class="token string">&#39;unplugin-vue-components/vite&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ElementPlusResolver <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;unplugin-vue-components/resolvers&#39;</span>
<span class="token keyword">import</span> VueSetupExtend <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-vue-setup-extend&#39;</span>

<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;/viteblog/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@/&#39;</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">css</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">preprocessorOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">scss</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// https://sass.bootcss.com/documentation/at-rules/use</span>
        <span class="token comment">// Element Plus 中 scss 变量全局导入</span>
        <span class="token literal-property property">additionalData</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">@use &quot;@/styles/index.scss&quot; as *;</span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">VueSetupExtend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">AutoImport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">resolvers</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">ElementPlusResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">Components</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">resolvers</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">ElementPlusResolver</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">importStyle</span><span class="token operator">:</span> <span class="token string">&#39;sass&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">server</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 代理配置</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;https://www.fxss.work&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">ws</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>package.json</code> 中的 <code>scripts</code> 添加 <code>&quot;devF&quot;: &quot;vite --force&quot;,</code> 脚本，用于重新构建依赖。</p>`,11),w={href:"https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5",target:"_blank",rel:"noopener noreferrer"},x=t(`<p><code>src/styles/index.scss</code> 确保在项目中任何地方都可以使用 Element Plus 中的 scss 变量：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@forward</span> <span class="token string">&#39;element-plus/theme-chalk/src/common/var.scss&#39;</span><span class="token punctuation">;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果需要重新定义 Element Plus 中的主题色则使用如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@forward</span> <span class="token string">&#39;element-plus/theme-chalk/src/common/var.scss&#39;</span> with <span class="token punctuation">(</span>
  $<span class="token property">colors</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
    <span class="token string">&#39;primary&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
      <span class="token string">&#39;base&#39;</span><span class="token punctuation">:</span> green<span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="感谢" tabindex="-1"><a class="header-anchor" href="#感谢" aria-hidden="true">#</a> 感谢</h2><p>本次分享到这里就结束了，<strong>感谢您的阅读</strong>！如对您有帮助，帮忙点个赞，您的点赞是我继续创作的动力。</p>`,6);function E(V,j){const a=c("ExternalLinkIcon");return o(),l("div",null,[n("p",null,[s("最近看完 Vue3 和 Vite 文档之后，就写了个小 "),n("a",r,[s("demo"),e(a)]),s(" ，整体感觉下来还是很丝滑的。")]),n("ul",null,[n("li",null,[n("a",u,[s("Vue3"),e(a)])]),n("li",null,[n("a",d,[s("Vite中文网"),e(a)])]),n("li",null,[n("a",k,[s("Element Plus"),e(a)])])]),v,m,b,n("p",null,[s("其二在 script setup 中提供了另一种代码复用的写法，将代码逻辑封装，例如某个请求，在 script setup 中导入直接调用，返回对应的数据， script setup 中声明的变量可以直接在 template 中使用。如 "),n("a",g,[s("demo"),e(a)]),s(" 中的 "),h,s(" 中的 "),y,s(" 和 "),f,s(" 即采用的是新的代码复用逻辑。")]),_,n("p",null,[s("Element Plus 使用 "),n("a",w,[s("自动导入"),e(a)]),s(" 功能，在其他页面中再使用 Element Plus 中的组件时都不需要再次导入，可以直接使用。")]),x])}const B=p(i,[["render",E],["__file","Vue3ViteElementPlus.html.vue"]]);export{B as default};
