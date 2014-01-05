---
layout: post
title:  "On a minor epiphany"
date:   2014-01-05
summary: "How do you invoke an anonymous function using a custom name if all you have is first-class functions? It's quite simple, really."
---

I would like to share with you a minor epiphany I recently had. It is related to a question I found hard to answer, even though I knew everything that should have enabled me to answer it easily. To find out if it was just me, I asked the same question to a few of my friends, and they too were puzzled for quite some time, even though they also knew everything required to answer it.

So here it is, the question:

<em>How do you invoke an anonymous function using a custom name, without using assignment, in a language with first-class functions?</em>

If you don't know the solution yet, take a few minutes to think about it, and then come back.

## The answer

The solution is this: you pass the anonymous function as an argument into another function. Inside of that function, you can refer to it using the name of the parameter.

Example code (using JavaScript):

```javascript
(function (triple) {
  return triple(2) + 1;
})(function (x) { return 3 * x; })

// => 7
```

This technique is so simple that it even works in the simplest of functional languages. This is what the example above looks like in the [lambda calculus][1]:

````
(triple. (triple 2) + 1) (λx. 3 * x)
````

What knowledge was required to answer the question?

- Functions can have [formal parameters][2].
- Formal parameters are variables, i.e. identifiers for values.
- Functions are values.

The list is certainly not complete, but those are the main points. Now why would the solution not be obvious if you know all of the above?

## Contexts, triggers

There are two contexts in which programmers commonly use functions as arguments to other functions:

1. When using an existing higher-order function such as `map`, `reduce` etc.
2. When defining a higher-order function.

In the first case, the parameter only occurs in the documentation, not in the code you write when you use the function, and it's usually some generic name like `f` or `fn`. In addition, the parameter you would naturally focus on more than that one, is the parameter of the anonymous function you're passing into it (e.g. `item` when invoking `map` on a list).

In the second case, it would be natural to focus on the implementation of the higher-order function rather than the identity of potential arguments. You would treat the function argument as an opaque thing, only constrained by the type signature (in languages that support that). Accordingly, you would pick a non-specific name like `f` or `fn`.

Neither of these cases is exactly the same as intentionally and arbitrarily binding a name to an anonymous function. For many programmers, the question represents a non-use case. It doesn't immediately trigger relevant knowledge because that knowledge is most easily accessible via chains of associations that have different starting points.

## Conclusion

There are different shades and degrees of knowing something, and it is not always clear where on the spectrum you are. Sometimes you may be blinded by your experience.


[1]: http://en.wikipedia.org/wiki/Lambda_calculus
[2]: http://en.wikipedia.org/wiki/Parameter_(computer_programming)#Parameters_and_arguments
