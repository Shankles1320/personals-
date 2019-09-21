update animal
set name = $2, breed = $3, description = $4, image = $5
where id = $1;

select * from animal;
