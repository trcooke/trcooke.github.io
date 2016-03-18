---
layout: post
title: "There ain't no T in TDD"
excerpt: "There ain't no T in TDD"
tags: [testing, software, process, tdd]
---

TDD is Specifying, not Testing
------------------------------

I’ve been practicing TDD for a little while now and it has made a huge difference to the way I work. Not from the outside, I still get stuff done, I still swear at the computer (a lot), and I still make mistakes (also a lot). But from the inside, things are much calmer and I feel much more in control of my workflow. Most valuably I know when I’m done.

However. There’s a conversation I have with myself from time to time, and it goes a little like this:

> “OK, so I have to implement x, and x has to do y”
>
> “Fine. I’ll write a test for that”
>
> “Wait, but what am I testing? There’s nothing there yet. How I can I be testing if there’s nothing there to test? It doesn’t make sense.”
>
> “So what am I doing? It feels more like I’m writing a specification for something I haven’t done yet. Yes, that sounds better.”

And then I get on with it. A bit worried that I’m talking to myself.

The traditional TDD mantra is “__Test -> Code -> Refactor__”. I like this, and I have a sticky note next to my monitor with that scribbled on it in an attempt to keep me right. But I’m going to change it to a new mantra: “__Specify -> Satisfy -> Refactor__”. The practice is the same but the changed semantics remind me what it is that I’m actually doing. Which is defining the __specification__ up front in a way that will automatically verify whether my implementation __satisfies__ it. I repeat this cycle until I can’t think of any more things it should, or shouldn’t, do. Then I stop. I’m done. Walk away. Move on.

But don’t forget to refactor. Never forget to refactor.

A final thought. Since practicing TDD I have noticed something very interesting. I still make mistakes, and I will continue to do so. But the nature of my mistakes have changed from:

> “It’s doing what? It’s not supposed to do that! I don’t have a good feeling about this!”

to

> “Oh you wanted it to do that? I thought you wanted it to do this. OK, I’ll update the spec and change the code. No problem”

So away I go, update the specification code, change the implementing code to satisfy it.

Stop. I’m done. Walk away. Move on.