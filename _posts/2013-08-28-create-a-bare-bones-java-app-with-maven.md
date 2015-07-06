---
layout: post
title: Create a bare bones Java application with Maven
description: "Create a bare bones Java application with Maven"
tags: [java, programming, maven]
---

Here's how to create a bare bones Java application using Apache Maven (v3.0.3 at time of writing).

The Command
-----------

{% highlight bash %}
mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=org.apache.maven.archetypes -DgroupId=com.trcooke.mvndemo -DartifactId=maven-demo
{% endhighlight %}

The Command Explained
---------------------

mvn : Maven command
archetype:generate : Maven goal
-DinteractiveMode=false : Use all default values.
-DarchetypeGroupId=org.apache.maven.archetypes : Tells maven where to look for project templates.
-DgroupId=com.trcooke.mvndemo : Root package name of your Java project
-DartifactId=maven-demo : Project module name. Directory of this name is created for the project. 

The Command Output
------------------

{% highlight bash %}
$ mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=org.apache.maven.archetypes -DgroupId=com.trcooke.mvndemo -DartifactId=maven-demo
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] ------------------------------------------------------------------------
 
....
 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.637s
[INFO] Finished at: Wed Jul 03 22:41:06 BST 2013
[INFO] Final Memory: 7M/81M
[INFO] ------------------------------------------------------------------------
{% endhighlight %}

The project structure
---------------------

{% highlight bash %}
maven-demo/
├ pom.xml
└ src
  ├ main
  │ └ java
  │   └ com
  │     └ trcooke
  │       └ mvndemo
  │         └ App.java
  └ test
    └ java
      └ com
        └ trcooke
          └ mvndemo
            └ AppTest.java
{% endhighlight %}

The pom.xml
-----------

{% highlight xml %}
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0" xsi:schemalocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">  <modelversion>4.0.0</modelversion>
  <groupid>com.trcooke.mvndemo</groupid>
  <artifactid>maven-demo</artifactid>
  <packaging>jar</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>maven-demo</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupid>junit</groupid>
      <artifactid>junit</artifactid>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
{% endhighlight %}

Maven's the default version of jUnit is pretty old so I would recommend updating to the latest version, which is currently 4.11 but check on maven.org

{% highlight xml %}
<dependency>
  <groupid>junit</groupid>
  <artifactid>junit</artifactid>
  <version>4.11</version>
  <scope>test</scope>
</dependency>
{% endhighlight %}

The stub class
--------------

We have a simple 'Hello World!' implementation of a Java class created for us.

{% highlight java %}
package com.trcooke.mvndemo;
  
/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
    }
}
{% endhighlight %}

The stub jUnit test
-------------------

{% highlight java %}
package com.trcooke.mvndemo;
  
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
  
/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
        super( testName );
    }
  
    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }
  
    /**
     * Rigourous Test :-)
     */
    public void testApp()
    {
        assertTrue( true );
    }
}
{% endhighlight %}

Worth noting that this test is for jUnit version 3.x where we are extending junit.framework.TestCase. Using jUnit 4.x we use the @Test annotation on the test method instead. We also do not need the constructor or the suite() method which simplifies things considerably.

{% highlight java %}
package com.trcooke.mvndemo;
  
import org.junit.Test;
  
public class AppTest {
    @Test
    public void testApp() {
        assertTrue(true);
    }
}
{% endhighlight %}
