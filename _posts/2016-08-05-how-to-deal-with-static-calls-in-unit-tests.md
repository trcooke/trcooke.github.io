---
layout: post
title: How to deal with static calls in Unit Tests without using PowerMock
description: "How to deal with static calls in Unit Tests without using PowerMock"
tags: [testing, java, programming, powermock, unit test]
---

I'm writing tests for a class and the class has a dependency on a static call but I don't want to include that dependency in the scope of my test. What do I do? With a static dependency I have limited choices, the most well known of which is to use PowerMock. However, I find introducing PowerMock into my test cases adds a lot of chaff that I don't like because it can hide the true nature of the test.

Thankfully there are other options. I'll explore one of them here.

I have a class that looks like this:

{% highlight java %}
public class EnthusiasmGuage {

    public String howEnthused() {
        switch (Today.whatDayIsIt()) {
            case "Monday": return "Moderate";
            case "Tuesday": return "Good";
            case "Wednesday": return "Good";
            case "Thursday": return "Moderate";
            case "Friday": return "Low";
            case "Saturday": return "Epic";
            case "Sunday": return "Epic";
            default: return "Erm, what?";
        }
    }
}
{% endhighlight %}

The tricky part of testing this method is that the call to `Today.whatDayIsIt()` is static. I don't want to include that method in my tests because, well it could be for a number of reasons but let's just say that including it is a bad idea. Besides, all I want to do is verify that the `howEnthused()` method returns `"Epic"` on a Saturday. I need to get the behaviour of `Today.whatDayIsIt()` under my control.

Here's how.

I wrap the static call to `Today.whatDayIsIt()` in an instance class, inject the wrapper class into the class under test, then use my normal tools to replace the instance class with a test double or mock.

{% highlight java %}
public class EnthusiasmGuage {

    private TodayWrapper todayWrapper;

    public EnthusiasmGuage() {
        todayWrapper = new TodayWrapper();
    }

    public EnthusiasmGuage(TodayWrapper todayWrapper) {
        this.todayWrapper = todayWrapper;
    }

    public String howEnthused() {
        switch (todayWrapper.whatDayIsIt()) {
            case "Monday": return "Moderate";
            case "Tuesday": return "Good";
            case "Wednesday": return "Good";
            case "Thursday": return "Moderate";
            case "Friday": return "Low";
            case "Saturday": return "Epic";
            case "Sunday": return "Epic";
            default: return "Erm, what?";
        }
    }
}
{% endhighlight %}
The wrapper class simply delegates on to the static call. The functionality has not changed.
{% highlight java %}
public class TodayWrapper {

    public String whatDayIsIt() {
        return Today.whatDayIsIt();
    }
}
{% endhighlight %}

OK good, but now what. I can now replace the wrapper with a test double where I have the ability to set the day at runtime. Because this fake version is only for use within this test case I can declare it as a private inner class of the test itself.

{% highlight java %}
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

public class EnthusiasmGuageTest {

    @Test
    public void whenSaturday_enthusiasmEpic() {
        SetDayTodayWrapper todayWrapper = new SetDayTodayWrapper("Saturday");

        EnthusiasmGuage enthusiasmGuage = new EnthusiasmGuage(todayWrapper);

        assertThat(enthusiasmGuage.howEnthused(), is("Epic"));
    }

    private class SetDayTodayWrapper extends TodayWrapper {
        private String dayToday;

        public SetDayTodayWrapper(String dayToday) {
            this.dayToday = dayToday;
        }

        @Override
        public String whatDayIsIt() {
            return dayToday;
        }
    }
}
{% endhighlight %}
That's it. I've tested my `EnthusiasmGuage` class without resorting to using PowerMock or any other Reflection based wizardry.
