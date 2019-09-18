insert into users (email, password, username)
values($1, $2, $3);

select email, username from users
where email = $1;