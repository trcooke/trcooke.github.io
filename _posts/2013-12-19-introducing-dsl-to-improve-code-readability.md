---
layout: post
title: Introducing Domain Specific Language (DSL) to improve code readability
description: "Introducing Domain Specific Language (DSL) to improve code readability "
tags: [java, programming, dsl, readability]
---

I recently wrote an article about how to [Annotate Your Magic Numbers]({% post_url 2013-12-18-annotate-your-magic-numbers %}) which explored a solution for times when you have to pass some parameter values but it's not entirely clear what they mean. I used this code as an example:

{% highlight java %}
public class Range {
  private final int lowerBound;
  private final int upperBound;
   
  public Range(int lowerBound, int upperBound) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
  }
 
  public boolean isInRange(int number) {
    return (number >= lowerBound) && (number <= upperBound);
  }
}
{% endhighlight %}

{% highlight java %}
public class RangeTest {
  @Test
  public void shouldReturnFalseIfNotInRange() {
    Range range = new Range(1, 10);
    assertThat(range.isInRange(11), is(false));
  }
}
{% endhighlight %}

In the highlighted line it is not clear what the values "1" and "10" are. Another approach you can take is to introduce a [Domain Specific Language](http://en.wikipedia.org/wiki/Domain-specific_language) to provide the missing context and improve the readability of your tests. Sounds good but how would you go about it...

I'll start by doing an [Extract Method](http://refactoring.com/catalog/extractMethod.html) refactor on the Range object constructor giving the extracted method a name that provides some context to the parameters. I think "rangeBetweenBounds()" sounds like a good name.

{% highlight java %}
@Test
public void shouldReturnFalseIfNotInRange() {
  Range range = rangeBetweenBounds(1, 10);
  assertThat(range.isInRange(11), is(false));
}
 
private Range rangeBetweenBounds(int lowerBound, int upperBound) {
  return new Range(lowerBound, upperBound);
}
{% endhighlight %}

Now I notice that the temporary variable range is not really necessary so I do an [Inline Temp](http://www.refactoring.com/catalog/inlineTemp.html) refactor on that.

{% highlight java %}
@Test
public void shouldReturnFalseIfNotInRange() {
  assertThat(rangeBetweenBounds(1, 10).isInRange(11), is(false));
}
{% endhighlight %}

At this point I could probably stop. The introduction of the rangeBetweenBounds() method has provided a DSL that can be used to create Range objects with given bounds. I can reuse this in other test cases.

However, now I've done this I can see that the isInRange() method name doesn't really read very well. I'm pretty sure I can do better. A quick [Rename Method](http://refactoring.com/catalog/renameMethod.html) refactor and I'm now at a stage where I'm quite happy with how things have turned out. The test case is down to a single line of code and I think the intent and language is clear.

{% highlight java %}
public class Range {
  private final int lowerBound;
  private final int upperBound;
 
  public Range(int lowerBound, int upperBound) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
  }
 
  public boolean contains(int number) {
    return (number >= lowerBound) && (number <= upperBound);
  }
}
{% endhighlight %}

{% highlight java %}
public class RangeTest {
  @Test
  public void shouldNotContainOutOfBoundsValue() {
    assertThat(rangeBetweenBounds(1, 10).contains(11), is(false));
  }
 
  private Range rangeBetweenBounds(int lowerBound, int upperBound) {
    return new Range(lowerBound, upperBound);
  }
}
{% endhighlight %}

While working on the readability of my test I discovered a better name for the "isInRange" method in the production code. Renaming it to "contains" has now made the method more natural to use and expresses its behaviour more clearly. I started off trying to improve my tests, and ended up improving my production code too. For me that's a massive win.
