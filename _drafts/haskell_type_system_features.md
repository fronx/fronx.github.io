---
layout: post
title:  "The many dimensions of Haskell's type system"
date:   2013-10-27
categories: haskell
---


Episode IV
A NEW HOPE
It is a period of civil war.
Rebel spaceships, striking
from a hidden base, have won
their first victory against
the evil Galactic Empire.

During the battle, Rebel
spies managed to steal secret
plans to the Empire's
ultimate weapon, the DEATH
STAR, an armored space
station with enough power
to destroy an entire planet.

Pursued by the Empire's
sinister agents, Princess
Leia races home aboard her
starship, custodian of the
stolen plans that can save her
people and restore
freedom to the galaxy....

--

TYPE WARS
Episode II

A HIGHER-ORDER SYSTEM

It had been a period of war. Types, using the mind-altering force known as Type Inference have won their first victory against the evil "dynamic" empire, freeing Values from their faceless, unityped existence.

The new government, called the Type System, gave Values new meaning and satisfaction. So much so, that Types started envying them for the power they gained from being part of a coherent system of meaning.

And so a new story began. The story of Types becoming more like Values. If only there was a system to govern them...

--

The premise of this talk: what could you do with types if types were more like values.

Let's look at a few things you can do with values:

- abstraction
- application
- partial application

lambda calculus! (in which the values are types)

abstraction

id = λx.x
type equivalent: identity type constructor

Identity Functor!
http://hackage.haskell.org/package/transformers-0.2.0.0/docs/src/Data-Functor-Identity.html#Identity
newtype Identity a = Identity { runIdentity :: a }

mul = λx. λy. x*y



What are the equivalents in the world of types?

- function <-> type constructor

[] :: * -> *

Constraints give you specific power.

functions <-> types <-> type constructors

kinds: types of type constructors:
  "abc" :: [Char]
  [Char] :: *

-- http://en.wikipedia.org/wiki/Kind_(type_theory)
A kind system is essentially a simply typed lambda calculus "one level up", endowed with a primitive type, denoted * and called "type", which is the kind of any (monomorphic) data type.

"data constructor":
  construct a value

"type constructor":
  construct a type from types
  if a type variable is involved, it's a type constructor
  example: polymorphic type (e.g. Tree)
  ```haskell
  Tree :: * -> *
  data Tree a = Tip | Node a (Tree a) (Tree a)
  ```

ADT:
  one type, multiple data constructors

type class:
  overload a function for multiple argument types

GADT:
  synonyms:
    "first-class phantom type"
    "guarded recursive datatype"
    "equality-qualified type"
  one type, multiple _complex_ constructors
    allow arbitrary return type for constructors,
    provided outermost type constructor is still
    the type being defined

"The key point about GADTs is that pattern matching causes type refinement.""
— http://www.haskell.org/ghc/docs/latest/html/users_guide/data-type-extensions.html#gadt

type family:
  http://www.haskell.org/haskellwiki/GHC/Type_families
  "ad-hoc overloading of data types" (not type constructors??)
  "data type analogue of type classes"
    overload data, instead of functions
  two flavors:
    - data families
    - type synonym families



a type constructor is an "n-ary type operator"
  "function on types"
    type(s) in, type out
  they also have a type themselves: "kind"

if they are basically functions, then… can we do things with them that we can do with functions?

anonymous type constructors?
  (\x -> 2 * x) 1
  type equivalent?

questions:
