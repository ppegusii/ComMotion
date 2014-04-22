-- drop tables
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS fav_workouts;
DROP TABLE IF EXISTS fav_exercises;
DROP TABLE IF EXISTS user_activities;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS names;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS musclegroups;
DROP TABLE IF EXISTS difficulties;

-- create tables
CREATE TABLE difficulties(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);
CREATE TABLE musclegroups(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);
CREATE TABLE exercises(
	id SERIAL PRIMARY KEY,
	description VARCHAR(1023) NOT NULL,
	difficulty_id integer NOT NULL references difficulties(id),
	musclegroup_id integer NOT NULL references musclegroups(id),
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE workouts(
	id SERIAL PRIMARY KEY,
	description VARCHAR(1023) NOT NULL,
	difficulty_id integer NOT NULL references difficulties(id),
	musclegroup_id integer NOT NULL references musclegroups(id),
        --exercise_order integer NOT NULL
	--exercise_id integer NOT NULL references exercises(id),
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE photos(
	id SERIAL PRIMARY KEY,
	url VARCHAR(1023) NOT NULL,
	exercise_id integer references exercises(id) ON DELETE CASCADE,
	workout_id integer references workouts(id) ON DELETE CASCADE
);
CREATE TABLE videos(
	id SERIAL PRIMARY KEY,
	url VARCHAR(1023) NOT NULL,
	exercise_id integer references exercises(id) ON DELETE CASCADE,
	workout_id integer references workouts(id) ON DELETE CASCADE
);
CREATE TABLE names(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
        votes integer DEFAULT 0,
	exercise_id integer references exercises(id) ON DELETE CASCADE,
	workout_id integer references workouts(id) ON DELETE CASCADE
);
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	difficulty_id integer references difficulties(id),
	avatar_url VARCHAR(1023),
	bio VARCHAR(2047)
);
CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	user_id integer references users(id) NOT NULL,
	text VARCHAR(2047) NOT NULL,
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE activities(
	id SERIAL PRIMARY KEY,
	name VARCHAR(1023) NOT NULL
);
CREATE TABLE user_activities(
	id SERIAL PRIMARY KEY,
	activity_id integer NOT NULL references activities(id),
	user_id integer references users(id) ON DELETE CASCADE
);
CREATE TABLE fav_exercises(
	id SERIAL PRIMARY KEY,
	user_id integer NOT NULL references users(id) ON DELETE CASCADE,
	exercise_id integer NOT NULL references exercises(id) ON DELETE CASCADE
);
CREATE TABLE fav_workouts(
	id SERIAL PRIMARY KEY,
	user_id integer NOT NULL references users(id) ON DELETE CASCADE,
	workout_id integer NOT NULL references workouts(id) ON DELETE CASCADE
);	
CREATE TABLE followers(
	id SERIAL PRIMARY KEY,
	user_id integer NOT NULL references users(id) ON DELETE CASCADE,
	follower_id integer NOT NULL  references users(id) ON DELETE CASCADE
);

-- load tables

INSERT INTO difficulties (id,name) VALUES
	(1,'beginner'),
	(2,'intermediate'),
	(3,'advanced');
ALTER SEQUENCE difficulties_id_seq RESTART WITH 4;
INSERT INTO musclegroups (id,name) VALUES
	(1,'whole body'),
	(2,'upper body'),
	(3,'lower body'),
	(4,'core');
ALTER SEQUENCE musclegroups_id_seq RESTART WITH 5;
INSERT INTO exercises (id,description,difficulty_id,musclegroup_id) VALUES
	(1,'Back squat with barbell',2,3),
	(2,'Front squat with dumbbell',1,3),
	(3,'Deadlift with barbell or dumbbells from floor',2,1),
	(4,'Walk with dumbbells or kettlebells',1,1),
	(5,'Overhead press with barbell',2,2),
	(6,'Overhead press with dumbbells',1,2),
	(7,'Flat bench press with barbell',2,2),
	(8,'Bodyweight push up from floor',1,2),
	(9,'Bodyweight pull up from hang',2,2),
	(10,'Row with barbell',2,2),
	(11,'Row with dumbbells',1,2),
	(12,'Sustained hold of plank position',1,4),
	(13,'Situps focusing on thoracic spine flexion',1,4),
	(14,'Jump rope for time interval',1,1),
	(15,'High kettlebell swings',1,2),
	(16,'Olympic clean and press from floor',3,1),
	(17,'Slam medicine ball to floor to activate lats',1,2),
	(18,'Lateral deltoid raises with dumbbells',1,2),
	(19,'Deadlift with straight legs and hip hinging',2,1),
	(20,'Lunges with dumbbells held at sides',1,3),
	(21,'Calf raises with extra weight',1,3),
	(22,'Turkish get-up, extra weight optional',3,1),
	(23,'Barbell shrugs to the front',1,2),
	(24,'Standing barbell curls',1,2),
	(25,'Strict isolating dumbbell curls',1,2),
	(26,'Rollouts with ab wheel',2,4),
	(27,'Squats with barbell resting on front delts',2,3),
	(28,'Leg presses using leg press machine',1,3),
	(29,'Leg curls using leg curl machine',1,3),
	(30,'Leg raises while hanging from bar',3,4),
	(31,'Front deltoid raises with dumbbells',1,2),
	(32,'Barbell bench press from incline position',2,2),
	(33,'Dumbbell bench press from flat position',1,2),
	(34,'Dumbbell bench press form incline position',1,2),
	(35,'Dumbbell chest flys while lying on bench',1,2),
	(36,'Chin ups with close grip, hands supinated',1,2),
	(37,'Dips while suspended from rings',2,3),
	(38,'Tricep pressdowns with cable machine',1,2),
	(39,'Lying tricep extensions with barbell',2,2),
	(40,'Dips between parallel bars',2,2);
ALTER SEQUENCE exercises_id_seq RESTART WITH 41;
INSERT INTO names (id,name,exercise_id,votes) VALUES
	(1,'squat',1,5),
	(2,'goblet squat',2,3),
	(3,'deadlift',3,5),
	(4,'farmer''s walk',4,4),
	(5,'push press',5,3),
	(6,'dumbbell overhead press',6,2),
	(7,'bench press',7,5),
	(8,'push up',8,3),
	(9,'pull up',9,5),
	(10,'barbell row',10,1),
	(11,'dumbbell row',11,3),
	(12,'planks',12,5),
	(13,'crunches',13,1),
	(14,'jump rope',14,4),
	(15,'kettlebell swings',15,3),
	(16,'olympic clean and jerk',16,4),
	(17,'medicine ball slam',17,5),
	(18,'lateral deltoid raises',18,2),
	(19,'straight-legged deadlift',19,2),
	(20,'lunges',20,4),
	(21,'calf raises',21,1),
	(22,'Turkish get-up',22,4),
	(23,'barbell shrugs',23,2),
	(24,'barbell curls',24,5),
	(25,'concentration curls',25,3),
	(26,'ab rollouts',26,1),
	(27,'front squats',27,4),
	(28,'leg presses',28,5),
	(29,'leg curls',29,1),
	(30,'hanging leg raises',30,2),
	(31,'front deltoid dumbbell raises',31,3),
	(32,'barbell incline press',32,4),
	(33,'dumbbell flat bench',33,3),
	(34,'dumbbell incline bench',34,5),
	(35,'dumbbell chest flys',35,2),
	(36,'chin ups',36,5),
	(37,'ring dips',37,4),
	(38,'tricep cable pressdowns',38,3),
	(39,'skull crushers',39,5),
	(40,'dips',40,2);
ALTER SEQUENCE names_id_seq RESTART WITH 41;
INSERT INTO photos (id,url,exercise_id) VALUES
	(1,'http://url/of/my/photo.jpg',1);
ALTER SEQUENCE photos_id_seq RESTART WITH 2;
INSERT INTO videos (id,url,exercise_id) VALUES
	(1,'www.youtube.com/watch?v=v-eQooI6Yds', 1),
	(2,'www.youtube.com/watch?v=PKmrXTx6jZs', 2),
	(3,'www.youtube.com/watch?v=mN1IUo18HXs', 3),
	(4,'www.youtube.com/watch?v=Fkzk_RqlYig', 4),
	(5,'www.youtube.com/watch?v=UeTXdlYdC2U', 5),
	(6,'www.youtube.com/watch?v=I9kNnGLB3sI', 6),
	(7,'www.youtube.com/watch?v=UZi_zwL3Oq0', 7),
	(8,'www.youtube.com/watch?v=ihvdd0rPTiU', 8),
	(9,'www.youtube.com/watch?v=76HjVOoUX6U', 9),
	(10,'www.youtube.com/watch?v=rNjwZ1fxtCQ', 10),
	(11,'www.youtube.com/watch?v=GkLqraq4m6U', 11),
	(12,'www.youtube.com/watch?v=eZV_J-wKkug', 12),
	(13,'www.youtube.com/watch?v=Xyd_fa5zoEU', 13),
	(14,'www.youtube.com/watch?v=ZX-NdILjBWY', 14),
	(15,'www.youtube.com/watch?v=zBIWpPfc6NY', 15),
	(16,'www.youtube.com/watch?v=Bc-0lFV1KWQ', 16),
	(17,'www.youtube.com/watch?v=nD3dsquSEUQ', 17),
	(18,'www.youtube.com/watch?v=JVC6u_lsqvk', 18),
	(19,'www.youtube.com/watch?v=N97yeNuDBcQ', 19),
	(20,'www.youtube.com/watch?v=FFf6b7mTbQ0', 20),
	(21,'www.youtube.com/watch?v=FL-ybHijnyw', 21),
	(22,'www.youtube.com/watch?v=ztTOn0rSMis', 22),
	(23,'www.youtube.com/watch?v=y5oQvog_fGU', 23),
	(24,'www.youtube.com/watch?v=izwOiVIgEc0', 24),
	(25,'www.youtube.com/watch?v=Jvj2wV0vOYU', 25),
	(26,'www.youtube.com/watch?v=VmqDIL2xzbk', 26),
	(27,'www.youtube.com/watch?v=SdvBNLk-Tyg', 27),
	(28,'www.youtube.com/watch?v=CXYeXSYvPVI', 28),
	(29,'www.youtube.com/watch?v=OJvpiUaR488', 29),
	(30,'www.youtube.com/watch?v=ZG66zhtQ8b8', 30),
	(31,'www.youtube.com/watch?v=sGE6Hy5yNrg', 31),
	(32,'www.youtube.com/watch?v=yUY1B3I9EJA', 32),
	(33,'www.youtube.com/watch?v=Utn_c_cjRTc', 33),
	(34,'www.youtube.com/watch?v=3uKCgCP6VhA', 34),
	(35,'www.youtube.com/watch?v=tJ2kaO29NDM', 35),
	(36,'www.youtube.com/watch?v=c8G0_NEJ-yA', 36),
	(37,'www.youtube.com/watch?v=afnEmGzx0Oc', 37),
	(38,'www.youtube.com/watch?v=8WL0m0vLAPo', 38),
	(39,'www.youtube.com/watch?v=9baX4-wEYx8', 39),
	(40,'www.youtube.com/watch?v=K71EA0BxU4w', 40);	
ALTER SEQUENCE videos_id_seq RESTART WITH 41;
INSERT INTO users (id, username, password, difficulty_id, avatar_url, bio) VALUES
	(1, 'dorianYates', 'commotion', 3, 'http://png-2.findicons.com/files/icons/1072/face_avatars/300/i05.png', 'I like to sweat on others.'),
	(2, 'steveReeves', 'commotion', 2, 'http://buddies.koinup.com/group-637.png','I like to sweat on others.'),
	(3, 'johnGrimek', 'commotion', 1, 'http://ict4kids.files.wordpress.com/2013/05/mrc-2.png', 'I like to sweat on others.'),
	(4, 'francoColumbu', 'commotion', 3, 'http://photos.posh24.com/p/777876/z/paris_hilton/the_stars_as_avatars.jpg', 'I like to sweat on others.'),
	(5, 'janeAusten', 'commotion', 2, 'http://infinitelives.net/avatars/flashjen.jpg', 'I like to sweat on others.'),
	(6, 'austinPowers', 'commotion', 1, 'http://www.vector-eps.com/wp-content/gallery/penguin-avatars/thumbs/thumbs_penguin-avatars7.jpg', 'I like to sweat on others.'),
	(7, 'dorianGray', 'commotion', 3, 'https://www.fgl.com/pictures/picture_zyyhpm251303.gif', 'I like to sweat on others.'),
	(8, 'oscarWilde', 'commotion', 2, 'http://images.businessweek.com/ss/06/01/motorola_labs/image/6_dmsg-realistic-avatar.jpg', 'I like to sweat on others.'),
	(9, 'margaretThatcher', 'commotion', 1, 'http://photos.posh24.com/p/777888/l/paris_hilton/the_stars_as_avatars.jpg', 'I like to sweat on others.'),
	(10, 'miaHamm', 'commotion', 3, 'http://png-2.findicons.com/files/icons/1072/face_avatars/300/fh04.png', 'I like to sweat on others.'),
	(11, 'miaFarrow', 'commotion', 2, 'http://www.myicore.com/post_pics/logos/twitter-avatars/yoda-twitter-avatar.jpg', 'I like to sweat on others.'),
	(12, 'andyWarhol', 'commotion', 1, 'http://avatars.np.us.playstation.com/avatar/WWS_E/EP90000911000l.png', 'I like to sweat on others.'),
	(13, 'madameCurie', 'commotion', 3, 'http://www.vector-eps.com/wp-content/gallery/penguin-avatars/thumbs/thumbs_penguin-avatars16.jpg', 'I like to sweat on others.'),
	(14, 'adaLovelace', 'commotion', 2, 'https://docs.atlassian.com/aui/5.3-m3/docs/img/project-128.png', 'I like to sweat on others.'),
	(15, 'babeRuth', 'commotion', 1, 'http://1.bp.blogspot.com/-rmN_xDIAljo/Tn0Yzd96yTI/AAAAAAAAB64/DXTwUXGWxw4/s400/avatars-000000733783-d1doh2-crop.jpg', 'I like to sweat on others.'),
	(16, 'ruthGinsberg', 'commotion', 3, 'http://i1.sndcdn.com/avatars-000024624494-iqyx26-crop.jpg?3eddc42', 'I like to sweat on others.'),
	(17, 'tylerDurden', 'commotion', 2, 'http://espenl4.files.wordpress.com/2011/03/coolavatar06.png', 'I like to sweat on others.'),
	(18, 'robertPaulson', 'commotion', 1, 'https://www.fancyhands.com/images/default-avatar-250x250.png', 'I like to sweat on others.'),
	(19, 'hermioneGranger', 'commotion', 3, 'http://www.freelogovectors.net/wp-content/uploads/2013/02/Alien.png', 'I like to sweat on others.'),
	(20, 'severusSnape', 'commotion', 2, 'http://www.freelogovectors.net/wp-content/uploads/2013/02/man-avatar-1.png', 'I like to sweat on others.');
ALTER SEQUENCE users_id_seq RESTART WITH 21;
INSERT INTO posts (user_id, text) VALUES
	(13, 'The Boston Marathon today was just nuclear!  I''m glowing with admiration.  By the way, I found ring dips
to be challenging, but what an awesome pump!'),
	(15, 'I get tired so easily when I swim.  Medicine ball slams are helping with my endurance.'),
	(17, 'I love squats so much, I want to start a squat club.  And the first rule of squat club is, you don''t
talk about squat club.'),
	(20, 'If anyone else is unhappy with their core, Turkish get-ups were a magic potion for my abs.'),
	(18, 'Everyone!  I just joined this life-changing club for people who love squats.  Only I''m not supposed
to talk about it...'),
	(7, 'I do believe that heavy Olympic lifts keep me young.  It has nothing to do with that picture in my attic.');	
INSERT INTO activities (id, name) VALUES
	(1, 'hiking'),
	(2, 'cycling'),
	(3, 'mountain biking'),
	(4, 'swimming'),
	(5, 'surfing'),
	(6, 'downhill skiing'),
	(7, 'snowboarding'),
	(8, 'cross country skiing'),
	(9, 'martial arts'),
	(10, 'bodybuilding'),
	(11, 'powerlifting'),
	(12, 'olympic lifting'),
	(13, 'yoga'),
	(14, 'snowshoeing'),
	(15, 'parkour'),
	(16, 'running');
ALTER SEQUENCE activities_id_seq RESTART WITH 17;
INSERT INTO user_activities (activity_id, user_id) VALUES
	(13, 1),
	(7, 1),
	(13, 2),
	(8, 3),
	(3, 3),
	(11, 4),
	(9, 4),
	(1, 4),
	(15, 5),
	(3, 6),
	(10, 7),
	(2, 7),
	(4, 8),
	(5, 8),
	(6, 9),
	(7, 10),
	(4, 15),
	(9, 17),
	(12, 7),
	(13, 11);
INSERT INTO fav_exercises (user_id, exercise_id) VALUES
	(1, 1),
	(1, 7),
	(2, 10),
	(2, 6),
	(3, 4),
	(3, 10),
	(15, 17),
	(7, 16),
	(4, 2);
INSERT INTO followers (user_id, follower_id) VALUES
	(1, 20),
	(1, 7),
	(1, 10),
	(1, 11),
	(2, 1),
	(5, 1),
	(17, 18),
	(17, 2),
	(17, 3),
	(17, 4),
	(17, 5),
	(17, 6),
	(17, 7),
	(17, 8),
	(14, 1);
