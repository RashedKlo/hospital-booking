-- ============================================
-- USERS TABLE
-- ============================================
-- Main users table for authentication and user management

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified BOOLEAN NOT NULL DEFAULT false,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    password_hash VARCHAR(255),  -- NULL for OAuth users
    phone VARCHAR(20),
    avatar VARCHAR(500),  -- Profile picture URL
    role VARCHAR(50) NOT NULL DEFAULT 'patient',  -- 'patient', 'doctor', 'admin', 'clinic_owner'
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_blocked BOOLEAN NOT NULL DEFAULT false,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_is_active (is_active),
    
    -- Constraints
    CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_role CHECK (role IN ('patient', 'doctor', 'admin', 'clinic_owner'))
);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_users_updated_at();


-- ============================================
-- OAUTH_PROVIDERS TABLE
-- ============================================
-- Stores OAuth authentication data (Google, Facebook, etc.)

CREATE TABLE oauth_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    provider VARCHAR(50) NOT NULL,  -- 'google', 'facebook', 'apple', etc.
    provider_user_id VARCHAR(255) NOT NULL,  -- User ID from the OAuth provider
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_oauth_providers_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    
    -- Unique constraint: one provider account per user
    CONSTRAINT uq_user_provider UNIQUE (user_id, provider),
    
    -- Unique constraint: one provider user ID per provider
    CONSTRAINT uq_provider_user UNIQUE (provider, provider_user_id),
    
    -- Indexes
    INDEX idx_oauth_providers_user_id (user_id),
    INDEX idx_oauth_providers_provider (provider)
);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_oauth_providers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_oauth_providers_timestamp
    BEFORE UPDATE ON oauth_providers
    FOR EACH ROW
    EXECUTE FUNCTION update_oauth_providers_updated_at();


-- ============================================
-- PASSWORD_RESET_TOKENS TABLE
-- ============================================
-- Stores password reset tokens for "Forgot Password" functionality

CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN NOT NULL DEFAULT false,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_password_reset_tokens_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_password_reset_tokens_token (token),
    INDEX idx_password_reset_tokens_user_id (user_id),
    INDEX idx_password_reset_tokens_expires_at (expires_at)
);


-- ============================================
-- EMAIL_VERIFICATION_TOKENS TABLE
-- ============================================
-- Stores email verification tokens for new user registration

CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_email_verification_tokens_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_email_verification_tokens_token (token),
    INDEX idx_email_verification_tokens_user_id (user_id)
);


-- ============================================
-- USER_SESSIONS TABLE
-- ============================================
-- Stores active user sessions for "Remember Me" functionality

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),  -- Supports both IPv4 and IPv6
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_user_sessions_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_user_sessions_user_id (user_id),
    INDEX idx_user_sessions_token (session_token),
    INDEX idx_user_sessions_expires_at (expires_at)
);


-- ============================================
-- USER_PROFILES TABLE (Optional - Extended Info)
-- ============================================
-- Stores additional user profile information

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    date_of_birth DATE,
    gender VARCHAR(20),  -- 'male', 'female', 'other', 'prefer_not_to_say'
    national_id VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Saudi Arabia',
    postal_code VARCHAR(20),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    blood_type VARCHAR(5),  -- 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
    allergies TEXT,
    medical_conditions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_user_profiles_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    
    -- Constraints
    CONSTRAINT chk_gender CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    CONSTRAINT chk_blood_type CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'))
);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_profiles_timestamp
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_user_profiles_updated_at();


-- ============================================
-- SAMPLE DATA FOR TESTING
-- ============================================

-- Sample Users (Password: "password123" - hashed with bcrypt)
INSERT INTO users (name, email, email_verified, password_hash, role, is_active) VALUES
('محمد أحمد السعيد', 'mohammed@example.com', true, '$2b$10$rKz8qJXqKqXqKqXqKqXqKe', 'patient', true),
('سارة خالد العلي', 'sara@example.com', true, '$2b$10$rKz8qJXqKqXqKqXqKqXqKe', 'patient', true),
('د. أحمد محمد', 'dr.ahmed@example.com', true, '$2b$10$rKz8qJXqKqXqKqXqKqXqKe', 'doctor', true),
('مدير النظام', 'admin@example.com', true, '$2b$10$rKz8qJXqKqXqKqXqKqXqKe', 'admin', true);

-- Sample OAuth Provider (Google)
INSERT INTO oauth_providers (user_id, provider, provider_user_id) VALUES
((SELECT id FROM users WHERE email = 'mohammed@example.com'), 'google', '1234567890');


-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Find user by email (for login)
-- SELECT * FROM users WHERE email = 'user@example.com' AND is_active = true;

-- Create new user (signup)
-- INSERT INTO users (name, email, password_hash) 
-- VALUES ('User Name', 'user@example.com', 'hashed_password')
-- RETURNING id, name, email, created_at;

-- Verify email
-- UPDATE users SET email_verified = true, email_verified_at = CURRENT_TIMESTAMP
-- WHERE id = 'user-id';

-- Update last login
-- UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = 'user-id';

-- Find user by OAuth provider
-- SELECT u.* FROM users u
-- JOIN oauth_providers op ON u.id = op.user_id
-- WHERE op.provider = 'google' AND op.provider_user_id = 'provider-user-id';

-- Get active sessions for a user
-- SELECT * FROM user_sessions 
-- WHERE user_id = 'user-id' AND expires_at > CURRENT_TIMESTAMP
-- ORDER BY last_activity_at DESC;

-- Clean up expired tokens (run periodically)
-- DELETE FROM password_reset_tokens WHERE expires_at < CURRENT_TIMESTAMP;
-- DELETE FROM email_verification_tokens WHERE expires_at < CURRENT_TIMESTAMP;
-- DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP;
