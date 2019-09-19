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

insert into animal( name, breed, description, image)
values ("Bruce", "Pitbull", "Fun dog", "https://cdn.pixabay.com/photo/2012/12/11/21/28/pitbull-69416__480.jpg");
insert into animal( name, breed, description, image)
values ("Lana", "boxer", "	Crazy dog", "https://cdn.pixabay.com/photo/2019/02/16/20/24/guard-dog-4000952__480.jpg");
insert into animal( name, breed, description, image)
values ("Raven", "cat", "Annoying", "https://cdn.pixabay.com/photo/2018/10/11/12/31/black-cat-3739702__480.jpg");
insert into animal( name, breed, description, image)
values ("Denali", "airdale terrior", "loveable ", "https://image.shutterstock.com/image-photo/purebred-airedale-terrier-outdoors-260nw-100792285.jpg");
insert into animal( name, breed, description, image)
values ("Nemo", "corgi", "small", "	https://cdn.pixabay.com/photo/2018/05/11/08/11/pet-3389729__480.jpg");
insert into animal( name, breed, description, image)
values ("rocky", "rottweiler", "goofy", "https://cdn.pixabay.com/photo/2015/05/02/23/29/rottweiler-750550__480.jpg");
insert into animal( name, breed, description, image)
values ("turbo", "German Shepherd", "loyal", "https://cdn.pixabay.com/photo/2013/08/08/02/01/german-shepherd-170582__480.jpg");
insert into animal( name, breed, description, image)
values ("fluffington", "cat", "majestic", "	https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__480.jpg");
insert into animal( name, breed, description, image)
values ("Mr. Bigglesworth", "cat", "evil", "https://vignette.wikia.nocookie.net/austinpowers/images/7/70/Image_785193.jpg/revision/latest?cb=20060527164124");
insert into animal( name, breed, description, image)
values ("Johnson", "Labrador Retriever", "caring", "https://cdn.pixabay.com/photo/2018/03/03/11/31/dog-3195484__480.jpg");


delete from animal
where id = $1