CREATE TABLE clinics (
  id         uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text    NOT NULL,
  email      text    UNIQUE NOT NULL,
  password   text    NOT NULL,
  created_at timestamp DEFAULT now()
);

ALTER TABLE clinics DISABLE ROW LEVEL SECURITY;
