insert into appointment( app_date, app_time, name, description)
values ($1, $2, $3, $4);

select * from appointment;