---
title: "React Compiler: The End of useMemo?"
description: "If you hate memoization bookkeeping, React Compiler might be your new best friend."
publishedAt: 2026-03-18
tags: ["React", "Performance", "Technical"]
---

Let's be honest: memoization in React is tedious.

```javascript
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
const memoizedCallback = useCallback((id) => handleClick(id), [handleClick]);
const memoizedComponent = React.memo(MyComponent);
```

Every. Single. Time. Something might re-render unnecessarily.

And the worst part? You probably got it wrong half the time anyway. Either you memoized things that didn't need it, or you forgot to memoize something that did.

React Compiler wants to fix that.

## What Is React Compiler?

React Compiler (formerly React Forget) is a tool that automatically optimizes your React code by handling memoization for you.

Instead of you telling React what to memoize, the compiler figures it out.

**Before (without compiler):**

```javascript
function ProductList({ products, onSelect }) {
  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.price - b.price),
    [products],
  );

  const handleSelect = useCallback(
    (id) => {
      onSelect(id);
    },
    [onSelect],
  );

  return (
    <div>
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
```

**After (with compiler):**

```javascript
function ProductList({ products, onSelect }) {
  // Compiler automatically memoizes expensive operations
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  // And function references that need stability
  const handleSelect = (id) => {
    onSelect(id);
  };

  return (
    <div>
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
```

Same code. Better performance. No bookkeeping.

## How It Works

React Compiler analyzes your components and hooks at build time. It identifies:

1. **Values that depend only on props/state** → automatically memoized
2. **Functions that reference stable values** → automatically memoized
3. **Components that can skip re-renders** → automatically wrapped in `React.memo`

The compiler only optimizes code that follows React's rules (no side effects in render, proper dependencies, etc.). If your code has issues, the compiler tells you.

## What This Means for You

If you've been writing React for a while, you've probably developed strong opinions about when to memoize:

- "Only memoize expensive calculations"
- "Don't memoize primitives"
- "Don't memoize if dependencies change often"
- "Be careful with useCallback—it can hurt performance if overused"

These rules exist because manual memoization is a tradeoff. Memoize wrong, and you either waste memory or introduce bugs.

React Compiler removes that tradeoff. It applies memoization precisely where needed, based on actual code analysis, not heuristics.

## Should You Use It?

React Compiler is still evolving. But here's my take:

**If you're starting a new project:** Consider it. The mental overhead of memoization bookkeeping goes away, and you write cleaner code.

**If you have an existing codebase:** Migration isn't trivial. You need to ensure your code follows React's rules strictly. But the payoff—removing hundreds of memoization calls across a large codebase—could be worth it.

**If you love micro-optimizing:** You might resist this. And that's fine. But for most production apps, the compiler's decisions will match or exceed your manual optimizations.

## My Take

I haven't used it in production yet (as of early 2026). But I've been watching closely.

The promise is compelling: write natural React code, get optimal performance automatically. No more `useMemo`/`useCallback`/`React.memo` roulette.

If the compiler reaches stability and ecosystem support, I think it could change how we write React fundamentally.

Less time fighting the optimizer. More time building features.

---

_Have you tried React Compiler? I'd love to hear about real-world experiences—especially gotchas or surprises. Reach out._
