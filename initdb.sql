-- Check if the user exists and create if not
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_user 
        WHERE  usename = 'johndoe') THEN
        CREATE USER johndoe WITH PASSWORD 'johndoepass';
        ALTER USER johndoe WITH SUPERUSER;
    END IF;
END
$$;

-- Create a new database if it doesn't exist
SELECT 'CREATE DATABASE quicklink'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'quicklink')\gexec

-- Connect to the newly created database
\c quicklink

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create 'users' table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT * FROM information_schema.tables 
                   WHERE table_schema = 'public' 
                   AND table_name = 'users') THEN
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50),
            password VARCHAR(50) NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        );
    END IF;
END
$$;

-- Create 'links' table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT * FROM information_schema.tables 
                   WHERE table_schema = 'public' 
                   AND table_name = 'links') THEN
        CREATE TABLE links (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            long_form VARCHAR(255) NOT NULL UNIQUE,
            short_form VARCHAR(255) NOT NULL UNIQUE,
            visit_times INTEGER DEFAULT 0,
            user_id UUID,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    END IF;
END
$$;

-- Insert dummy data into the 'users' table
INSERT INTO users (username, email, password, created_at, updated_at) 
VALUES ('Alice', 'alice@example.com', 'password123', NOW(), NOW()),
       ('Bob', 'bob@example.com', 'password456', NOW(), NOW())
ON CONFLICT (username) DO NOTHING;

-- Insert dummy data into the 'links' table
-- Note: Replace 'user_id' with actual UUIDs from the inserted users
INSERT INTO links (long_form, short_form, visit_times, user_id, created_at, updated_at) 
VALUES ('http://example.com', 'exmpl', 10, (SELECT id FROM users WHERE username = 'Alice'), NOW(), NOW()),
       ('http://example.org', 'exorg', 20, (SELECT id FROM users WHERE username = 'Bob'), NOW(), NOW())
ON CONFLICT (long_form) DO NOTHING;
