ComMotion
=========

##Notes for the graders

**Installing postgres**

This is how we installed postgres for our app (graders can skip if postgresql-server-dev-9.1 is already installed):
```
sudo apt-get install postgresql postgresql-server-dev-9.1
sudo su postgres
createuser -P vagrant //Answer no to all questions
createdb -O vagrant commotion
exit
```

To view the data in the database (when shell user is vagrant):
```
psql -d commotion
```

To load the database with our predefined data:
```
psql -d commotion -a -f CreateDb.sql
```

**Logging in**

We have multiple test users. For best results, we recommend logging in as user **dorianYates** and password **commotion**.

##ComMotion Documentation

Welcome to ComMotion's documentation page!  We hope you'll find all the help you'll need to easily navigate and fully
enjoy our exercise and fitness website, featuring YOU, and everyday athletes just like you.

**Where do I start?**

Our landing page offers options for new users to sign up, and for members to log in.

**I'm a new user.  How do I become a member?**

Click on the link in the Sign In box that says *"Sign Up Here."*  You'll see a pop up window where you can enter your
ComMotion user name and password.  Enter your password again to confirm.  Click on the *Sign Up* button.  Next, you'll 
see the *Create Your Profile* pop up window.  Click one of the radio buttons to indicate your skill level, and
click any of the checkboxes to record your favorite activities (of course, you can click more than one!).  If you like,
you can add more information about yourself in the *Bio* text area.  You can also add an optional *Profile Picture* URL by
typing or pasting a URL into that text box.  When you're ready to submit your profile, click the Save Changes button.
Now you're a full-fledged member of ComMotion!  You'll return to the landing page, where you can enter your new user
name and password. Click on the Login button, and you can see yourself on your new Profile page. Now, start causing a 
commotion!

**I'm already a member.  How do I log in?**

On the landing page, just enter your user name and passwork, click the *Login* button, and you're good to go.

**How do I get around ComMotion?**

Once you log in, there is a convenient navigation bar at the top of every page.  Just click on the button for the page you
want, and we'll take you there.

**What's all this stuff on my *Profile* page?**

On the *Profile* page, you'll see your picture and your unique profile.  *Followers* will tell you how many followers you
have.  Click on the *Followers* link to see who they are. The *Following* link tells you how many people you are following. 
Click on that link to see who they are. If you click on the picture of any of these members, you will be taken to their 
*Profile* page, where you can follow or un-follow them by clicking on the red *Follow User* button in the lower left column.  The *Posts* button will display your posts.  The *Creations* button will show you all of the exercises and workouts you have
created.  Want to change your profile information?  Clicking the *Edit Profile* button will provide a pop up window where you can update your user profile.

**How do I read and write posts?**

To read a post, go to your *Profile* page and click on the *Posts* button.  To write a post, go to your *Locker* page.  Enter
whatever you'd like to say in the text box, then click *Post*.

**How do I find another user?**

Go to the *Find Users* page and use the *Search for User* features to look for another ComMotion member.  You can optimize
the search by choosing a Skill level and/or Activities.  If you know the user name of the person you're searching for, you
can enter it into the text box, then click on *Search*.

**How do I manage my following?**

If you want to follow another member, go to the *Find Users* page and use the *Search for User* feature as described above.
Once you find them, click on their picture and you'll be taken to their *Profile* page. You can also click on the picture of 
any member who appears on your own *Profile* page when you click on *Followers* or *Following*.   Look for a red
 *Follow User* button in the lower left corner.  Click on this, and you become a follower of this member. If you are already
a follower and don't want to be, the red button will say "*Unfollow User*."  Click on this and you will no longer be a
follower of this member.  

**How do I find an exercise or workout?**

Go to the *Encyclopedia* page, where you'll find search utilities and thumbnails of new exercises and workouts.  If you'd
like to search through an index, click on the *Encyclopedia Index* button.  Choose the appropriate tab, then click on the
link for any exercise or workout you'd like to see.  You can also use our Search engine by choosing a muscle group and
difficulty level, then entering the exercise or workout name into the text box.  Just entering the name works great too.       If more than one result pops up, just click on the one you'd like to see.

**How do I add or delete an exercise or workout to or from *My Favorites*?**

When viewing an exercise or workout in the *Encyclopedia*, you will find an *Add to favorites* button near the top of the
page.  Use this to add the exercise or workout to your Favorites folder.  If you want to delete an exercise or workout
from your Favorites folder, go to the *My Favorites* page and click on the "x" in the upper right corner of the exercise
or workout you want to get rid of.  

**How do I edit an existing exercise or workout?**

Each exercise and workout in the *Encyclopedia* has an *Edit this entry* button near the top of the page.  Clicking on this
button will bring you to a new window where you can edit this exercise or workout.

**How do I create an exercise?**

Go to the *Create* page and click on the *Exercise* button.  This will bring you to our *Create a new exercise* page.  Enter 
a name, difficulty level, description, and muscle group for your new exercise.  In the *Photos and videos* box, enter the
URLs of the photo and video you'd like to accompany your exercise creation.  When you're done, click the *Save exercise*
button, and you've officially contributed a new exercise to the ComMotion encyclopedia.

**How do I create a workout?**

_Note: The ability to save new workouts was removed due to time constraints. But the interface sure is pretty!_

Go to the *Create* page and click on the *Workout* button.  This will bring you to our *Create a new workout* page.  The
central design area will enable you to add any exercises you want to, in any order.  For example, suppose you want your 
first exercise to be the bench press for one set of 8 reps, with a 60 second rest after the set.  In the *Search for 
exercise* text box, enter the name of the exercise (in this case, bench press).  This will produce a drop down display
of this exercise and similar exercises.  To add the bench press to your design area, just drag and drop bench press from the
drop down area to the main design window.  You can enter the number of reps to do for this set by typing a number into the 
text box next to the parameter drop down menu (which now says "reps").  Clicking on the parameter drop down menu reveals
many other options you can choose from.  For instance, you may want to specify that the bench press be done repeatedly
for 1 minute.  To add a rest period after this set, click on the *Rest Period* drop down menu header (it's in the left hand
column, right under *Search for Exercise*).  You can create your own custom rest period by typing in a number and choosing
seconds or minutes from the adjacent drop down menu.  Click *Add* to add it to your list of ready made rest intervals.  Or, 
you can choose from our list of commonly used rest intervals.  Drag this interval to the main design window, drop it right
under your bench press set, and there you have it--a new workout in the making!  

Don't forget to enter a name, difficulty level, description, photo, and video to your new workout creation.  Click *Save
workout*, and you've officially contributed a new workout to the ComMotion encyclopedia.

**How do I edit my profile?**

Go to the *Profile* page and click the *Edit Profile* button.  This will bring up a window which will enable you to update
your user profile.  Don't forget to click *Save changes* when you're done.

 








