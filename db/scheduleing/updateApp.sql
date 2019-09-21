update appointment
set app_date = $2, app_time = $3, name = $4, description = $5
where id = $1;

select * from appointment;