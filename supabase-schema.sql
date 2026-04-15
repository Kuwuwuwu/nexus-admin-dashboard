-- Create invoices table
CREATE TABLE invoices (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  amount TEXT NOT NULL,
  status TEXT CHECK (status IN ('paid', 'pending', 'failed')) NOT NULL DEFAULT 'paid',
  download_url TEXT DEFAULT '#',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create team table
CREATE TABLE team (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  avatar TEXT DEFAULT 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
  status TEXT CHECK (status IN ('active', 'inactive')) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for invoices
INSERT INTO invoices (id, date, description, amount, status, download_url) VALUES
('INV-001', '2024-03-15', 'Pro Plan - Monthly Subscription', '$29.00', 'paid', '#'),
('INV-002', '2024-02-15', 'Pro Plan - Monthly Subscription', '$29.00', 'paid', '#'),
('INV-003', '2024-01-15', 'Pro Plan - Monthly Subscription', '$29.00', 'paid', '#'),
('INV-004', '2024-01-01', 'Starter Plan - Setup Fee', '$0.00', 'paid', '#');

-- Create activity_log table
CREATE TABLE activity_log (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- Insert sample data for team
INSERT INTO team (id, name, email, role, avatar, status) VALUES
('1', 'John Doe', 'john.doe@example.com', 'Admin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe', 'active'),
('2', 'Jane Smith', 'jane.smith@example.com', 'Member', 'https://api.dicebear.com/7.x/avataaars/svg?seed=janesmith', 'active'),
('3', 'Mike Johnson', 'mike.johnson@example.com', 'Member', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mikejohnson', 'active'),
('4', 'Sarah Williams', 'sarah.williams@example.com', 'Member', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahwilliams', 'active');

-- Insert sample activity log data
INSERT INTO activity_log (id, user_id, action, target, created_at) VALUES
('1', 'user_admin_1', 'Changed role', 'Jane Smith to MODERATOR', NOW() - INTERVAL '2 minutes'),
('2', 'user_admin_1', 'Created user', 'David Brown', NOW() - INTERVAL '1 hour'),
('3', 'user_admin_1', 'Changed role', 'Mike Johnson to ADMIN', NOW() - INTERVAL '3 hours'),
('4', 'user_admin_2', 'Deleted user', 'Old Account', NOW() - INTERVAL '1 day'),
('5', 'user_admin_1', 'Created user', 'Sarah Williams', NOW() - INTERVAL '2 days');
