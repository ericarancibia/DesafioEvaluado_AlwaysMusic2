create database always_music;

CREATE TABLE students(
	id serial primary key,
	nombre varchar(50) NOT NULL,
	rut varchar(50) NOT NULL UNIQUE,
	curso varchar(50) NOT NULL,
	nivel int NOT NULL
);