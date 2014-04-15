-- drop tables
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS favorite_workouts;
DROP TABLE IF EXISTS favorite_exercises;
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
	filename VARCHAR(1023) NOT NULL,
=======
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
	activities VARCHAR(1023),
	experience_level integer references difficulties(id),
	avatar VARCHAR(1023) 	
);	
CREATE TABLE favorite_exercises(
	id SERIAL PRIMARY KEY,
	user_id integer NOT NULL references users(id) ON DELETE CASCADE,
	exercise_id integer NOT NULL references exercises(id) ON DELETE CASCADE
);
CREATE TABLE favorite_workouts(
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
	(13,'Situps focusing on thoracic spine flexion',1,4);
ALTER SEQUENCE exercises_id_seq RESTART WITH 14;
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
	(13,'crunches',13,1);
ALTER SEQUENCE names_id_seq RESTART WITH 14;
INSERT INTO photos (id,url,exercise_id) VALUES
	(1,'http://url/of/my/photo.jpg',1);
ALTER SEQUENCE photos_id_seq RESTART WITH 2;
INSERT INTO videos (id,url,exercise_id) VALUES
	(1,'http://youtube.com/squat',1);
ALTER SEQUENCE videos_id_seq RESTART WITH 2;
INSERT INTO users (id, username, password, experience_level) VALUES
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
INSERT INTO favorite_exercises (user_id, exercise_id) VALUES
	(1, 1),
	(1, 7),
	(2, 10),
	(2, 6),
	(3, 4),
	(3, 10),
	(4, 2);

