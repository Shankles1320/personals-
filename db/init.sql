drop table if exists users;


create table take_home(
id serial primary key,
take_home_date date default now(),
animal_id integer references animal(id),
animal_adopter integer references users(id));


create table animal(
    id serial primary key,
    name text not null,
    breed text not null,
    description text not null,
    image text not null
)

create table users(
    id serial primary key,
    email text not null unique,
    password text not null,
    username text
);

