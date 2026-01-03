-- ============================================
-- CLINIC FACILITIES TABLE
-- ============================================
-- Stores information about facilities available at each clinic
-- (e.g., parking, lab, pharmacy, etc.)

CREATE TABLE clinic_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL,  -- Icon name (e.g., 'Building', 'Car', 'TestTube')
    available BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_clinic_facilities_clinic 
        FOREIGN KEY (clinic_id) 
        REFERENCES clinics(id) 
        ON DELETE CASCADE,
    
    -- Indexes for better query performance
    INDEX idx_clinic_facilities_clinic_id (clinic_id),
    INDEX idx_clinic_facilities_display_order (display_order)
);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_clinic_facilities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_clinic_facilities_timestamp
    BEFORE UPDATE ON clinic_facilities
    FOR EACH ROW
    EXECUTE FUNCTION update_clinic_facilities_updated_at();


-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
-- Stores patient reviews and testimonials for clinics

CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    avatar VARCHAR(500),  -- URL to patient avatar image
    avatar_alt VARCHAR(255),  -- Alt text for avatar image
    verified BOOLEAN NOT NULL DEFAULT false,
    is_approved BOOLEAN NOT NULL DEFAULT false,  -- Admin approval status
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_testimonials_clinic 
        FOREIGN KEY (clinic_id) 
        REFERENCES clinics(id) 
        ON DELETE CASCADE,
    
    -- Indexes for better query performance
    INDEX idx_testimonials_clinic_id (clinic_id),
    INDEX idx_testimonials_rating (rating),
    INDEX idx_testimonials_verified (verified),
    INDEX idx_testimonials_approved (is_approved),
    INDEX idx_testimonials_date (date DESC)
);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_testimonials_timestamp
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_testimonials_updated_at();


-- ============================================
-- SAMPLE DATA FOR TESTING
-- ============================================

-- Sample Clinic Facilities
INSERT INTO clinic_facilities (clinic_id, name, icon, available, display_order) VALUES
-- Assuming clinic_id exists in your clinics table
('clinic-uuid-here', 'غرف فحص مجهزة', 'Building', true, 1),
('clinic-uuid-here', 'أجهزة تصوير متطورة', 'Camera', true, 2),
('clinic-uuid-here', 'مختبر تحاليل', 'TestTube', true, 3),
('clinic-uuid-here', 'موقف سيارات', 'Car', true, 4),
('clinic-uuid-here', 'صيدلية', 'Pill', true, 5),
('clinic-uuid-here', 'غرف انتظار مريحة', 'Armchair', true, 6),
('clinic-uuid-here', 'واي فاي مجاني', 'Wifi', true, 7),
('clinic-uuid-here', 'مصلى', 'Building2', true, 8);

-- Sample Testimonials
INSERT INTO testimonials (clinic_id, patient_name, rating, comment, date, avatar, avatar_alt, verified, is_approved) VALUES
-- Assuming clinic_id exists in your clinics table
('clinic-uuid-here', 'محمد السعدي', 5, 'تجربة ممتازة، الدكتور محترف جداً وشرح لي حالتي بوضوح تام. العيادة نظيفة والموظفون متعاونون.', '2024-01-15', 'https://images.unsplash.com/photo-1624411024074-18a756682b50', 'Patient testimonial', true, true),
('clinic-uuid-here', 'سارة أحمد', 5, 'الدكتورة رائعة جداً، العلاج كان فعال والنتائج ممتازة. أنصح الجميع بزيارة هذه العيادة.', '2024-01-20', 'https://images.unsplash.com/photo-1645011093223-77c4692e9843', 'Patient testimonial', true, true),
('clinic-uuid-here', 'عبدالله الغامدي', 4, 'خدمة جيدة بشكل عام، الانتظار كان قليلاً والفحص شامل. سعر الكشف معقول.', '2024-01-18', 'https://images.unsplash.com/photo-1520434087499-0fa48ffb40c9', 'Patient testimonial', true, true),
('clinic-uuid-here', 'منى السعيد', 5, 'تابعت حملي في هذه العيادة وكانت تجربة رائعة. الدكتورة متفهمة ومهنية.', '2024-01-25', 'https://images.unsplash.com/photo-1645011093223-77c4692e9843', 'Patient testimonial', true, true);


-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Get all facilities for a specific clinic (ordered by display_order)
-- SELECT * FROM clinic_facilities 
-- WHERE clinic_id = 'your-clinic-id' AND available = true
-- ORDER BY display_order ASC;

-- Get all approved testimonials for a specific clinic (newest first)
-- SELECT * FROM testimonials 
-- WHERE clinic_id = 'your-clinic-id' AND is_approved = true
-- ORDER BY date DESC, created_at DESC;

-- Get average rating from testimonials for a clinic
-- SELECT AVG(rating) as average_rating, COUNT(*) as total_reviews
-- FROM testimonials 
-- WHERE clinic_id = 'your-clinic-id' AND is_approved = true;

-- Get testimonials with high ratings (4-5 stars) for a clinic
-- SELECT * FROM testimonials 
-- WHERE clinic_id = 'your-clinic-id' 
--   AND is_approved = true 
--   AND rating >= 4
-- ORDER BY rating DESC, date DESC;
