---
layout: post
title: Annotate your Magic Numbers
description: "Annotate your Magic Numbers"
tags: [java, programming, readability]
---

We all know that Magic Numbers are pretty high up on the list of programming sins, but I still see them, and have written them, a lot. I find that they are particularly prevalent in Test code where you might think it doesn't matter so much. In fact, it is as important to make your intent clear in Tests as it is in Production code. Here's a nice easy example with an accompanying Unit Test with some Magic Numbers in it. (I'm using Java for this example but it isn't important)

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
  public final void shouldReturnFalseIfNotInRange() {
    Range range = new Range(1, 10);
    assertThat(range.isInRange(11), is(false));
  }
}
{% endhighlight %}

I have highlighted the line of code I'm particularly interested in where we have a couple of Magic Numbers, the "1" and "10". Reading this article it's kind of obvious what they are because we have the Range() constructor implementation just a few lines away, but in a real system that would be in a different file and would require you to go and find it. This sounds like a trivial problem but it's a diversion that interrupts your flow of thinking about the test. So what can we do about it?

We can annotate them with a name.

For languages such as Java that do not support named parameters there's a nice little trick we can employ that uses simple helper methods as annotations to provide naming.

{% highlight java %}
public class RangeTest {
  @Test
  public final void shouldReturnFalseIfNotInRange() {
    Range range = new Range(lowerBound(1), upperBound(10));
    assertThat(range.isInRange(11), is(false));
  }
}
 
private int lowerBound(int lowerBound) {
  return lowerBound;
}
 
private int upperBound(int upperBound) {
  return upperBound;
}
{% endhighlight %}

Simply wrapping the parameter values in a private method, that simply returns the value it's given, allows you to use the method name as a means to give the Magic Numbers a name.
