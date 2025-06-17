# Simple Online Bookstore Website (Microservices)

## Description

A simple website for selling books to readers, considered an exercise to build a website based on microservices architecture

- Frontend: HTML/CSS (Tailwind CSS) + Javascript
- Backend: Node.js (for all services)
- Database: MongoDB

## Database

- User and Catalog service use databases that is hosted on Supabase
- Order service uses databases that is hosted on AWS RDS
- Database of user service contains User table
- Database of catalog service contains Book table
- Database of order service contains Cart, Order and BookOrder tables

**User**:

|   Column   | DataType | Constraint            |
| :--------: | :------: | --------------------- |
|     id     |    int   | primary key identity  |
|  username  |   text   | unique not null       |
|  password  |   text   | not null              |
|  create_at |   time   | default: now          |

**Book**:

|   Column      | DataType | Constraint            |
| :-----------: | :------: | --------------------- |
|     id        |  bigint  | primary key identity  |
|    name       |   text   | unique not null       |
|    author     |   text   | not null              |
| publish_date  |   date   | not null              |
|    price      |  float   | not null              |
|  image_url    |   text   |                       |
| created_at    |   time   | default: now          |

**Cart**:

|   Column   | DataType | Constraint            |
| :--------: | :------: | --------------------- |
|  user_id   |  bigint  | primary key identity  |
|  book_id   |  bigint  | primary key identity  |

**Order**:

|   Column    | DataType | Constraint            |
| :---------: | :------: | --------------------- |
|     id      |  bigint  | primary key identity  |
|  user_id    |  bigint  | not null              |
|  order_time |   time   | default: now          |
|  total_cost |   float  | not null              |

**BookOrder**:

|   Column    | DataType | Constraint            |
| :---------: | :------: | --------------------- |
|  order_id   |  bigint  | primary key identity  |
|  book_id    |  bigint  | primary key identity  |
|  book_price |  float   | not null              |
|  qunatity   |   int    | not null              |
| total_price |  float   | not null              |