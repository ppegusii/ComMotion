-- drop tables
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

-- load tables
INSERT INTO difficulties (name) VALUES
	('beginner'),
	('intermediate');
INSERT INTO musclegroups (name) VALUES
	('legs');
INSERT INTO exercises (description,difficulty_id,musclegroup_id) VALUES
	('A short description.',1,1);
