---
layout: post
title:  "Physical dimensions and types &mdash; Part 2"
subtitle: "Phantom types"
date:   2013-12-24
categories: haskell, types
summary: "This post gets us about half way to a usable physical dimensions library. We're going to use type-level numbers as type arguments in phantom types, and we're going to make use of some type-level arithmetic."
---

<i>[Part 1][1] of this series introduced type-level numbers as a first step to solve issue 1 described in [part 0][0]. If you haven't read them, you may want to do that first to make sure you understand the context.</i>

Now that we know [how to define type-level numbers][1], let's go and use them. We only have to find out what exactly "using them" means. Because as mentioned before, they are types that don't come with any constructors.

What allows us to use them is something called "phantom types". The following code snippet shows how to define a phantom type and create values of it.

```haskell
data Length n = Meter Double -- `Length` is a phantom type and
                             -- `n` is a phantom type variable

x :: Length Two -- this sets `n` to the type `Two`
x = Meter 1.2   -- x = 1.2 m^2
```

The type `Two` is one of the type-level numbers we defined in [the previous post][1]. `Length Two` is supposed to be a type for areas. What makes `Length` a phantom type is the fact that the type variable `n` can't be set directly via a constructor. `n` is a phantom type variable. To have something to contrast this with, and in order to understand the whole concept of type variables better, let's look at some code that only uses non-phantom type variables:

```haskell
data Pair a b = MakePair a b

p :: Pair Char [Char] -- this line is optional
p = MakePair 'a' "abc"
```

In this example, `a` and `b` are type variables. In order for `Pair` to become a proper type, each one of them has to be assigned to a concrete type. <i>(Aside: I gave the constructor a different name than the type to reduce confusion about which one is which. But you could also name them the same.)</i>

The way `a` and `b` get filled in is by calling the constructor `MakePair` with two values. `MakePair 'a' "abc"` sets the type variable `a` to the type of `'a'`, which is `Char`, and the type variable `b` to the type of `"abc"`, which is `[Char]`. So even though the variables stand for *types*, you provide the type arguments indirectly via *values*.

Now let's go back to our code to see how the phantom type variable `n` gets set:

```haskell
data Length n = Meter Double -- `n` is a phantom type variable

x :: Length Two              -- this sets `n` to the type `Two`
x = Meter 1.2

y = (Meter 1.2)::Length One  -- set `n` to the type `One`
```

The constructor call `Meter 1.2` doesn't set `n` to anything, and it can't. What does set it is the type signature of `x`. It simply states that the type of `x` will be `Length Two`. The constructor call itself would result in a value of type `Length n`, because it doesn't specify what `n` should be. Matching that type with the type `Length Two` in the type signature is what leads to `n` being set to `Two`.

For `y` we're using an alternative syntax for doing the same thing: filling in the phantom type variable `n` with a concrete type (`One`).

The concept of phantom types may sound a little weird at first, but basically it's just a way of storing metadata in types.

## More dimensions, please

Since length is only one dimension and there are many more, how about we just go ahead and add all of them to a generic phantom type we call `Quantity`. There are [exactly seven of them][2]:

```haskell
data Quantity l m t i th n j = Quantity Double
  -- l    -- length
  -- m    -- mass
  -- t    -- time
  -- i    -- electric current
  -- th   -- thermodynamic temperature
  -- n    -- amount of substance
  -- j    -- luminous intensity

-- some type synonyms for convenience and illustrative purposes
-- yes, i copied that comment from dimensional-tf
type Length = Quantity  One Zero   Zero Zero Zero Zero Zero
type Speed  = Quantity  One Zero NegOne Zero Zero Zero Zero
type Time   = Quantity Zero Zero    One Zero Zero Zero Zero

x :: Length
x = Quantity 1.4 -- meters

y :: Speed
y = Quantity 3.2 -- m/s
```

The `Quantity` type represents physical dimensions as positional phantom type variables. Combinations of base dimensions can be constructed by filling in the right positions with the right type-level numbers.

<i>Aside: A structure similar to this one is a core concept in the [dimensional-tf][3] library, except that there, it's still a little bit more complicated: instead of having one type to rule them all, similar to the `Quantity` type above, it spreads things out over two types, `Dimensional` and `Dim`, and in addition to that, it uses a phantom type variable to distinguish between two subtypes of `Dimensional`: `Unit` and `Quantity`. [If you're intrigued, check it out][3].</i>

Now that we're able to give variables explicit physical unit types, the next interesting thing would be to enable operations such as addition and multiplication on them. The following piece of code adds that functionality.

```haskell
-- disambiguate the built-in `+` and `*` operators from our custom ones
import Prelude hiding ((+), (*))
import qualified Prelude as P ((+), (*))

-- ...

(+) :: Quantity l m t i th n j ->
       Quantity l m t i th n j ->
       Quantity l m t i th n j
(Quantity x) + (Quantity y) = Quantity (x P.+ y)

(*) :: Quantity l1 m1 t1 i1 th1 n1 j1 ->
       Quantity l2 m2 t2 i2 th2 n2 j2 ->
       Quantity (Add  l1  l2)
                (Add  m1  m2)
                (Add  t1  t2)
                (Add  i1  i2)
                (Add th1 th2)
                (Add  n1  n2)
                (Add  j1  j2)
(Quantity x) * (Quantity y) = Quantity (x P.* y)
```

What the type signature of the `(+)` function says is that it takes two quantities of exactly the same `Quantity` type, i.e. where all the phantom type variables match, and returns a value of the same type.

The `(*)` function has a similar function body as `(+)`. Its type signature is quite different, though. The function accepts any two quantities, the dimensional type variables of the first and second argument don't have to match. The type of the return value is a `Quantity` where the type variables are the pairwise sum of the corresponding type variables in the two input types. Since they are type-level numbers and addition is defined for them via the `Add` type function, that works just fine.

Now here is a program that contains all the things we've covered so far: you can define physical quantities, and you can add and multiply them:

```haskell
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE UndecidableInstances #-}

import Prelude hiding ((+), (*))
import qualified Prelude as P ((+), (*))
import Data.Typeable (Typeable)

data Zero
data Succ a
data Pred a

type One   = Succ Zero
type Two   = Succ One
type Three = Succ Two
type NegOne   = Pred Zero
type NegTwo   = Pred NegOne
type NegThree = Pred NegTwo

type family Add a b
type instance Add Zero b = b
type instance Add (Succ a) (Succ b) = Add a (Succ (Succ b))
type instance Add (Succ a) (Pred b) = Add a b
type instance Add (Pred a) (Succ b) = Add a b
type instance Add (Pred a) (Pred b) = Add a (Pred (Pred b))

data Quantity l m t i th n j = Quantity Double deriving Show
  -- l    -- length
  -- m    -- mass
  -- t    -- time
  -- i    -- electric current
  -- th   -- thermodynamic temperature
  -- n    -- amount of substance
  -- j    -- luminous intensity

type Length = Quantity One  Zero   Zero Zero Zero Zero Zero
type Speed  = Quantity One  Zero NegOne Zero Zero Zero Zero
type Time   = Quantity Zero Zero    One Zero Zero Zero Zero

(+) :: Quantity l m t i th n j ->
       Quantity l m t i th n j ->
       Quantity l m t i th n j
(Quantity x) + (Quantity y) = Quantity (x P.+ y)

(*) :: Quantity l  m  t  i  th  n  j ->
       Quantity l' m' t' i' th' n' j' ->
       Quantity (Add l  l')
                (Add m  m')
                (Add t  t')
                (Add i  i')
                (Add th th')
                (Add n  n')
                (Add j  j')
(Quantity x) * (Quantity y) = Quantity (x P.* y)
```

To see if it works, save the code to a file, load it into the Haskell console and calculate a few things:

```haskell
*Main> let x = (Quantity 2.0)::Length
*Main> let y = (Quantity 3.0)::Speed
*Main> let z = (Quantity 4.0)::Time

*Main> x * y
Quantity 6.0

*Main> :t x * y
x * y :: Quantity (Succ (Succ Zero)) Zero (Pred Zero) Zero Zero Zero Zero

*Main> z * y
Quantity 12.0

*Main> :t z * y
z * y :: Quantity (Succ Zero) Zero Zero Zero Zero Zero Zero
```

What this output means is that the basic mechanisms are in place. Values can have physical units, modelled with types. (Yay!) Issue 1 ("higher powers", see [part 0][0]) is solved. Issue 2 ("units that are combinations of units") has been taken care of. And issue 3 ("multiplication and division") has been solved for the multiplication case, and it should be relatively easy to implement division analogously.

There are still a few rough edges that could be smoothed out:

- It would be nice if there was a common way to print physical quantities.
- The interface for creating values could be simpler, with less explicit typing everywhere.
- `Quantity` has a lot of type variables that are all sort of related. It may make sense to give the whole collection of them its own identity and replace them with only one type variable.

<i>Let me know how you liked this series of posts so far by [tweeting at me][4].</I>

[0]: /2013-12-24--physical-dimensions-and-types-0/
[1]: /2013-12-24--physical-dimensions-and-types-1/
[2]: http://en.wikipedia.org/wiki/International_System_of_Units
[3]: http://hackage.haskell.org/package/dimensional-tf-0.2.1/src/Numeric/Units/Dimensional/TF.lhs
[4]: http://twitter.com/fronx
