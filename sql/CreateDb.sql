-- drop tables
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS fav_workouts;
DROP TABLE IF EXISTS fav_exercises;
DROP TABLE IF EXISTS user_activities;
DROP TABLE IF EXISTS activities;
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
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	difficulty_id integer references difficulties(id),
	avatar_url VARCHAR(1023) 	
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
	(3,'Deadlift with barbell from floor',2,1),
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
	(37,'Pull ups with wide grip, hands pronated',2,2),
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
	(16,'olympic clean and press',16,4),
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
	(27,'front squats',27,4,
	(28,'leg presses',28,5),
	(29,'leg curls',29,1),
	(30,'hanging leg raises',30,2),
	(31,'front deltoid dumbbell raises',31,3),
	(32,'barbell incline press',32,4),
	(33,'dumbbell flat bench',33,3),
	(34,'dumbbell incline bench',34,5),
	(35,'dumbbell chest flys',35,2),
	(36,'chin ups',36,5),
	(37,'pull ups',37,4),
	(38,'tricep cable pressdowns',38,3),
	(39,'skull crushers',39,5),
	(40,'dips',40,2);
ALTER SEQUENCE names_id_seq RESTART WITH 41;
INSERT INTO photos (id,url,exercise_id) VALUES
	(1,'http://url/of/my/photo.jpg',1);
ALTER SEQUENCE photos_id_seq RESTART WITH 2;
INSERT INTO videos (id,url,exercise_id) VALUES
	(1,'http://youtube.com/squat',1);
ALTER SEQUENCE videos_id_seq RESTART WITH 2;
INSERT INTO users (id, username, password, difficulty_id) VALUES
	(1, 'dorianYates', 'commotion', 3),
	(2, 'steveReeves', 'commotion', 2),
	(3, 'johnGrimek', 'commotion', 1),
	(4, 'francoColumbu', 'commotion', 3),
	(5, 'janeAusten', 'commotion', 2),
	(6, 'austinPowers', 'commotion', 1),
	(7, 'dorianGray', 'commotion', 3),
	(8, 'oscarWilde', 'commotion', 2),
	(9, 'margaretThatcher', 'commotion', 1),
	(10, 'miaHamm', 'commotion', 3),
	(11, 'miaFarrow', 'commotion', 2),
	(12, 'andyWarhol', 'commotion', 1),
	(13, 'madameCurie', 'commotion', 3),
	(14, 'adaLovelace', 'commotion', 2),
	(15, 'babeRuth', 'commotion', 1),
	(16, 'ruthGinsberg', 'commotion', 3),
	(17, 'tylerDurden', 'commotion', 2),
	(18, 'robertPaulson', 'commotion', 1),
	(19, 'hermioneGranger', 'commotion', 3),
	(20, 'severusSnape', 'commotion', 2);
ALTER SEQUENCE users_id_seq RESTART WITH 21;
INSERT INTO fav_exercises (user_id, exercise_id) VALUES
	(1, 1),
	(1, 7),
	(2, 10),
	(2, 6),
	(3, 4),
	(3, 10),
	(4, 2);
