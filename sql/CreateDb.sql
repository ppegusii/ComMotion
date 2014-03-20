-- sqlite3 db/ComMotion.db < sql/CreateDb.sql

-- drop tables
DROP TABLE IF EXISTS exercises;

-- create tables
create table exercises(
	id integer primary key autoincrement,
	name VARCHAR(255) not null
);

-- load tables
insert into exercises values
	(null,'butterfly');
insert into exercises values
	(null,'squat');
insert into exercises values
	(null,'bicycling');
