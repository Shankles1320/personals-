create table appointment(
id serial primary key,
app_date text not null,
app_time integer not null,
name text not null,
description text not null
);

select * from appointment;


insert into appointment( app_date, app_time, name, description)
values ($1, $2, $3, $4);

delete from appointment
where id = $1;

update appointment
set app_date = $2, app_time = $3, name = $4, description = $5
where id = $1;