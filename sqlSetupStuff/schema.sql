drop database if exists burger_eater_db;
create database burger_eater_db;

use burger_eater_db;

create table burgers (
	id integer auto_increment primary key,
    name varchar(20) not null,
    eaten bool not null
);