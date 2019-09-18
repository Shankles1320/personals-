## ClientSide (FrontEnd)

### dependencies

- axios
- react-router-dom
- redux
- react-redux
- node-sass
- http-proxy-middle

## routes

- Home => "/" => authComponent.js
- social_time => "/social_time" => social_time.js
- Training => "/training" => tainging.js
- Adoption => "/adoption" => adoption.js
- Donations => "/donations => donation.js
- Volunteer => "/volunteer => volunteer.js

### file-structure

- src/
  - components/
    - authComponent.js
    - social_time.js
    - adoption.js
    - donation.js
    - volunteer.js
  - app.js
  - index.js
  - reset.css
  - setupProxy.js
  - ducks/
    - store.js
    - reducer.js

## serverside (backend)

### dependencies

    - express
    - express-session
    - dotenv
    - massive
    - bcrypt

### server file structure

- server/
  - index.js
  - controller/
    - adoption.js
    - authController.js
    - schedule.js
  - middleware/
    - middleware.js => session check

### endpoints

**auth**

- login: => /api/welcome
- register: => /api/registration
- logout: => /api/goodbye
- userSession: => /api/find_the_one

**cake_burrito endpoints**
get => /api/get_all_animals
get => /api/get_the_animal/:id
post => /api/new_animal
put => /api/change_animal
delete => /api/found_a_home

## secrets

```text
CONNECTION_STRING =
SESSION_SECRET =
SERVER_PORT =
```

## Database

- users

```sql
create table users(
    id serial primary key,
    email text not null unique,
    password text not null,
    username text
);

```

- available_animals

```sql
create table animals(
    id serial primary key,
    name text not null,
    breed text not null,
    description text not null,
    image text not null
)

```

- take_home

```sql
create table take_home(
id serial primary key,
take_home_date date default now(),
animal_id integer references animals(id),
animal_adopter integer references users(id));
```
