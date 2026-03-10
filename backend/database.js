const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, "db", "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message); 
    }else{
        console.log("connected to database");
        db.run("PRAGMA foreign_keys = ON");
    }
});
const RESET_DB = true;

if (RESET_DB) {
  console.log(" Resetting database...");

  db.serialize(() => {
    db.run("DELETE FROM grades");
    db.run("DELETE FROM enrollments");
    db.run("DELETE FROM teacher");
    db.run("DELETE FROM students");
    db.run("DELETE FROM courses");
    db.run("DELETE FROM users");

    // reset AUTOINCREMENT counters
    db.run("DELETE FROM sqlite_sequence");

    console.log("Database cleared");
  });
}

db.serialize(()=>{ 
// students
db.run(
    `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      department TEXT NOT NULL,
      year INTEGER NOT NULL
    )
    `,
    (err) => {
      if (err) {
        console.error(" Error creating students table", err.message);
      } else {
        console.log("Students table ready");
      }
    }
  );
  db.run(
    `INSERT INTO students (name, email, department, year) VALUES
    ('Alice Johnson', 'alice@gmail.com', 'Computer Science', 2),
    ('Bob Smith', ' bob@gmail.com', 'Mechanical Engineering', 3),
    ('Charlie Brown', 'brown@gmail.com', 'Electrical Engineering', 1),
    ('David Lee', 'lee@gmail.com', 'Civil Engineering', 4),
    ('Eve Davis', 'eve@gmail.com', 'Computer Science', 2)
    `,
    (err) => {
        if (err) {
            console.error(" Error inserting sample data", err.message);
        } else {
            console.log(" Sample data inserted");
        }
    }
  );

  //courses
  db.run(
    `CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_name TEXT NOT NULL,
      course_code TEXT NOT NULL,
      credits INTEGER NOT NULL,
      department TEXT NOT NULL
  )`
  ,
  (err) =>{
    if (err) {
        console.error("Error creating courses table", err.message);
      }else{
        console.log("Courses table ready");
      }
    }
);

db.run(
  `INSERT INTO courses (course_name, course_code, credits, department) VALUES
  ('Data Structures', 'CS201', 4, 'Computer Science'),  
  ('Thermodynamics', 'ME301', 3, 'Mechanical Engineering'),
  ('React js', 'CS301', 3, 'Computer Science'),
  ('Circuit Analysis', 'EE201', 4, 'Electrical Engineering'),
  ('Structural Analysis', 'CE401', 3, 'Civil Engineering')
    `,
    (err) =>{
        if (err) {
            console.error("Error inserting sample courses", err.message);
        }else{
            console.log("Sample courses inserted");
        }
    }
);

//enrollments
db.run(
    `CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
)`,
    (err) =>{
        if (err) {
            console.error("Error creating enrollments table", err.message);
        }else{
            console.log("Enrollment table is ready");
        }
    }
);

db.run(
    `INSERT INTO enrollments (student_id, course_id) VALUES
    (1, 1),  
    (1, 3),
    (2, 2),
    (3, 4),
    (4, 5),
    (5, 1),
    (5, 3)
    `,  
    (err) =>{
        if(err){
            console.error("Error inserting sample enrollments", err.message);
        } else {
            console.log("Sample enrollments inserted");
        }
        }
);

//grades
db.run(
    `CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enrollment_id INTEGER NOT NULL,
    grade TEXT NOT NULL,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id)
    )`,
    (err) =>{
        if (err){
            console.error("Error creating grades table", err.message);
        } else{
            console.log("grades table is ready");
        }
        }
);

db.run(
    `INSERT INTO grades (enrollment_id, grade) VALUES
    (1, 'A'),
    (2, 'B+'),
    (3, 'A-'),
    (4, 'B'),
    (5, 'A'),
    (6, 'A-'),
    (7, 'B+')
    `,
    (err) =>{
        if (err){
            console.error("Error inserting sample grades", err.message);
        } else{
            console.log("Sample grades inserted");
        }
    }
);

// teacher
db.run(
    `CREATE TABLE IF NOT EXISTS teacher (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    department TEXT NOT NULL
    )`,
    (err) =>{
        if (err){
            console.error("Error creating Teacher table", err.message);
        } else{
            console.log("teacher table is ready");
        }
    }
);

db.run(
    `INSERT INTO teacher (course_id, name, email, department) VALUES
    (1, 'Dr. Smith', 'smith@gmail.com', 'Computer Science'),
    (2, 'Dr. Johnson', 'js@gmail.com', 'Mechanical Engineering'),
    (3, 'Dr. Lee', 'dlee@gmail.com', 'Computer Science'),
    (4, 'Dr. kira', 'kira@gmail.com', 'Electrical Engineering'),
    (5, 'Dr. bruce', 'b@gmail.com', 'Civil Engineering')
    `,
    (err) =>{
        if(err){
            console.error("Error inserting sample teachers", err.message);
        }else{
            console.log("sample teachers inserted");
        }
        }
    );

    //users
db.run(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT check(role IN ('admin', 'teacher', 'student')) NOT NULL
    )`,
    (err) =>{
        if (err){
            console.error("Error creating users table", err.message);
        } else{
            console.log("users table is ready");
        }
    }
);

db.run(
    `INSERT INTO users (username, password, role) VALUES
    ('admin', 'admin123', 'admin'),
    ('teacher', 'teacher123', 'teacher'),
    ('student', 'student123', 'student')
    `,
    (err) =>{
        if (err){   
            console.error("Error inserting sample users", err.message);
        } else{
            console.log("sample users inserted");
        }
    }
);
});



module.exports = db;