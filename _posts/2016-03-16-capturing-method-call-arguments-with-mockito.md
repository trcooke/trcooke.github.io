---
layout: post
title: Capturing Method Call Arguments with Mockito
description: "Capturing Method Call Arguments with Mockito"
tags: [testing, java, programming, mocking, mockito]
---

Here's how to capture arguments being passed to a method in order to make assertions on them.

Take the following production code. You want to make assertions on the `User` object that is being passed into the `migrationDao.migrate()` method from your class under test.

{% highlight java %}
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return this.name; }

    public int getAge() { return this.age; }
}
{% endhighlight %}

{% highlight java %}
public class MigrationService {
    private MigrationDao migrationDao;

    public MigrationService(MigrationDao migrationDao) {
        this.migrationDao = migrationDao;
    }

    public void migrate(User user) {
        migrationDao.migrate(user);
    }

}
{% endhighlight %}

Capture the argument using Mockito's `ArgumentCaptor` in order to make specific assertions on the object passed.

{% highlight java %}
public class MigrationServiceTest {

    private MigrationService MigrationService;
    private MigrationDao migrationDaoMock;

    @Before
    public void setup() {
        migrationDaoMock = mock(MigrationDao.class);
        migrationService = new MigrationService(migrationDaoMock);
    }

    @Test
    public void migrate_givenMigrateSingleUserNamedTimAged37_shouldReceiveUserNamedTimAged37() {
        User userToMigrate = new User("Tim", 37);
        migrationService.migrateUser(userToMigrate);
        
        ArgumentCaptor<User> userArgCaptor = ArgumentCaptor.forClass(User.class);
        verify(mockMigrationDao).migrate(userArgCaptor.capture());
        User userPassedToMigrationDao = userArgCaptor.getValue();
        
        assertThat(userPassedToMigrationDao.getName(), is("Tim"));
        assertThat(userPassedToMigrationDao.getAge(), is(37));
    }
}
{% endhighlight %}

