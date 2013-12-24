---
layout: post
title:  "Physical dimensions and types &mdash; Part 0"
date:   2013-12-24
categories: haskell, types
summary: "How do you prevent a program that attempts invalid operations on physical quantities from running? Basically by representing them as types. Basically."
---

It is quite common to write programs that deal with physical quantities like `1.2m` or `20Hz` without representing the dimensional part in the program. Instead, such values are represented as numbers, like in the following example program:

```haskell
length = 1.2 -- meters
area   = 2.3 -- square meters

z = length + area -- unfortunately possible, because x and y are just numbers
```

In this program, the compiler doesn't know anything about the dimensional meaning of `x` and `y`. For all it knows, `x` and `y` are just two numbers, and anything you can do with numbers should also be valid for `x` and `y`. That means that it's the responsibility of the programmer to only use such values in ways that are also valid in the domain of the physical units they represent.

A first attempt at preventing incompatible operations might be to give every unit its own type, and implement operations such as addition separately for every type. Let me walk you through some code that does that. You don't have to be especially familiar with Haskell since I will explain every statement in detail.

## Data types, constructors, pattern matching

Okay, let's start by defining a type for lengths in meters:

```haskell
data Length = Meter Double
```

This declaration reads as follows: there is a new data type called `Length`, and it has one constructor, `Meter`. The constructor takes one argument of type `Double`. Here is an example of constructing a value of type `Length`:

```haskell
x :: Length -- This line is optional. It says `x` is of type `Length`.
x = Meter 1.2
```

The variable `x` is not itself a number&mdash;it contains a number, though. In order to get access to it, you can use pattern matching, as in this example:

```haskell
add_lengths :: Length -> Length -> Length
add_lengths (Meter x) (Meter y) = Meter (x + y)

-- example call:
z = add_lengths (Meter 1.2) (Meter 2.3) -- Meter 3.5
```

The first line says that `add_length` is a function that takes a value of type `Length`, and another value of type `Length`, and returns a value that also has the type `Length`.

The second line implements addition on lengths. It does that by extracting numeric values inside of `Length` instances using pattern matching. Patterns mirror the structure of constructors, with variable names in the place of parameters. In the example call, `Meter 1.2` goes into the spot where the pattern `Meter x` is, and `Meter 2.3` goes where `Meter y` is, which results in `x` being bound to `1.2` and `y` being bound to `2.3`. (This technique is also known under the name "destructuring".)

Similar type declarations and addition functions can be written for other units, such as square meters:

```haskell
data Area = Meter2 Double

add_areas :: Area -> Area -> Area
add_areas (Meter2 x) (Meter2 y) = Meter2 (x + y)
```

## Overloading functions

Let's look at some code that will allow us to use the `+` operator instead of the functions `add_lengths` and `add_areas`, which are a little bit bulky. The first thing we do is define a [type class][4] that says what it means for values of any type to be addable:

```haskell
class Add a where
  (+) :: a -> a -> a
```

You can read it like so: there is a new type class `Add` that can be instantiated for any type `a`. What has to be provided for an existing type to be an instance of `Add` is an implementation of the function `(+)`, which takes two arguments of the same type and return a value of the same type. The parentheses mean that it's an infix function, i.e. one that can be used as an operator between its arguments.

An instance declaration for the `Length` type looks like this:

```haskell
instance Add Length where
  (Meter x) + (Meter y) = Meter (x Prelude.+ y)
```

It's mostly the same as the function `add_lengths` above, except that the function name, `+`, has moved between the two arguments, and that instead of doing `x + y`, it uses the more explicit `Prelude.+` to refer to the built-in `(+)` function. (`Prelude` is basically the Haskell standard library.) In order for this code to work, the function `(+)` has to be hidden, and it has to be enforced that it can only be accessed explicitly, so that it doesn't collide with the newly defined `(+)` function:

```haskell
import Prelude hiding ((+))
import qualified Prelude ((+))
```

The program rewritten using this technique looks like this:

```haskell
import Prelude hiding ((+))
import qualified Prelude ((+))

data Length = Meter Double
data Area   = Meter2 Double

class Add a where
  (+) :: a -> a -> a

instance Add Length where
  (Meter x) + (Meter y) = Meter (x Prelude.+ y)

instance Add Area where
  (Meter2 x) + (Meter2 y) = Meter2 (x Prelude.+ y)
```

## Where to go from here?

The program so far kind of does what it should: it allows addition of values of the same physical unit, and it prevents doing that for incompatible units. But when you think about how to extend it to make it work for more dimensions and more operations, it becomes obvious that it is flawed.

### Issue 1: higher powers

So far the program covers meters and square meters. But what's with all the other powers like `m^3`, `m^4`, `1/m`, `1/m^2`? So far there is nothing that allows us to describe the potentially infinite number of powers for a given unit.

### Issue 2: units that are combinations of units

So far there is no way to represent combined units. For example, there should be some way of representing `m/s` that doesn't require defining a new type `MetersPerSecond`. And there should be a way of representing `Newton` that expresses the fact that it's composed from kilograms, meters, and square seconds (`1N = 1kg*m/s^2`).

### Issue 3: multiplication and division

Multiplying a physical quantity with another physical quantity should result in a value whose type is the multiplication of the two input types. For example:

````
2m * 3m = 6m^2
````

Division is analogous:

````
6m^2 / 2m = 3m
````

What's probably not a good idea is to list all combinations of types and implement multiplication and division for each one of them, because if you want to cover all powers of all units, the number of combinations is also infinite.

Those are just a few of the issues that a library for working with physical quantities has to solve in order to be useful.

## Inspiration, outlook

The library that first inspired this series of posts is called [dimensional][1] and it solves all of the issues mentioned above. It was [announced][2] on the Haskell mailing list in December 2006. What I realized when I went through the code is that it takes quite a long time to see what is essential and what is optional. After some time of reading and digesting the code, I started writing a minimal version of it from scratch, to see if I really understood it. While doing that, one thing I also realized is that certain operations could more directly be expressed using type functions (called "type families") than using functional dependencies. So somehow my code ended up looking more like the [later re-implementation][3] that uses that technique.

Anyway, here's the plan for the next few articles: we're going to start with a minimal `dimensional-tf`-like library that solves a few of the issues listed above, and extend it bit by bit. Along the way we'll meet a lot of interesting techniques and concepts.

In the next post, we're going to learn about a technique that can be used to solve issue 1 mentioned above: [type-level numbers and type-level arithmetic][5].

[1]: https://code.google.com/p/dimensional/
[2]: http://www.haskell.org/pipermail/haskell/2006-December/018993.html
[3]: http://flygdynamikern.blogspot.de/2012/02/announce-dimensional-tf-010-statically.html
[4]: http://en.wikibooks.org/wiki/Haskell/Classes_and_types
[5]: /2013-12-24--physical-dimensions-and-types-1/
