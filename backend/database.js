const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "db", "database.sqlite");

//  CHANGE THIS ONLY WHEN YOU WANT A FULL RESET
const RESET_DB = false;

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(" Error opening database:", err.message);
  } else {
    console.log(" SQLite connected");
  }
});

db.serialize(() => {
  if (RESET_DB) {
    console.log(" Resetting database...");

    db.run("DROP TABLE IF EXISTS grades");
    db.run("DROP TABLE IF EXISTS enrollments");
    db.run("DROP TABLE IF EXISTS teacher");
    db.run("DROP TABLE IF EXISTS students");
    db.run("DROP TABLE IF EXISTS courses");
    db.run("DROP TABLE IF EXISTS users");

    console.log("🧹 Old tables dropped");
  }

  // STUDENTS 
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      department TEXT NOT NULL,
      year INTEGER NOT NULL
    )
  `);

  //COURSES
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_name TEXT NOT NULL,
      course_code TEXT NOT NULL,
      credits INTEGER NOT NULL,
      department TEXT NOT NULL
    )
  `);

  //  USERS 
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    );
  `);

  //  ENROLLMENTS 
  db.run(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      course_id INTEGER,
      FOREIGN KEY (student_id) REFERENCES students(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

  // GRADES 
  db.run(`
    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enrollment_id INTEGER,
      grade TEXT,
      FOREIGN KEY (enrollment_id) REFERENCES enrollments(id)
    )
  `);

  // TEACHER 
  db.run(`
    CREATE TABLE IF NOT EXISTS teacher (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      name TEXT,
      email TEXT,
      department TEXT
    )
  `);

  console.log(" All tables created");
});

module.exports = db;