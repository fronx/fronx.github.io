---
layout: post
title:  "Physical dimensions and types &mdash; Part 1"
date:   2013-12-24
categories: haskell, types
summary: "If you want to represent m, m^2, and m^3 using types, it makes sense to start by representing numbers as types."
---

The goal of this post is to solve part of the first issue described in [the previous post][1] by modeling higher powers of a given dimension (such as length, mass, temperature, etc.) as types with a numeric component. So the type of a value in meters would be `Length One` and the type of a square meter would be `Length Two`, and so on.

The way we're going to get there is by defining the types `Zero`, `One`, and `Two` themselves, ignoring the physical unit aspect for now. And we're going to do that in a way that is generic enough to allow for the definition of arbitrarily big type-level numbers. The technique we're using is based on [Peano numbers][2]. It is surprisingly simple and powerful.

## Natural numbers as types

Okay, here we go: natural numbers as types, in only two lines of code:

```haskell
data Zero
data Succ a -- successor of some other type `a`
```

That's it. Here is how you read the above declarations: `Zero` is a data type that has no constructor. That means you can use it in type signatures, but you can't construct values of that type. That may be confusing to hear, but you will see how that's a useful thing eventually. The second line says that `Succ` only becomes a proper type if you feed it another type, `a`, as a parameter.

Just in case you're wondering if there is some built-in magic at play here that somehow gives these types meaning, let me assure you that that's not the case. The names could be anything, and all that matters are the type expressions we are able to construct based on these declarations.

Here are some valid types that can be constructed using just `Zero` and `Succ`:

````
Zero                            -- represents 0
Succ Zero                       -- represents 1
Succ (Succ Zero)                -- represents 2
Succ (Succ (Succ Zero))         -- represents 3
Succ (Succ (Succ (Succ Zero)))  -- represents 4
...
````

Let's make a few observations here:

- The types kind of look like nested lists.
- The length of the list corresponds to a number.
- `Succ` makes types longer by wrapping them inside of it.
- The type `Zero` is similar to the value `null` in that it acts as a terminating element.
- This technique allows for arbitrarily big type-level numbers, depending on how much memory is available.

## Play with it

If you want to test whether a certain type expression is valid, even if you can't construct values of that type, what you can do is open up the Haskell console (`ghci`), and use the following syntax:

```haskell
:t undefined :: < Some Type Here >
```

If the type is valid, you get the same type back that you entered. If it's not, you get some sort of error.

For `Zero` and `Succ`, a console session might look like this:

```haskell
Prelude> :t undefined :: Zero
undefined :: Zero :: Zero

Prelude> :t undefined :: Succ (Succ Zero)
undefined :: Succ (Succ Zero) :: Succ (Succ Zero)
```

## Type aliases

Since types like `Succ Zero` and `Succ (Succ Zero)` are rather bulky things to read and write, especially if you compare them to the conciseness of ordinary numeric values like 1 and 2, it is a nice gesture to users of this code to provide a few aliases for the most commonly used numbers.

```haskell
type One   = Succ Zero
type Two   = Succ One
type Three = Succ Two
```

## Adding a type to a type

What does it mean to add two type-level numbers? It means making a new type that has a list structure of the right length, corresponding to the sum of the input lengths. `Add Zero Zero` should return `Zero`, `Add One One` should return `Two`, and `Add Three One` should return something like `Succ Three`.

Here is some code that does that. You are not expected to understand it yet, so don't worry too much:

```haskell
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE UndecidableInstances #-}

-- ... (the program as we had it before)

type family Add a b
type instance Add Zero b = b
type instance Add (Succ a) b = Add a (Succ b)
```

The first two lines enable certain language features that we are making use of. You can look them up if you want to, but it's also okay to just accept their necessity for now. What comes next is a declaration of a type function called `Add` that takes two types as parameters (called `a` and `b`) and returns another type according to the implementation in the two lines below.

You can play with this little construct by saving the code to a file, opening `ghci`, loading the file via `:l FileName.hs`, and then shooting some statements at it using the technique introduced above:

````
*Main> :t undefined :: Add Zero Zero
undefined :: Add Zero Zero :: Zero

*Main> :t undefined :: Add (Succ Zero) (Succ Zero)
undefined :: Add (Succ Zero) (Succ Zero) :: Succ (Succ Zero)
````

Look at that! We're doing type-level arithmetic! The first statement computes `0 + 0 = 0` with types, and the second one computes the type-level equivalent of `1 + 1 = 2`. But how does it work? Let's look at the code again:

```haskell
type instance Add Zero b = b
type instance Add (Succ a) b = Add a (Succ b)
```

These two lines implement the type function `Add`. There are two cases: in the first case, the first type argument is the type `Zero`, and the second argument is any type (`b`). Adding zero to some number results in that same number (`0 + x = x`). The second case is a recursive call where one argument is decremented, and the other argument incremented (`x + y = x - 1 + y + 1`) until the first argument is `Zero` and the calculation matches the first case. Decrementing works as follows: by pattern-matching on `Succ a`, we are able to extract the type inside of it, which is the type that corresponds to the number that's one smaller than it. For example, `Succ Zero` matched with the pattern `Succ a` binds `a` to `Zero`, and `Succ (Succ Zero)` matched with the same pattern binds `a` to `Succ Zero`.

You can imagine the execution of the `Add` type function going like this:

````
  Add (Succ (Succ Zero)) (Succ Zero)  --   2 + 1
= Add (Succ Zero) (Succ (Succ Zero))  -- = 1 + 2
= Add Zero (Succ (Succ (Succ Zero)))  -- = 0 + 3
= Succ (Succ (Succ Zero))             -- = 3
````

That's already pretty cool. But we are not done yet: so far we are only able to model positive numbers. We still would't be able to model the exponent in units like `1/s` which can also be written as `s^-1`. So we also need negative numbers.

## Negative numbers

```haskell
data Zero
data Succ a -- "successor"
data Pred a -- "predecessor"
```

We're going to use the type `Pred Zero` to represent -1, `Pred (Pred Zero)` -2, and so on. Now in order for addition to work with those new types, the `Add` type function has to be adjusted to cover all possible combinations of positive and negative numbers. The result looks like this:

```haskell
type family Add a b
type instance Add Zero b = b
type instance Add (Succ a) (Succ b) = Add a (Succ (Succ b))
type instance Add (Succ a) (Pred b) = Add a b
type instance Add (Pred a) (Succ b) = Add a b
type instance Add (Pred a) (Pred b) = Add a (Pred (Pred b))
```

This might take a while to chew on, so take your time and read it and try to construct some examples to try out on the console. If you can't come up with any, take a look at this little selection:

````
*Main> -- -1 + -1 = -2
*Main> :t undefined::Add (Pred Zero) (Pred Zero)
undefined::Add (Pred Zero) (Pred Zero) :: Pred (Pred Zero)

*Main> -- -1 + 1 = 0
*Main> :t undefined::Add (Pred Zero) (Succ Zero)
undefined::Add (Pred Zero) (Succ Zero) :: Zero

*Main> -- 1 + -2 = -1
*Main> :t undefined::Add (Succ Zero) (Pred (Pred Zero))
undefined::Add (Succ Zero) (Pred (Pred Zero)) :: Pred Zero

*Main> -- 1 + 1 = 2
*Main> :t undefined::Add (Succ Zero) (Succ Zero)
undefined::Add (Succ Zero) (Succ Zero) :: Succ (Succ Zero)
````

Looks like our type-level numbers are ready for prime time. Here is the whole program again, for reference, and I also threw in some aliases for negative type-level numbers:

```haskell
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE UndecidableInstances #-}

data Zero
data Succ a
data Pred a

-- convenience aliases
type One      = Succ Zero
type Two      = Succ One
type Three    = Succ Two
type NegOne   = Pred Zero
type NegTwo   = Pred NegOne
type NegThree = Pred NegTwo

type family Add a b
type instance Add Zero b = b
type instance Add (Succ a) (Succ b) = Add a (Succ (Succ b))
type instance Add (Succ a) (Pred b) = Add a b
type instance Add (Pred a) (Succ b) = Add a b
type instance Add (Pred a) (Pred b) = Add a (Pred (Pred b))
```

## What's next?

The next thing to do is use those type-level numbers to parameterize other types, such as `Length`. The technique we're going to use is called "phantom types". Stay tuned.

<i>(I am still in the process of writing the next posts.)</I>

[1]: /2013-12-24--physical-dimensions-and-types-0/
[2]: http://en.wikipedia.org/wiki/Peano_axioms
