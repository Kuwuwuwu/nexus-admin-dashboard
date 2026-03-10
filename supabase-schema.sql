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

-- Insert sample data for team
INSERT INTO team (id, name, email, role, avatar, status) VALUES
('1', 'John Doe', 'john.doe@example.com', 'Admin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe', 'active'),
('2', 'Jane Smith', 'jane.smith@example.com', 'Member', 'https://api.dicebear.com/7.x/avataaars/svg?seed=janesmith', 'active'),
('3', 'Mike Johnson', 'mike.johnson@example.com', 'Member', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mikejohnson', 'active'),
('4', 'Sarah Williams', 'sarah.williams@example.com', 'Member', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahwilliams', 'active');
