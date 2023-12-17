# online-learning-platform

## Run in local machine

- Ensure you have PosgreSql installed.
- Open `.env` file.
- Set environment variable like this:

```js
# server
HOST=localhost
PORT=5000

# database
DB_HOST=hostname
DB_USER=username
DB_PASSWORD=password
DB_PORT=5432
DB=online_learning_platform
```

- To install the dependency execute the following command.

```sh
npm install
```

- To populate the database migration execute the following command.

```sh
npm run setup-dev
```

- To run the application execute the following command.

```sh
npm run dev
```

- After that you will see the message:
  [Server running on http://localhost:5000]

# API endpoints

These endpoints allow you to handle Stripe subscriptions for Publish and Analyze.

## GET

`get all courses` [/courses](#get-courses) <br/>
`get a single course` [/courses/:id](#get-single-course) <br/>
`filter course` [/courses/?instructor=name&duration=120&price=100.00](#get-courses-by-filtering) <br/>

## POST

`create a course` [/courses](#post-a-course) <br/>
`enroll a astudent` [/enrollments](#post-enroll-a-student) <br/>

---

### GET /courses

Get available courses.

**Response**

```js
// If there is no data, then
{
  "total": 0,
  "records": []
}

// or
// If data exist, then
{
  "total": 2,
  "records": [
    {
      "id": 1,
      "description": "English",
      "instructor": "Md. Ashraful Alam",
      "duration": "150",
      "price": "100.00"
    },
    {
      "id": 2,
      "description": "Bangla",
      "instructor": "Md. Mohsin Nur Robin",
      "duration": "200",
      "price": "80.50"
    }
  ]
}
```

### GET /courses/:id

get a specific course by its id.

**Parameters**

|   ID | Required |  Type  | Description       |
| ---: | :------: | :----: | ----------------- |
| `id` | required | number | id of the course. |

**Response**

```js
// If course exist
{
  "id": 1,
  "description": "English",
  "instructor": "Md. Ashraful Alam",
  "duration": "150",
  "price": "100.00"
}
// or any error occured

{
    "code": 404,
    "error": "An error message"
}
```

### GET /courses/?instructor=name&duration=120&price=100.00

filter courses by instructor, duration or price.You can pass one or all by `&` sign.

**Parameters**

|         Name | Required |  Type  | Description                                     |
| -----------: | :------: | :----: | ----------------------------------------------- |
| `instructor` | optional | string | course instructor name. Ex: `Md. Ashraful Alam` |
|   `duration` | optional | number | course duration. Ex:. `150`                     |
|      `price` | optional | number | price of the course. Ex: `100.00`               |

**Response**

```js
// If course exist
{
  "id": 1,
  "description": "English",
  "instructor": "Md. Ashraful Alam",
  "duration": "150",
  "price": "100.00"
}

// or any error occured

{
    "code": 404,
    "error": "An error message"
}
```

### POST /courses

create a new course

**Parameters**

|          Name | Required |  Type  | Description                                     |
| ------------: | :------: | :----: | ----------------------------------------------- |
| `description` | required | string | course description. Ex: `Bangla`                |
|  `instructor` | required | string | course instructor name. Ex: `Md. Ashraful Alam` |
|    `duration` | required | number | course duration. Ex:. `150`                     |
|       `price` | required | number | price of the course. Ex: `100.00`               |

**Response**

```js
// if wrong data passed

{
    "code": 400,
    "error": [
        "Description is required",
        "Instructor is required",
        "Duration is required",
        "Price is required"
    ]
}

// If successful
{
  "id": 1,
  "description": "English",
  "instructor": "Md. Ashraful Alam",
  "duration": "150",
  "price": "100.00"
}

// or any error occured

{
    "code": 500,
    "error": "An error message"
}
```

### POST /enrollments

Enroll a student

**Parameters**

|           Name | Required |  Type  | Description                           |
| -------------: | :------: | :----: | ------------------------------------- |
| `student_name` | required | string | student name. Ex: `Md. Ashraful Alam` |
|    `course_id` | required | number | course id. Ex:. `1`                   |

**Response**

```js
// if wrong data passed

{
    "code": 400,
    "error": [
        "Student Name is required",
        "Course ID is required",
        "Course not found!",
    ]
}

// If successful
{
  "id": 2,
  "student_name": "English",
  "course_id": 1,
  "enrollment_date": "2023-12-16T18:00:00.000Z"
}

or any error occured

{
    "code": 500,
    "error": "An error message"
}
```
