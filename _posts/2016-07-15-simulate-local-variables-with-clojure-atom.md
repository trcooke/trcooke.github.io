---
layout: post
title: Simulate local variables in Clojure with Atoms
description: "Simulate local variables in Clojure with Atoms"
tags: [clojure, functional, programming, atom]
---

I write Java for a living. I'm familiar with classes having state. For example:

{% highlight java %}
public class EchoService {
    private Map<String, String> messages = new HashMap<>();

    public String getMessageForKey(String key) {
        return message.get(key);
    }

    public void setMessageForKey(String key, String message) {
        messages.put(key, message);
    }
}
{% endhighlight %}

How can I achieve something similar in Clojure? Perhaps defining a map `(def messages {})`? No, that won't work because a `def` is immutable so I can't add any elements to it. The good new is that I can use an [atom](http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/atom).

## What's an Atom?

An Atom is a reference to something. That something can be any type of value, in this it refers to a map.
{% highlight clojure %}
(def messages (atom {}))
{% endhighlight %}
### `deref`
You can ask at atom to give you the value it refers to using `deref`
{% highlight clojure %}
(deref ref)
(deref ref timeout-ms timeout-val)
{% endhighlight %}
Example
{% highlight clojure %}
(deref messages)
{% endhighlight %}
### `swap!`
Most importantly, for the purposes of this exercise, by using `swap!` I can apply a function to the value it refers to then have it refer to the result of that function.
{% highlight clojure %}
(swap! atom f)
(swap! atom f x)
(swap! atom f x y)
(swap! atom f x y & args)
{% endhighlight %}
Example
{% highlight clojure %}
(swap! messages assoc "key" "val")
{% endhighlight %}
The atom `messages` now refers to the map `{"key" "val"}`.

## Putting it all together
Writing the equivalent of that Java code in Clojure
{% highlight clojure %}
(def messages (atom {}))

(defn get-message-for-key [key]
    (key (deref messages))
)

(defn set-message-for-key [key val]
    (swap! messages assoc key val)
)
{% endhighlight %}
