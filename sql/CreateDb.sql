-- drop tables
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
	modified timestamp NOT NULL DEFAULT current_timestamp
);
CREATE TABLE workouts(
	id SERIAL PRIMARY KEY,
	description VARCHAR(1023) NOT NULL,
	difficulty_id integer NOT NULL references difficulties(id),
	musclegroup_id integer NOT NULL references musclegroups(id),
	modified timestamp NOT NULL
);
CREATE TABLE photos(
	id SERIAL PRIMARY KEY,
	filename VARCHAR(255) NOT NULL,
	exercise_id integer references exercises(id),
	workout_id integer references workouts(id)
);
CREATE TABLE videos(
	id SERIAL PRIMARY KEY,
	url VARCHAR(1023) NOT NULL,
	exercise_id integer references exercises(id),
	workout_id integer references workouts(id)
);
CREATE TABLE names(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
  votes integer DEFAULT 0,
	exercise_id integer references exercises(id),
	workout_id integer references workouts(id)
);

-- load tables

INSERT INTO difficulties (id,name) VALUES
	(1,'beginner'),
	(2,'intermediate');
	(3,'advanced');
INSERT INTO musclegroups (id,name) VALUES
	(1,'whole body');
	(2,'upper body');
	(3,'lower body');
	(4,'core');
INSERT INTO exercises (id,description,difficulty_id,musclegroup_id) VALUES
	(1,'A short description.',1,1);
INSERT INTO names (id,name,exercise_id,votes) VALUES
	(1,'squats',1,5),
	(2,'knee bends',1,2);
INSERT INTO photos (id,filename,exercise_id) VALUES
	(1,'pic.jpg',1);
INSERT INTO videos (id,url,exercise_id) VALUES
	(1,'http://youtube.com/squat',1);

