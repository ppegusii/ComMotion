-- drop tables
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS fav_workouts;
DROP TABLE IF EXISTS fav_exercises;
DROP TABLE IF EXISTS user_activities;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS workout_sequence; --This is only left to clean old schema from DB.
DROP TABLE IF EXISTS timers;
DROP TABLE IF EXISTS exercise_instances;
DROP TABLE IF EXISTS measurements;
DROP TABLE IF EXISTS workout_components;
DROP TABLE IF EXISTS names;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS users;
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
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	difficulty_id integer references difficulties(id),
	avatar_url VARCHAR(1023),
	bio VARCHAR(2047)
);
CREATE TABLE exercises(
	id SERIAL PRIMARY KEY,
	description VARCHAR(1023) NOT NULL,
	difficulty_id integer NOT NULL references difficulties(id),
	musclegroup_id integer NOT NULL references musclegroups(id),
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	creator_id integer REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE workouts(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(1023) NOT NULL,
	difficulty_id integer NOT NULL references difficulties(id),
	musclegroup_id integer NOT NULL references musclegroups(id),
	creator_id integer references users(id),
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
/*
CREATE TABLE workout_sequence(
	id SERIAL PRIMARY KEY,
	workout_id integer NOT NULL references workouts(id) ON DELETE CASCADE, 
	exercise_id integer NOT NULL references exercises(id), 
	exercise_order integer NOT NULL
);
*/
CREATE TABLE workout_components(
	id SERIAL PRIMARY KEY,
	workout_id integer NOT NULL references workouts(id) ON DELETE CASCADE, 
	seq_order integer NOT NULL
);
CREATE TABLE measurements(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);
CREATE TABLE exercise_instances(
	id integer PRIMARY KEY REFERENCES workout_components(id) ON DELETE CASCADE,
	exercise_id integer NOT NULL references exercises(id),
	measurement_id integer references measurements(id) ON DELETE SET NULL,
	measurement_value VARCHAR(255),
	weight integer
);
CREATE TABLE timers(
	id integer PRIMARY KEY REFERENCES workout_components(id) ON DELETE CASCADE,
	seconds integer NOT NULL
);
CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	user_id integer NOT NULL references users(id),
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
	user_id integer NOT NULL references users(id) ON DELETE CASCADE,
	follower_id integer NOT NULL  references users(id) ON DELETE CASCADE,
  PRIMARY KEY(user_id,follower_id),
  CHECK (user_id<>follower_id)
);

-- load tables

INSERT INTO difficulties (id,name) VALUES
	(1,'Beginner'),
	(2,'Intermediate'),
	(3,'Advanced');
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
	(1,'http://fitnessrxformen.com/wp-content/uploads/2013/09/SQUATS-CROWN-LOWER-BODY-INS1.jpg',1),
	(2,'http://www.fitnessfocus.ca/blog/image.axd?picture=2013%2F9%2FSaskatoon+Gym+Squats.jpg',2),
	(3,'http://www.serwer1374994.home.pl/upload/images/deadlift_front_anatomy_2013-12-02_00-23-39.jpg',3),
	(4,'http://michaelreid.typepad.com/.a/6a00e54edabd8388330134855ba3b2970c-pi',4),
	(5,'http://www.t-nation.com/img/photos/2012/12-717-03/barbell-push-press.jpg',5),
	(6,'http://images.rodale.com/image/pv/msnca-tone-overhead-press.jpg',6),
	(7,'http://www.menshealth.com/mhlists/cms/uploads/1/1003-illo-bench-press.jpg',7),
	(8,'http://img2.timeinc.net/health/img/mag/2012/10/slide-push-up-400x400.jpg',8),
	(9,'http://www.menshealth.co.uk/cm/menshealthuk/images/Eh/pullup-med.jpg',9),
	(10,'http://fitfinity.net/wp-content/uploads/2010/10/bent-over-barbell-row-e.jpg',10),
	(11,'http://www.poweredbypeanutbutter.com/wp-content/uploads/2012/05/dumbbell-row.jpg', 11),
	(12,'http://img2.timeinc.net/health/images/gallery/living/ggm-runninf-plank-400.jpg',12),
	(13,'http://blog.vytalz.com/wp-content/uploads/2012/08/crunches.png',13),
	(14,'http://media.coreperformance.com/images/jump-rope-secrets-from-buddy-lee.jpg',14),
	(15,'http://danjohn.net/wp-content/uploads/Weight-Training-For-Wrestling-Kettlebell-Swing.jpg',15),
	(16,'http://images.huffingtonpost.com/2010-02-28-olympicswithguineapigs0st5.jpg',16),
	(17,'http://www.fitquip.net.au/media/wysiwyg/medicine-ball-slams.jpg',17),
	(18,'http://www.buildingmuscle.org/raise.jpg',18),
	(19,'http://yourfitnesscorner.com/wp-content/uploads/2013/10/or_3cc22ae8125778003715076-2.jpg',19),
	(20,'http://www.kickstandfitness.com/wp-content/uploads/2012/11/lunge-nice-looking.jpg',20),
	(21,'http://www.bodybuilding.com/exercises/exerciseImages/sequences/219/Male/m/219_2.jpg',21),
	(22,'http://yourlivingbody.com/wp-content/uploads/2013/08/how-to-do-a-turkish-getup.jpg',22),
	(23,'http://media.xn--trnahemma-w2a.org/2012/06/Barbell-Shrugs.jpg',23),
	(24,'http://www.musclebuildingtnt.com/wp-content/uploads/2013/02/Standing-Barbell-Curl.jpg',24),
	(25,'http://images.meredith.com/fitness/images/2006/01/ss_FI110105WELFE012.jpg',25),
	(26,'http://www.unique-bodyweight-exercises.com/images/photo-ab-rollout-11-jpeg.JPG',26),
	(27,'http://i0.wp.com/barbellacademy.com/wp-content/uploads/2013/07/7-must-try-squat-variations-front-squat.jpg?resize=263%2C279',27),
	(28,'http://www.ironsimba.co.uk/wp-content/uploads/2013/03/leg-press-dude.jpg',28),
	(29,'http://dq8nlzk56ayth.cloudfront.net/wp-content/uploads/2012/11/Question-3.jpg',29),
	(30,'http://mhstatic.de/fm/1/thumbnails/Fitness_Lexikon_Uebung_086b.583625.jpg.2409777.jpg',30),
	(31,'http://www.prevention.com/images/cma/ultrae_03b.jpg',31),
	(32,'http://www.bodybuilding.com/exercises/exerciseImages/sequences/369/Female/m/369_1.jpg',32),
	(33,'http://www.menshealth.com.sg/system/files/shared/Picture_2.jpg',33),
	(34,'http://cdn.menshealth.com/images/MH_Static/Incline-Dumbell-Press.jpg',34),
	(35,'http://www.gymper.com/wp-content/pics-exercise-workout//2010/06/chest-fly.jpg',35),
	(36,'http://www.buzzle.com/img/articleImages/419308-7016-13.jpg',36),
	(37,'http://crossfitorangecounty.typepad.com/crossfit_orange_county/images/2007/04/20/gregringdip.jpg',37),
	(38,'http://blu.stb.s-msn.com/i/8D/2468D5101165EE98893870F41FCC24.jpg',38),
	(39,'http://bodybuilding24x7.com/wp-content/uploads/2014/03/barbell-skull-crushers.jpg',39),
	(40,'http://www.rsasr.krefeld.schulen.net/homepages_if/homepages2012/murat/Bilder/Vorgebeugte%20Barren-Dips2.jpg',40);
ALTER SEQUENCE photos_id_seq RESTART WITH 41;

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
	(16, 'ruthBaderGinsberg', 'commotion', 3, 'http://i1.sndcdn.com/avatars-000024624494-iqyx26-crop.jpg?3eddc42', 'I like to sweat on others.'),
	(17, 'tylerDurden', 'commotion', 2, 'http://espenl4.files.wordpress.com/2011/03/coolavatar06.png', 'I like to sweat on others.'),
	(18, 'robertPaulson', 'commotion', 1, 'https://www.fancyhands.com/images/default-avatar-250x250.png', 'I like to sweat on others.'),
	(19, 'hermioneGranger', 'commotion', 3, 'http://www.freelogovectors.net/wp-content/uploads/2013/02/Alien.png', 'I like to sweat on others.'),
	(20, 'severusSnape', 'commotion', 2, 'http://www.freelogovectors.net/wp-content/uploads/2013/02/man-avatar-1.png', 'I like to sweat on others.');
ALTER SEQUENCE users_id_seq RESTART WITH 21;

INSERT INTO workouts (id, name, description, difficulty_id, musclegroup_id, creator_id) VALUES
	(1,'Leg Blaster!','challenging lower body workout', 2, 3, 16),
	(2,'Workout anywhere...','body weight workout', 1, 1, 12),
	(3,'Bench Press Bonanza','designed to improve your bench press',3,2,17);
ALTER SEQUENCE workouts_id_seq RESTART WITH 4;

INSERT INTO photos (id,url,workout_id) VALUES
	(41,'http://www.fitnessatlantic.com/images/exercises/leg_muscles.jpg',1),
	(42,'http://www.criticalbench.com/images/bodyweight-workouts1.jpg',2),
	(43,'http://www.lift.net/wp-content/uploads/2013/09/Jeremy-Hoornstra-close-grip.jpg',3);
ALTER SEQUENCE photos_id_seq RESTART WITH 44;
/*
INSERT INTO workout_sequence (workout_id, exercise_id, exercise_order) VALUES
	(1, 1, 1),
	(1, 20, 2),
	(1, 29, 3),
	(1, 28, 4),
	(1, 14, 5),
	(1, 4, 6),
	(2, 8, 1),
	(2, 9, 2),
	(2, 12, 3),
	(2, 14, 4);
*/
INSERT INTO workout_components (id,workout_id,seq_order) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 1, 3),
	(4, 1, 4),
	(5, 1, 5),
	(6, 2, 1),
	(7, 2, 2),
	(8, 2, 3),
	(9, 2, 4),
	(10, 3, 1),
	(11, 3, 2),
	(12, 3, 3),
	(13, 3, 4),
	(14, 3, 5),
	(15, 3, 6),
	(16, 3, 7),
	(17, 3, 8),
	(18, 3, 9),
	(19, 3, 10),
	(20, 3, 11),
	(21, 3, 12);
ALTER SEQUENCE workout_components_id_seq RESTART WITH 22;

INSERT INTO measurements (id, name) VALUES
	(1, 'reps'),
	(2, 'sec'),
	(3, 'min'),
	(4, 'm'),
	(5, 'km'),
	(6, 'yds'),
	(7, 'miles');
ALTER SEQUENCE measurements_id_seq RESTART WITH 8;

INSERT INTO exercise_instances (id, exercise_id, measurement_id, measurement_value) VALUES
	(1, 1, 1, '10'),
	(2, 29, 1, '10'),
	(3, 20, 1, '10'),
	(4, 21, 1, '10'),
	(5, 14, 3, '15'),
	(6, 8, 1, '20'),
	(7, 9, 1, '10'),
	(8, 12, 3, '1'),
	(9, 14, 3, '15'),
	(10, 6, 1, '8'),
	(11, 6, 1, '8'),
	(12, 6, 1, '8'),
	(13, 7, 1, '8'),
	(14, 7, 1, '5'),
	(15, 7, 1, '3'),
	(16, 34, 1, '8'),
	(17, 34, 1, '8'),
	(18, 34, 1, '8'),
	(19, 38, 1, '10'),
	(20, 38, 1, '10'),
	(21, 38, 1, '10');
--ALTER SEQUENCE exercise_instances_id_seq RESTART WITH 6;
--did not need to alter sequence since id references workout_components(id)

INSERT INTO timers (id,seconds) VALUES
	(1, 120),
	(2, 90),
	(3, 90),
	(4, 30),
	(5, 15),
	(6, 120),
	(7, 120),
	(8, 30),
	(9, 300),
	(10, 90),
	(11, 90),
	(12, 90),
	(13, 90),
	(14, 120),
	(15, 120),
	(16, 90),
	(17, 90),
	(18, 90),
	(19, 60), 
	(20, 60),
	(21, 60);
--no alter sequence added since id's reference workout_components(id)

INSERT INTO posts (user_id, text) VALUES
	(13, 'The Boston Marathon today was just nuclear!  I''m glowing with admiration.  By the way, I found ring dips to be challenging, but what an awesome pump!'),
	(15, 'I get tired so easily when I swim.  Medicine ball slams are helping with my endurance.'),
	(17, 'I love squats so much, I want to start a squat club.  And the first rule of squat club is, you don''t talk about squat club.'),
	(20, 'If anyone else is unhappy with their core, Turkish get-ups were a magic potion for my abs.'),
	(18, 'Everyone!  I just joined this life-changing club for people who love squats.  Only I''m not supposed to talk about it...'),
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
