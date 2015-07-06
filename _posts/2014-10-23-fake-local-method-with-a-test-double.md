---
layout: post
title: Fake (Mock) local method with a Test Double
description: "Fake (Mock) local method with a Test Double"
tags: [testing, java, programming, mocking]
---

This is a scenario that comes up from time to time when working with Legacy Code. You're trying to get some code into a test harness but there's a local helper method being used that's difficult to instantiate and you want to replace it with a fake, or Test Double.

{% highlight java %}
package mocklocalmethod;

  public interface ThingsToBeDone {
    public void doAllTheThings();
  }
}
{% endhighlight %}

{% highlight java %}
package mocklocalmethod;
 
public class ActualThingsToBeDone implements ThingsToBeDone {
    @Override
    public void doAllTheThings() {
        doTheFirstThing();
        doTheSecondThing();
    }
 
    private void doTheFirstThing() {
        // Hard to test stuff
    }
 
    private void doTheSecondThing() {
        // Hard to test stuff
    }
}
{% endhighlight %}

Mockito, and the like, don't provide you the ability to do verifications on local instance methods but we can do it ourselves by creating a testable version of the class you want to test. We do this by creating a subclass that overrides the collaborator methods and provides access to inspect whether those methods have been called. We'll need to change the scope of the private collaborator methods from private to protected but that's a minor sacrifice for the gains of having your code in a test harness.

{% highlight java %}
package mocklocalmethod;
 
import mocklocalmethod.ActualThingsToBeDone;
import org.junit.Test;
 
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
 
public class ActualThingsToBeDoneTest {
 
    @Test
    public void doAllTheThings_shouldCall_doTheFirstThing_and_doTheSecondThing() {
        TestableThingsToBeDone thingsToBeDone = new TestableThingsToBeDone();
 
        thingsToBeDone.doAllTheThings();
 
        assertThat(thingsToBeDone.hasTheFirstThingBeenDone(), is(true));
        assertThat(thingsToBeDone.hasTheSecondThingBeenDone(), is(true));
    }
 
    private class TestableThingsToBeDone extends ActualThingsToBeDone {
        private boolean firstThingDone = false;
        private boolean secondThingDone = false;
 
        @Override
        protected void doTheFirstThing() {
            this.firstThingDone = true;
        }
 
        @Override
        protected void doTheSecondThing() {
            this.secondThingDone = true;
        }
 
        public boolean hasTheFirstThingBeenDone() {
            return firstThingDone;
        }
 
        public boolean hasTheSecondThingBeenDone() {
            return secondThingDone;
        }
    }
}
{% endhighlight %}

From here it's not difficult to change it to make assertions on the order and frequency in which the collaborating methods are called.
