---
layout: post
title: Observing static System.out calls with Unit Tests
description: "Observing static System.out calls with Unit Tests"
tags: [testing, java, programming, mockito]
---

Have you ever had a method that looks like this, where the overvable output is a static call to System.out.println(), and wondered how to test it?

{% highlight java %}
public class NameCaller {

    public void nice(String name) {
        System.out.println("Hello " + name + ", nice to see you.");
    }

    public void nasty(String name) {
        System.out.println("Ugh, not " + name + " again.");
    }
}
{% endhighlight %}

You want to verify that when you pass in the String "Tim" to the `nice()` method you get "Hello Tim, nice to see you." printed to the terminal. But, how the heck do you sense what's being printed to the terminal?

Here's how.

Wrap the calls to System.out in an instance class, inject the wrapper class into the class under test, then use a class mocking test tool to capture the output. For example with jUnit and Mockito:

{% highlight java %}
public class NameCaller {
    private SystemOutWrapper systemOut = new SystemOutWrapper();

    public NameCaller() {}

    public NameCaller(SystemOutWrapper systemOut) {
        this.systemOut = systemOut
    }

    public void nice(String name) {
        systemOut.println("Hello " + name + ", nice to see you.");
    }

    public void nasty(String name) {
        systemOut.println("Ugh, not " + name + " again.");
    }
}
{% endhighlight %}

{% highlight java %}
public class SystemOutWrapper {
    public void println(String output) {
        System.out.println(output);
    }
}
{% endhighlight %}

{% highlight java %}
public class NameCallerTest {
    private SystemOutWrapper systemOut;
    private NameCaller nameCaller;

    @Before
    public void setUp() {
        systemOut = mock(SystemOutWrapper.class);
        nameCaller = new NameCaller(systemOut);
    }

    @Test
    public void nice_givenName_shouldPrintNiceMessage() {
        nameCaller.nice("Tim");
        verify(systemOut).println("Hello Tim, nice to see you.");
    }

    @Test
    public void nasty_givenName_shouldPrintNastyMessage() {
        nameCaller.nasty("John");
        verify(systemOut).println("Ugh, not John again.");
    }
}
{% endhighlight %}

You can employ this general technique to observe calls to static methods in any class.