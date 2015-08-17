---
layout: post
title:  "Name this pattern"
date:   2014-03-01
excerpt: "How to hide the fact that we're implementing functions via dictionaries; in JavaScript."
---

Sometimes it is possible to give an equivalent implementation of a function in the form of a dictionary, or, in the JavaScript world, an object:

```javascript
function a (arg) {
  if (arg == "x") {
    return 1
  } else if (arg == "y") {
    return 2
  }
}

// equivalent object
A = { "x": 1
    , "y": 2
    };

a("x") // => 1
A["x"] // => 1
```

The advantage the object gives us is its concise literal syntax, and some conceptual simplification, since it is now clear that the behavior depends on the argument in a straight-forward, lookup-like way.

What is not so nice, though, is that an implementation detail is leaking to the outside: you must use square brackets instead of round parentheses, just because instead of a function, we're using an object.

What can we do about it?

We could wrap the object in a function that forwards to the object:

```javascript
A = { "x": 1
    , "y": 2
    };

a = function (arg) { return A[arg]; }

a("x") // => 1
```

That looks pretty okay. The implementation detail is not leaking to the outside anymore. But what happens if you have a lot of such forwarding constructions?

```javascript
A = { "x": 1
    , "y": 2
    };

B = { "w": 3
    , "z": 4
    };

C = { ... };


a = function (arg) { return A[arg]; }
b = function (arg) { return B[arg]; }
c = ...

```

There are a couple of things that are not so nice about this. First of all, the code is kind of repetitive. The forwarders look all basically the same, the only difference being what object they forward to. What's also a bit ugly is that we have to name the objects even though they are only referenced once, so naming them seems like kind of a waste.

It turns out that both issues can be solved at the same time, using the following pattern:

```javascript
function forwarder (obj) {
  return function (arg) {
    return obj[arg];
  };
}

a = forwarder(
  { "x": 1
  , "y": 2
  });

b = forwarder(
  { "w": 3
  , "z": 4
  });

a("x") // => 1
b("w") // => 3
```

I don't know if "forwarder" is the best name, and I don't know if this is a common pattern in the JavaScript world. But it seems like it should be, doesn't it?
