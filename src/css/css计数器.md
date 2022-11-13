---
title: css计数器
isOriginal: true
category:
  - css
date: 2020-03-12
---

> 本质上CSS计数器是由CSS维护的变量，这些变量可能根据CSS规则增加以跟踪使用次数。这允许你根据文档位置来调整内容表现。 CSS计数器是[**CSS2.1中自动计数编号部分**](http://www.ayqy.net/doc/css2-1/generate.html#counters)的实现。
> 计数器的值通过使用`counter-reset` 和 `counter-increment` 操作，在 `content` 上应用 `counter()` 或 `counters()`函数来显示在页面上。

## counter-reset

> `counter-reset`属性含有一列一个或多个计数器，每个后面可以跟一个可选的整数。该整数给定了每次出现该元素时给计数器设置的值，默认为0。

`counter-reset` 简单的来说就是使用css计数器时重置该值。例如：

```CSS
/* 此时item就是css维护的计数器的变量，每次遇见class中含有title的元素就会重置item，由于后面未跟数字，所以重置为默认值0 */
.title {
    counter-reset: item;
}
/* 此时item1就是css维护的计数器的变量，每次遇见class中含有title1的元素就会重置item1，item1后面跟数字1，所以将item1重置为1 */
.title1 {
    counter-reset: item1 1;
}
/* 此时item2、item3就是css维护的计数器的变量，每次遇见class中含有title2的元素就会重置item2、item3，item2后面跟数字2，所以将item2重置为2，item3后面跟数字3，所以将item3重置为3 */
.title2 {
    counter-reset: item2 2 item3 3;
}
```

## counter-increment

> `counter-increment`属性接受一个或多个计数器名（标识符），每个后面都可以跟一个可选的整数。这个整数表示每次出现该元素时计数器递增几。默认增量是1，可以接受正整数、0和负整数。

`counter-increment` 简单来说就是定义递增量。例如：

```CSS
/* 此时item就是css维护的计数器的变量，每次遇见class中含有title的元素就会在item的基础上递增其后设置的数字，由于后面未跟数字，所以递增量为默认值0 */
.title li:before {
    counter-increment: item;
    content: counter(item);
}
/* 此时item1就是css维护的计数器的变量，每次遇见class中含有title1的元素就会在item1的基础上递增其后设置的数字1 */
.title1 {
    counter-reset: item1 1;
}
/* 此时item2就是css维护的计数器的变量，每次遇见class中含有title2的元素会在item2的基础上递增其后设置的数字2，然后再递增3 */
.title2 {
    counter-reset: item2 2 item2 3;
}
```

> 关键字'none'，'inherit'和'initial'不能用作计数器名。值为'none'表示不需要重置或者递增计数器。

## 嵌套计数器与作用域

> 计数器是“自嵌套的（self-nesting）”，如果重置一个位于后代元素或者伪元素中的计数器，会自动创建一个新的计数器实例。这对HTML中的列表之类的场景来说很重要，这种场景下，元素自身可以嵌套任意深度，无法为每一层定义唯一命名的计数器。
> 因此，如下（样式表）就可以给嵌套列表项编号。结果与给`li`元素设置`display:list-item`和`list-style: inside`非常相似：

```CSS
ol { counter-reset: item }
li { display: block }
li:before { content: counter(item) ". "; counter-increment: item }
```

> 计数器的作用域从文档中具有`counter-reset`该计数器的第一个元素开始，包括该元素的后代和后续兄弟及其后代。但不包括处于同名计数器作用域中的任何元素，（同名计数器）由该元素的后续兄弟或后续同（类型）元素的`counter-reset`创建。
> 如果一个元素或伪元素上的`counter-increment`或者`content`引用了一个不处于任何`counter-reset`作用域的计数器，实现应该表现得就像已经通过该元素或伪元素上的`counter-reset`把该计数器重置为0了一样。
> 上例中，`ol`将会创建一个计数器，并且`ol`的所有子级将引用该计数器。
> 如果我们用`item[n]`表示`item`计数器的第`n`个实例，用`{`和`}`表示一个作用域的开始和结束，那么下列`HTML`片段将使用标注的计数器（我们假设样式表是上例中给出的那个）。

[例1](http://www.fxss5201.cn/project/cssProject/cssCounter/example1/)：

```HTML
<ol>                    <!-- {item[0]=0        -->
  <li>item</li>         <!--  item[0]++ (=1)   -->
  <li>item              <!--  item[0]++ (=2)   -->
    <ol>                <!--  {item[1]=0       -->
      <li>item</li>     <!--   item[1]++ (=1)  -->
      <li>item</li>     <!--   item[1]++ (=2)  -->
      <li>item          <!--   item[1]++ (=3)  -->
        <ol>            <!--   {item[2]=0      -->
          <li>item</li> <!--    item[2]++ (=1) -->
        </ol>           <!--                   -->
        <ol>            <!--   }{item[2]=0     -->
          <li>item</li> <!--    item[2]++ (=1) -->
        </ol>           <!--                   -->
      </li>             <!--   }               -->
      <li>item</li>     <!--   item[1]++ (=4)  -->
    </ol>               <!--                   -->
  </li>                 <!--  }                -->
  <li>item</li>         <!--  item[0]++ (=3)   -->
  <li>item</li>         <!--  item[0]++ (=4)   -->
</ol>                   <!--                   -->
<ol>                    <!-- }{item[0]=0       -->
  <li>item</li>         <!--  item[0]++ (=1)   -->
  <li>item</li>         <!--  item[0]++ (=2)   -->
</ol>                   <!--                   -->
```

> 另一个示例，下面展示了当计数器用在非嵌套元素时，作用域的工作方式。展示了上面给出的用来为章节编号的样式表是怎样应用于给定标记的。

```HTML
					 <!--"chapter" counter|"section" counter -->
<body>               <!-- {chapter=0      |                  -->
  <h1>About CSS</h1> <!--  chapter++ (=1) | {section=0       -->
  <h2>CSS 2</h2>     <!--                 |  section++ (=1)  -->
  <h2>CSS 2.1</h2>   <!--                 |  section++ (=2)  -->
  <h1>Style</h1>     <!--  chapter++ (=2) |}{ section=0      -->
</body>              <!--                 | }                -->
```

> `counters()`函数生成一个由作用域内所有同名计数器组成的字符串，用给定的字符串分隔。
> 下列样式表会把嵌套的列表项编号为"1、"，"1.1、"，"1.1.1、"等等

[例2](http://www.fxss5201.cn/project/cssProject/cssCounter/example2/)：

```css
ol { counter-reset: item }
li { display: block }
li:before { content: counters(item, ".") "、"; counter-increment: item }
```

## 计数器样式

> 默认情况下，计数器会被格式化为十进制数，但`list-style-type`属性的所有可用样式也可以用于计数器，表示方式为：`counter(name)`
> 对应默认样式（计数器），或者：`counter(name, <'list-style-type'>)`
> 所有样式都是合法的，包括'disc'，'circle'，'square'和'none'

```CSS
h1:before        { content: counter(chno, upper-latin) ". " }
h2:before        { content: counter(section, upper-roman) " - " }
blockquote:after { content: " [" counter(bq, lower-greek) "]" }
div.note:before  { content: counter(notecntr, disc) " " }
p:before         { content: counter(p, none) }
```

## 'display: none'的元素中的计数器

> 一个不显示的（`display`设置为`none`）元素不会让计数器递增或重置，例如，用下列样式表，具有`secret`类的`h2`不会让`count2`递增
> `h2.secret {counter-increment: count2; display: none}`
> 无法生成的伪元素也不会让计数器递增或重置，例如，如下（样式表）不会让`heading`递增：
> `h1::before {content: normal;counter-increment: heading;}`
> 然而，`visibility`被设置为`hidden`的元素，会让计数器递增。

关于`display: none`的元素中的计数器可以在此处查看 [例3](http://www.fxss5201.cn/project/cssProject/cssCounter/example3/) 。

本文摘自：http://www.ayqy.net/doc/css2-1/generate.html#counters
