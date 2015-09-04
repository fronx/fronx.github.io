---
layout: post
title:  "Who needs numbers if you have structures"
date:   2015-09-04
excerpt: "This is an article about how different representations can make it easier or harder to understand certain concepts. It is also about numbers and functions and relations and about interesting properties that some of them have."
---

<style>
.link {
  fill: none;
  stroke-width: 1.7;
}
.graph .succ {
  stroke: #00aa00;
  color: #00aa00;
}
.graph .pred {
  stroke: #0000ff;
  color: #0000ff;
}
.graph .equal {
  stroke: #aa0000;
}
.graph .less-than {
  stroke: #000;
}
.graph .gte {
  stroke: #aa00ff;
}
.graph .ne {
  stroke: #55aaaa;
}
.secondary {
  padding-left: 2em;
  visibility: hidden;
  color: #777;
}
.graph:hover .secondary {
  visibility: visible;
}
.graph:hover .link.primary {
  stroke: #777;
  stroke-width: 0.7;
}
.graph:hover .link.succ {
  stroke: #00aa00;
  stroke-width: 1.7;
}
.graph:hover .link.pred {
  stroke: #0000ff;
  stroke-width: 1.7;
}
svg {
  background-color: #f5f5f5;
  cursor: default;
}
.figureCaption {
  text-align: center;
  font-family: sans-serif;
  /*font-style: italic;*/
  font-size: 13px;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #ddd;
}
.lineGraph path {
  fill: none;
}
.lineGraph .axis {
  stroke: black;
  shape-rendering: crispEdges;
}
.lineGraph text {
  stroke: none;
  font-size: 11px;
  shape-rendering: crispEdges;
}

</style>

<script type="text/javascript" src="/js/namelessNumbers.js"></script>

This is an article about how different representations can make it easier or harder to understand certain concepts. It is also about numbers and functions and relations and about interesting properties that some of them have. I'm not sure that it's a very useful article, but I felt like writing it and so I hope that it will find its audience.

It starts, completely free of context, with a selection of line graphs.

<table class="graph">
  <tr>
    <td><svg id="lineGraph1" width="240" height="240"></svg></td>
    <td><svg id="lineGraph2" width="240" height="240"></svg></td>
    <td><svg id="lineGraph3" width="240" height="240"></svg></td>
  </td></tr>
  <tr>
    <td class="figureCaption">some function</td>
    <td class="figureCaption">also a function</td>
    <td class="figureCaption">another function</td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  NamelessNumbers.mkLineGraph('#lineGraph1', function (x) {
    return x + 1;
  });
  NamelessNumbers.mkLineGraph('#lineGraph2', function (x) {
    return x * x - 2;
  });
  NamelessNumbers.mkLineGraph('#lineGraph3', function (x) {
    return 5 * Math.sin(x);
  });
</script>

When I first learned about functions at school, I remember that they all looked like that. At the time I never thought much about what information those graphs convey, what they were designed for communicating. The fact that there are lines and not dots or crosses or something else tells us that we are looking at something continuous, meaning that between two positions, there are always more positions. Sometimes you see graphs that have dots and also lines between them, which usually means that the real information is in the dots, and the lines are just there to make them look more like the continuous graphs above. Here are the three kinds of graphs beside each other, so we can compare their visual qualities:

<table class="graph">
  <tr>
    <td><svg id="continuous" width="240" height="240"></svg></td>
    <td><svg id="with-dots" width="240" height="240"></svg></td>
    <td><svg id="just-dots" width="240" height="240"></svg></td>
  </td></tr>
  <tr>
    <td class="figureCaption">continuous</td>
    <td class="figureCaption">with dots</td>
    <td class="figureCaption">just dots</td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  var fn = function (x) {
    return 1 + 4 * Math.cos((x - 1)/1.3);
  }
  NamelessNumbers.mkLineGraph('#continuous', fn);
  NamelessNumbers.mkLineGraph('#with-dots', fn);
  NamelessNumbers.mkDotGraph('#with-dots', fn);
  NamelessNumbers.mkDotGraph('#just-dots', fn);
</script>

If you ask me, the first graph looks much better than the third, and the second graph just seems like a compromise. It seems that this kind of graph really wants to be continuous, which works best if the data is also continuous. But many domains are discrete, not continuous, which means that between any two values, there is nothing—not even empty space. Just nothing. They are separate values. Presenting them as having empty space between them is kind of a lie. All it is good for is suggesting that those discrete values are somewhat related to another domain that actually is continuous. Integers and real numbers are an example of that. Integers are often presented as if they were a very selective window into the continuous world of real numbers.

Most information processed by computers is discrete. There is a lot of information out there that we work with every day that is discrete, and it is not always so useful to think of it as an inferior version of something continous.

Another flaw of those graphs is that you can’t see very well that functions are one-way streets: they have an input and an output. As an example, think of the function <i>succ(x) = x + 1</i>. The way it works is: if you have an x, you can get the successor of x by adding 1 to it. It doesn’t say anything about how you would go from the result back to the original x, because you can't. That's not what this function does. It can only take you in one direction, step by step, by applying the function multiple times:

```
succ(x) = x + 1

succ(1) = 1 + 1
        = 2

succ(succ(1)) = (succ 1) + 1
              = (1 + 1) + 1
              = 3
...
```

That's a pretty interesting thing you can do with this function, and I don't see how the line graphs communicate that.

Yet another flaw: if the two axes are both numbers, then why are they so far apart from each other? It’s not like the numbers on the horizontal axis are somehow different numbers than those on the vertical axis. But there really only is one number called “1”, and only one number called “2”. The numbers on the two axes refer to the exact same numbers, and yet, they don’t appear as the same things.

## Numbers as objects

What I want is a visualization that doesn't have the above flaws, and I kind of also want that visualization to give each one the objects its own identity. Like this one:


<img src="/img/cuteNumbers.png" width="720" />

In my ideal world anyway, numbers would be depicted like that. But that kind of representation has the problem that it is relatively time-consuming to draw, and it is much easier to just draw objects as circles.

<table class="graph">
  <tr>
    <td><svg id="numbers" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption">unordered numbered circles</td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/1_numbers.js"></script>


## Functions, or: objects pointing at other objects

Now let’s visualize the <i>succ</i> function. All we need to do is give every object the ability to point at one other object, and then we have to make them point to the right objects.

<table class="graph">
  <tr>
    <td><svg id="succ" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>succ(x) = x + 1</i></td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/2_succ.js"></script>

There you have it: a representation of the function <i>succ(x) = x + 1</i>. You can see how it takes you from 0 to 1 and from 1 to 2 and from 5 to 6, and so on. It doesn’t have the same flaws as more traditional graphs: every number is its own object, and you can see the direction from input to output in the form of arrows.

One thing that's nice about this visualization is that the chain of numbers can be arranged in any way without changing its meaning. It doesn't matter if all the numbers line up left to right or right to left or not at all. (You can drag the objects around and watch the structure move with them if you want!)

What happens if we remove the number labels? Does that change the meaning?

<table class="graph">
  <tr>
    <td><svg id="succ-nameless" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption">a chain of nameless objects</td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/3_succ_nameless.js"></script>

It clearly still is a chain of objects, but can we say that it is the same function as before, or does removing the numbers make it ambiguous? The answer is that it is ambiguous, because there is more than one function with that exact same structure. Consider the function that, given a number, returns the number before it, `pred(x) = x - 1`. the only difference between it and the <i>succ</i> function is the direction of the arrows.

<table class="graph">
  <tr>
    <td><svg id="succ-pred" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>succ(x) = x + 1</i> and <i>pred(x) = x - 1</i></td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/4_succ_pred.js"></script>

What that picture shows is that one function is the inverse of the other, meaning that if you follow the <i>succ</i> arrow from one number to another, and then you follow the <i>pred</i> arrow from there, you end up at the same number as before, and vice versa. Let’s compare the traditional way of drawing functions in a coordinate system:

<table class="graph">
  <tr width="720">
    <td width="720"><svg style="display: block; margin: 0 auto 0 auto;" id="lineSuccPred" width="240" height="240"></svg></td>
  </td></tr>
  <tr>
    <td>
      <div class="figureCaption" style="display: block; margin: 0 auto 0 auto; width: 240px;">
        <i>succ(x) = x + 1</i> and <i>pred(x) = x - 1</i>
      </div>
    </td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  var succ = function (x) {
    return x + 1;
  }
  var pred = function (x) {
    return x - 1;
  }
  NamelessNumbers.mkLineGraph('#lineSuccPred', succ, "succ");
  NamelessNumbers.mkLineGraph('#lineSuccPred', pred, "pred");
</script>

Can you tell from that picture that the two functions are inverses? You actually can, if you know how to recognize inverses in line graphs, but our object graphs makes it very clear what that relationship means from the perspective of walking from one object to another.

## Relations, or: objects pointing at any number of other objects

How would you visualize the notion that one number can be smaller or bigger than another number? You could take one number as the starting point, say 1 or 3 or any other number, and draw arrows to all the other numbers that it is less than:

<table class="graph">
  <tr>
    <td><svg id="x-is-less-1" width="360" height="280"></svg></td>
    <td><svg id="x-is-less-3" width="360" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption">"less than", starting from just 1</td>
    <td class="figureCaption">"less than", starting from just 3</td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/5_one_is_less.js"></script>

The fact that there are multiple arrows going out from one object to others is what makes <i>less than</i> not a function. <i>Less than</i> is a binary relation, which means that between any two objects, there may or may not be an arrow that relates the two, so you can have any number of arrows going from one object to others.

The graphs above are focussed on two particular starting points (1 and 3), which keeps the pictures simple. If we wanted to connect all the objects in the picture, it soon becomes very noisy and hard to read. You can look at the progression of going from only two connected objects to five in the pictures below:

<table class="graph">
  <tr>
    <td><svg id="less-than-with-2" width="170" height="150"></svg></td>
    <td><svg id="less-than-with-3" width="170" height="150"></svg></td>
    <td><svg id="less-than-with-4" width="170" height="150"></svg></td>
    <td><svg id="less-than-with-5" width="170" height="150"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>less than</i> with two objects
      <span class="secondary succ"><i>succ</i> with two objects</i></span></td>
    <td class="figureCaption"><i>less than</i> with three objects
      <span class="secondary succ"><i>succ</i> with three objects</i></span></td>
    <td class="figureCaption"><i>less than</i> with four objects
      <span class="secondary succ"><i>succ</i> with four objects</i></span></td>
    <td class="figureCaption"><i>less than</i> with five objects
      <span class="secondary succ"><i>succ</i> with five objects</i></span></td>
  </tr>
</table>
<script type="text/javascript">
(function () {
  function linkFn(a, ai, b, bi, result) {
    if (ai < bi) result.push(
      NamelessNumbers.link(a, b, 'less-than primary' + ((ai + 1 === bi) ? ' succ' : '')));
  }

  NamelessNumbers.mkGraph(2, false, '#less-than-with-2', linkFn, 60);
  NamelessNumbers.mkGraph(3, false, '#less-than-with-3', linkFn, 60);
  NamelessNumbers.mkGraph(4, false, '#less-than-with-4', linkFn, 60);
  NamelessNumbers.mkGraph(5, false, '#less-than-with-5', linkFn, 60);
})();
</script>

Even though the circles in these graphs have no labels, we can still tell what the numbers are by looking at the number of incoming arrows.

<i>zero</i> is the object that has <b>no</b> incoming arrows, because no other object is less than <i>zero</i>.<br>
<i>one</i> is the object that has <b>one</b> incoming arrow, because <i>zero</i> is less than it.<br>
<i>two</i> is the object that has <b>two</b> incoming arrows, because <i>zero</i> and <i>one</i> are less than it.<br>
and so on.

One thing that’s interesting is that the <i>succ</i> function is hidden in these pictures. You can see it highlighted in green when you hover over them. <i>Less than</i> and <i>succ</i> are related to each other in a special way. For one thing, if object B is the successor of A, then A is also less than B. But also, if you start with the arrows defined by <i>succ</i> and, whenever it is possible to reach another object via a path of existing arrows, you add an arrow to that object directly, you end up with a <i>less than</i> graph as a result.

This mathematical property of the <i>less than</i> relation is called transitivity. The word literally means something like "going-through-ness". The idea is that if there is a way to go from one object to another object via some relation, then the objects at the start and the end of the path are also related in the same way.

Written in a shorter format, that is:

```
for any numbers A, B, C:  if A < B and B < C then also A < C
```

That notation is pretty succinct, but we can make it even shorter if we leave out the "for any…" part and introduce an arrow that means "then we also know that" or "implies":

```
A < B and B < C  =>  A < C
```

The purpose of this exercise is to show some appreciation for textual notation, because it is also just another tool that can be used to represent and think about abstract concepts. So let's go one step further and write down a generalized rule for transitive binary relations, which <i>less than</i> is merely one example of:

```
any binary relation R is transitive if:  R(a, b) and R(b, c)  =>  R(a, c)
```

Discovering that a relation is transitive is a great thing! What it means is that there is a more compact representation that uses way fewer arrows between objects with no loss of information, as long as you know that transitivity applies.

## The numbers are kind of in the way

You may wonder why I keep removing number labels from pictures. Aren’t they helpful for understanding better what's going on? Well, they can be, but at the same time, they can make it possible to cheat and use knowledge that is not actually in the picture, just because it is something you already knew about the numbers involved. For example, if you wanted to use the following picture to answer the question “is 4 equal to 4?”, what would you say?

<table class="graph">
  <tr>
    <td><svg id="greater-than" width="720" height="200"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>greater than</i><span class="secondary pred"><i>predecessor</i></span></td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  NamelessNumbers.mkGraph(5, true, '#greater-than', function(a, ai, b, bi, result) {
    if (ai > bi) result.push(
      NamelessNumbers.link(a, b, 'greater-than primary' + ((ai === bi + 1) ? ' pred' : '')));
  }, 70);
</script>

Given only the information in the picture, you can't answer the question, there are no <i>is equal to</i> arrows, which would look like this:

<table class="graph">
  <tr>
    <td><svg id="equal" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>equal</i></td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  NamelessNumbers.mkGraph(8, true, '#equal', function(a, ai, b, bi, result) {
    if (ai === bi) result.push(
      NamelessNumbers.link(a, b, 'equal'));
  });
</script>

We can also make a combined picture of <i>equal</i> and <i>greater than</i>, which gives us <i>greater than or equal</i>, and we can use the trick of mentioning the fact that it is a transitive relation in order to reduce the number of arrows. Also, let's not add any number labels so we can focus on just the structure.

<table class="graph">
  <tr>
    <td><svg id="gte" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>greater than or equal</i> — transitive</td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  NamelessNumbers.mkGraph(8, false, '#gte', function(a, ai, b, bi, result) {
    if (ai === bi || ai === bi + 1) result.push(
      NamelessNumbers.link(a, b, 'gte'));
  }, 30);
</script>

Even though the objects are not labeled, the graph can be used to answer any questions about whether one object is greater than or equal than another object, as long as we can somehow point at the objects we are talking about.

## The structure of inequality

If you compare the pictures of equality and inequality, you can see that one is very tidy and the other one also quite pretty, but at the same time very noisy.

<table class="graph">
  <tr>
    <td><svg id="tidy1" width="360" height="280"></svg></td>
    <td><svg id="tidy2" width="360" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>equal</i></td>
    <td class="figureCaption"><i>not equal</i></td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  NamelessNumbers.mkGraph(8, true, '#tidy1', function(a, ai, b, bi, result) {
    if (ai === bi) result.push(
      NamelessNumbers.link(a, b, 'equal'));
  });
  NamelessNumbers.mkGraph(8, true, '#tidy2', function(a, ai, b, bi, result) {
    if (ai !== bi) result.push(
      NamelessNumbers.link(a, b, 'ne'));
  }, 80);
</script>

Is there a way to simplify the picture for inequality? If it is a transitive relation, we might be able to reduce the number of arrows by quite a bit. How do we know if it is transitive? What we need to look out for are arrows that are not really essential, because they are just shortcuts from one object to another, and if you removed them, there would still be a connection left.

Let's start by focussing on just one number and see what it is pointing at: from 4, you can go to 3 and 2, among others. But you can also go from 4 to 2 by going through 3, and you can go from 4 to 3 through 2. Clearly not all of those arrows are essential and it should be safe to remove most of them. From 4 you can also go to 5 and 6, and you can go to 6 through 5 or to 5 through 6.

Any object that is greater than or less than another object is also not equal to it. As we have seen earlier, <i>greater than</i> and <i>less than</i> are transitive relations and can be reduced to transitive versions of the <i>succ</i> and <i>pred</i> function. If we put those two together, we get a very clean representation of inequality:

<table class="graph">
  <tr>
    <td><svg id="tidy3" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>not equal</i> – transitive</td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  NamelessNumbers.mkGraph(8, true, '#tidy3', function(a, ai, b, bi, result) {
    if (ai + 1 === bi || ai == bi + 1) result.push(
      NamelessNumbers.link(a, b, 'ne'));
  });
</script>

## Some structures are orderings

In addition to colloqial meanings of order, there is also a mathematical notion of order. For example, the <i>less than</i> relation is an example of a strict ordering. "Strict" means two things here:

1. Asymmetry: if there is a path from one object to another, there is definitely not a path back
2. Irreflexivity: objects never point at themselves

This is a point where textual notation might be convenient again:

```
any binary relation R is  symmetric if:  R(a, b) => R(b, a)
                         asymmetric if:  R(a, b) => not R(b, a)

                          reflexive if:  for all a:  R(a, a)
                        irreflexive if:  for all a:  not R(a, a)
```

The following picture contrasts strict ordering with non-strict ordering and with something that is not an ordering at all:

<table class="graph">
  <tr>
    <td><svg id="ordering-1" width="240" height="280"></svg></td>
    <td><svg id="ordering-2" width="240" height="280"></svg></td>
    <td><svg id="ordering-3" width="240" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>less than</i> — transitive<br>a strict ordering</td>
    <td class="figureCaption"><i>greater than or equal</i> — transitive<br>a non-strict ordering</td>
    <td class="figureCaption"><i>not equal</i> — transitive<br>not an ordering</td>
  </tr>
  <tr>
</table>
<script type="text/javascript">
  NamelessNumbers.mkGraph(8, false, '#ordering-1', function (a, ai, b, bi, result) {
    if (ai + 1 === bi) result.push(
      NamelessNumbers.link(a, b, 'less-than'));
  }, 30);
  NamelessNumbers.mkGraph(8, false, '#ordering-2', function (a, ai, b, bi, result) {
    if (ai === bi || ai === bi + 1) result.push(
      NamelessNumbers.link(a, b, 'gte'));
  }, 30);
  NamelessNumbers.mkGraph(8, false, '#ordering-3', function (a, ai, b, bi, result) {
    if (ai + 1 === bi || ai == bi + 1) result.push(
      NamelessNumbers.link(a, b, 'ne'));
  }, 30);
</script>

You can tell that the third picture above is definitely not an ordering because it is symmetric: it is possible to go from one object to another and also back the other way. And the second picture is not strict, because it is reflexive: objects do point at themselves.

## Who needs numbers if you have structures

Seeing relations as a bunch of arrows between objects is quite useful. It makes it easy to think about mathematical properties those relations might have, and to see how to simplify your view of something by exploiting those properties.

Numbers are only one example of objects in a discrete domain. In computer programs, there tend to be a lot of things that are very similar to numbers, but they are not numbers themselves. Being familiar with the structures around numbers allows you to see those same structures in other domains. Sometimes you may not even know the shape of your data because all you have is some mathematical model of how objects should be related, for example in some kind of lattice structure, or maybe a non-strict ordering or whatever else is required, and then you can use that knowledge to design your data types and algorithms to represent and work with the data efficiently.

But even if you don't usually write programs, I hope you enjoyed the ride and I hope it made you curious to learn more about functions and relations and orderings. There is a lot of information out there on Wikipedia, but sometimes it can be hard to decode, especially if you lack tools to visualize concepts in an understandable way.
