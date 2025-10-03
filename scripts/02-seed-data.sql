-- Insert sample admin user
INSERT INTO users (email, password_hash, full_name, role, phone) VALUES
('admin@marketplace.com', '$2b$10$example_hash', 'Admin User', 'admin', '555-0100');

-- Insert sample students
INSERT INTO users (email, password_hash, full_name, role, phone, bio) VALUES
('john.doe@university.edu', '$2b$10$example_hash', 'John Doe', 'student', '555-0101', 'Computer Science student passionate about web development'),
('jane.smith@university.edu', '$2b$10$example_hash', 'Jane Smith', 'student', '555-0102', 'Graphic design student with 3 years of experience'),
('mike.wilson@university.edu', '$2b$10$example_hash', 'Mike Wilson', 'student', '555-0103', 'Marketing major specializing in social media');

-- Insert sample clients
INSERT INTO users (email, password_hash, full_name, role, phone, bio) VALUES
('client1@business.com', '$2b$10$example_hash', 'Sarah Johnson', 'client', '555-0201', 'Small business owner looking for talented students'),
('client2@startup.com', '$2b$10$example_hash', 'David Brown', 'client', '555-0202', 'Startup founder seeking creative help');

-- Insert student profiles (assuming user IDs 2, 3, 4 are students)
INSERT INTO student_profiles (user_id, university, major, graduation_year, skills, hourly_rate, availability, rating, total_reviews) VALUES
((SELECT id FROM users WHERE email = 'john.doe@university.edu'), 'State University', 'Computer Science', 2025, ARRAY['React', 'Node.js', 'Python', 'SQL'], 35.00, 'Part-time', 4.8, 12),
((SELECT id FROM users WHERE email = 'jane.smith@university.edu'), 'Art Institute', 'Graphic Design', 2024, ARRAY['Photoshop', 'Illustrator', 'Figma', 'Branding'], 40.00, 'Full-time', 4.9, 18),
((SELECT id FROM users WHERE email = 'mike.wilson@university.edu'), 'Business College', 'Marketing', 2026, ARRAY['Social Media', 'Content Writing', 'SEO', 'Analytics'], 30.00, 'Part-time', 4.7, 8);

-- Insert sample services
INSERT INTO services (student_id, title, description, category, price, delivery_time, status, views, orders_completed) VALUES
((SELECT id FROM users WHERE email = 'john.doe@university.edu'), 'Full-Stack Web Development', 'I will build a responsive web application using React and Node.js', 'Web Development', 500.00, 14, 'active', 45, 8),
((SELECT id FROM users WHERE email = 'jane.smith@university.edu'), 'Logo Design & Branding', 'Professional logo design with brand guidelines and multiple revisions', 'Graphic Design', 150.00, 5, 'active', 67, 15),
((SELECT id FROM users WHERE email = 'mike.wilson@university.edu'), 'Social Media Management', 'Complete social media strategy and content creation for 1 month', 'Marketing', 300.00, 30, 'active', 32, 5);

-- Insert sample jobs
INSERT INTO jobs (client_id, title, description, category, budget, deadline, required_skills, status) VALUES
((SELECT id FROM users WHERE email = 'client1@business.com'), 'E-commerce Website Development', 'Need a modern e-commerce website with payment integration', 'Web Development', 2000.00, '2025-05-01', ARRAY['React', 'Node.js', 'Payment Integration'], 'open'),
((SELECT id FROM users WHERE email = 'client2@startup.com'), 'Mobile App UI/UX Design', 'Looking for creative UI/UX design for a fitness tracking app', 'Design', 800.00, '2025-04-15', ARRAY['Figma', 'UI/UX', 'Mobile Design'], 'open');
