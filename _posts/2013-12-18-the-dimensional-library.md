---
layout: post
title:  "Physical dimensions and types"
date:   2013-12-18
categories: haskell, types
summary: "How can you prevent a program that attempts invalid operations on physical quantities from running? Basically by representing them as types. Basically."
---

It is quite common to write programs that deal with physical quantities like `1.2m` or `20Hz` without representing the dimensional part in the program. Instead, such values are represented as numbers, like in the following example program:

```haskell
length = 1.2 -- meters
area   = 2.3 -- square meters

z = length + area -- possible, because x and y are just numbers
```

In this program, the compiler doesn't know anything about the dimensional meaning of `x` and `y`. For all it knows, `x` and `y` are just two numbers, and anything you can do with numbers should also be valid for `x` and `y`. That means that it's the responsibility of the programmer to only such values in ways that are also valid in the domain of the physical units they represent.

A first attempt at preventing incompatible operations might be to give every unit its own type, as shown in the following example.

<i>In order to make this post accessible to people who are not that familiar with Haskell's syntax, all the code examples include comments that paraphrase the meaning using natural language.</i>

```haskell
-- `Length` is a new type with one type variable (`a`).
-- The way you construct a value of type `Length a` is by
-- using the constructor `Meter` and providing it with one
-- value, e.g.: `Meter 1.23`.
data Length a = Meter  a
  deriving Show -- use the default way of representing values as strings
data Area   a = Meter2 a
  deriving Show

-- New type class for types that support addition.
class Add a where
  -- `add` takes two arguments of the same type (represented by
  -- the type variable `a`), and returns a value of the same
  -- type.
  add :: a -> a -> a

-- Here is our first instance for the type class `Add`:
-- A length can be added to another length.
-- The type `a` must be an instance of the type class `Num`,
-- so that its values support the `+` operation.
instance Num a => Add (Length a) where
  -- extract the contained numbers, add them, and construct the return value
  add (Meter x) (Meter y) = Meter (x + y)

-- An area can be added to another area.
instance Num a => Add (Area a) where
  add (Meter2 x) (Meter2 y) = Meter2 (x + y)

main = do
  let len = Meter 1.2
  let area = Meter2 2.3
  print (add len len)    -- Meter 2.4
  print (add area area)  -- Meter2 4.6
  --print (add len area) -- doesn't compile
```

This program kind of does what it should. But the more you try to extend it to other dimensions and operations, the more obvious its flaws become.

Take a few minutes to think about how one would add support for mass, time, and temperature, and multiplication and division. It is actually not easy to come up with a way of doing that where you don't have to list all combinations of all valid operations between any two types. Here are a few examples of operations that have to be possible:

````
1m/s * 2s =  2m
2m   * 3m =  6m^2
3    * 4m = 12m
(4N + 5kg*m/s^2) / 1kg = 9m/s^2
````

Another question to consider is how to represent combined dimensions such as `m/s`. Manually defining a separate type for each possible combination is not only very repetitive, it ultimately doesn't even work since the number of combinations is potentially infinite. Although there might be some way of representing them as composite types, which would solve that problem.

Those are just a few of the issues that a library for working with physical quantities has to solve in order to be useful.

# Background: the dimensional/dimensional-tf libraries

The library that first inspired this post is called [dimensional][1] ([announcement][2]). What I realized when I went through the code is that it takes quite a long time to see what is essential and what is optional. After some time of reading and digesting the code, I started writing a minimal version of it from scratch, to see if I really understood it. While doing that, I realized that certain operations could more directly be expressed using type functions (called "type families") than with functional dependencies. My code ended up looking quite similar to the [dimensional-tf][3] implementation.

Anyway, here's the plan for the rest of this article: we're going to start with a minimal `dimensional-tf`-like library and extend it bit by bit. Along the way we will meet a lot of interesting techniques and concepts.

# Small beginnings



[1]: https://code.google.com/p/dimensional/
[2]: http://www.haskell.org/pipermail/haskell/2006-December/018993.html
[3]: http://flygdynamikern.blogspot.de/2012/02/announce-dimensional-tf-010-statically.html
[physical_units]: http://www.haskell.org/haskellwiki/Physical_units
