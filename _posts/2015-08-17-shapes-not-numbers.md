---
layout: post
title:  "who needs numbers if you have shapes"
date:   2015-08-17
excerpt: "This is a post about different ways of looking at things. Specifically functions and (binary) relations. And numbers."
---

<style>
.link {
  fill: none;
  stroke-width: 1.7;
}
.link.succ {
  stroke: #00aa00;
}
.link.pred {
  stroke: #0000ff;
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
</style>

<script type="text/javascript" src="/js/namelessNumbers.js"></script>

when i first learned about functions at school, i remember that they all looked kind of like this:

// illustration of linear and quadratic function graphs

since that time, many years ago, i’ve had many realizations about functions, some of which are related to programming, which i do for a living, and some of which just make me feel happy for no clear reason when i think about them. what i am trying to do with this article is share some of that positive feeling.

## those graphs have flaws
let’s look at some aspects of those traditional graphs and see what they communicate. so there’s a line on top of a coordinate system. the fact that it’s a line and not dots or crosses or something else tells us that we’re looking at something continuous, meaning that between two positions, there are always more positions. sometimes you see graphs that have both dots and also lines between them. what those communicate is that it’s useful to imagine many more points between the points that actually exist. for whatever reason. here are the three kinds of graphs beside each other:

// illustration of a line, a line with dots, and just dots

if you ask me, the first graph looks much better than the third. this type of visualization really wants to be continuous, which works best if the data is also continuous. but many domains are discrete, not continuous, which means that between any two values, there is nothing—nothing at all, not even empty space. they are just separate values. integers are an example. also, most information processed by computers is discrete.

another flaw of those graphs is that you can’t see very well that functions are one-way streets. they have an input and an output. as an example, think of the function <i>succ(x) = x + 1</i>. the way it works is: if you have an x, you can get the successor of x by adding 1 to it. it doesn’t say anything about how you would go from the result back to the original x. you would have to somehow transform it into a different function to do that. the way it is, though, it’s a one-way street, and the graph doesn’t communicate that very well.

yet another flaw: if the two axes are both numbers, why are they so far apart from each other? it’s not like the numbers on the horizontal axis are somehow different numbers than those on the vertical axis. but there really only is one number called “1”, and only one number called “2”. The numbers on the two axes refer to the exact same numbers, and yet, they don’t appear as the same things.

## objects pointing at other objects

i don’t know about you, but i’m not super happy with the flaws we’ve discovered. what i want is a visualization that gives all the objects an identity. like this one:

<table>
  <tr><td>
    <svg id="numbers" width="720" height="280"></svg>
  </td></tr>
  <tr>
    <td class="figureCaption">unordered numbered circles</td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/1_numbers.js"></script>

better! now let’s visualize the `succ` function. all we need to do for that is give every object the ability to point at one other object, and then we have to make them point to the right objects.

<table>
  <tr>
    <td><svg id="succ" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>succ(x) = x + 1</i></td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/2_succ.js"></script>

there we have it: a representation of the function <i>succ(x) = x + 1</i>. you can see how it takes you from 0 to 1 and from 1 to 2 and from 5 to 6, and so on. it doesn’t have the same flaws as more traditional graphs: every number is its own object, and you can see the direction from input to output in the form of arrows. one thing that's nice about this visualization is that the chain of numbers can be arranged in any way without changing its meaning. it doesn't matter if all the numbers line up left to right or right to left or not at all.

what happens if we remove the number labels? does that change the meaning?

<table>
  <tr>
    <td><svg id="succ-nameless" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption">a chain of nameless objects</td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/3_succ_nameless.js"></script>

it clearly is a chain of objects, but can we say that it is still the same function as before or does removing the numbers make it ambiguous? the answer is that it is ambiguous. there is more than one function with that exact same shape. consider the function that, given a number, returns the number before it. the only difference between that function and the `succ` function is the direction of the arrows.

<table>
  <tr>
    <td><svg id="succ-pred" width="720" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption"><i>succ(x) = x + 1</i> and <i>pred(x) = x - 1</i></td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/4_succ_pred.js"></script>

what that picture shows is that one is the inverse of the other, meaning that if you follow the succ arrow from one number to another, and then you follow the pred arrow from there, you end up at the same number as before, and vice versa. let’s compare the traditional way of drawing functions in a coordinate system:

// illustration of succ(x) = x + 1 and pred(x) = x - 1 in one line graph

can you tell from that picture that the two functions are inverses? i can’t. but our object graphs make that very clear.

## objects pointing at any number of other objects
how would you visualize the notion that one number can be smaller or bigger than another number? let’s start with the number 1 and draw arrows to all the other numbers that it’s smaller than.

<table>
  <tr>
    <td><svg id="x-is-less-1" width="360" height="280"></svg></td>
    <td><svg id="x-is-less-3" width="360" height="280"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption">1 is less than x</td>
    <td class="figureCaption">3 is less than x</td>
  </tr>
  <tr>
</table>
<script type="text/javascript" src="/js/5_one_is_less.js"></script>

if we continue that exercise for all the other objects, and then remove the number labels, we end up with the following picture:

<table>
  <tr>
    <td><svg id="less-than-with-2" width="170" height="130"></svg></td>
    <td><svg id="less-than-with-3" width="170" height="130"></svg></td>
    <td><svg id="less-than-with-4" width="170" height="130"></svg></td>
    <td><svg id="less-than-with-5" width="170" height="130"></svg></td>
  </tr>
  <tr>
    <td class="figureCaption">"less than" with two objects</td>
    <td class="figureCaption">"less than" with three objects</td>
    <td class="figureCaption">"less than" with four objects</td>
    <td class="figureCaption">"less than" with five objects</td>
  </tr>
</table>
<script type="text/javascript" src="/js/6_less_than.js"></script>

this picture can be used for answering the question “is this object less than that other object?”: if there is an arrow, it means that the source is less than the target.

one thing that’s interesting is that the `succ` function is hidden in this picture. if a number is less than another number, there is also a path of successors between them. this mathematical property of "less than" is called transitivity, which literally means something like "going-through-ness". a relation is called transitive if TODO there is a way to go from one object to another via multiple arms, then the objects at the beginning and end of the path are also related to each other in the same way.

“< is transitive” means: if A < B and B < C then also A < C

discovering that a relation is transitive is a great thing! what it means is that there is a more compact representation, a representation that uses way fewer arms between objects with no loss of information, so it can still be used to answer the same questions.

## the numbers are in the way
you may wonder why i keep removing numbers from pictures. aren’t they helpful for understanding them better? they can be, but at the same time, they can make it easy to cheat and use knowledge that’s not actually in the picture, just because it’s something you know about the numbers involved. for example, if i show you the following picture and asked you, “is 4 equal to 4?”, what would you answer?

// illustration of greater than with labels

if you answer yes, you must have used external knowledge, because there are no “is equal to” arms in the picture. given only the information in the picture, you can’t answer any questions about equality.

## it’s the arms that create order
the “less than” relation is what’s called an ordering. more precisely, it is a “strict” ordering. what that means is two things:
1. if there is a path from one object to another, there is definitely not a path back (in math, this is called asymmetry)
2. objects don’t point at themselves (in math, this is called irreflexivity)

the following picture contrasts strict ordering with weak (non-strict) ordering and with something that’s not an ordering at all:

// illustration of strict ordering, weak ordering, and inequality as an example of no ordering

## inequality is a noisy relation (or is it?)
the following picture visualizes the equality relation:

// illustration of equality

that’s a very tidy picture. let’s look at some mathematical properties of it, just to practice some vocabulary: since objects point to themselves, it must be reflexive. also, if an object points somewhere, you could as well think of it as pointing back onto itself in the other direction, which means the relation is symmetric.

in contrast, inequality is a very messy relation:

// illustration of inequality

can you think of a more compact way to visualize inequality? if inequality was transitive, we might be able to reduce the number of arms quite drastically. the question to ask is: given the picture above, if you can get from one object to another object via a path of connections, is there always also an arm going from the start of the path to the end? it turns out the answer is yes and we can reduce the picture above to the one below:

// illustration of transitive inequality

## forget about numbers and learn to see shapes
i hope you enjoyed this little exploration of a way to look at functions that’s quite different from lines on coordinate systems. functions—and relations! and mathematical properties! and the number of arms in a picture! and the unimportance of numbers. the kind of mathematics they tend to teach at school focusses so much on numbers that people get distracted by them and don’t even see the shapes around them. there is beauty in those shapes. there are many more out there than only the ones in this article, waiting for you to discover them.

# material and stuff
http://web.stanford.edu/class/archive/cs/cs103/cs103.1132/lectures/05/Small05.pdf
- “Each (directed) graph defines a binary relation”
aRb iff (a, b) is an edge.
