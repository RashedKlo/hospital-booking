# Database Table Fields Documentation

## 📋 CLINIC_FACILITIES Table

**Purpose:** Stores information about facilities available at each clinic (e.g., parking, lab, pharmacy, WiFi, etc.)

### Table Fields:

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, AUTO-GENERATED | Unique identifier for the facility |
| `clinic_id` | UUID | NOT NULL, FOREIGN KEY | Reference to the clinic (from clinics table) |
| `name` | VARCHAR(255) | NOT NULL | Name of the facility (e.g., "موقف سيارات", "مختبر تحاليل") |
| `icon` | VARCHAR(100) | NOT NULL | Icon name for UI display (e.g., "Car", "TestTube", "Building") |
| `available` | BOOLEAN | NOT NULL, DEFAULT true | Whether the facility is currently available |
| `display_order` | INTEGER | NOT NULL, DEFAULT 0 | Order in which to display facilities (lower = first) |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the record was created |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the record was last updated |

### Indexes:
- `idx_clinic_facilities_clinic_id` - Fast lookup by clinic
- `idx_clinic_facilities_display_order` - Fast sorting by display order

### Foreign Keys:
- `clinic_id` → `clinics(id)` ON DELETE CASCADE

### Example Data:
```sql
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "clinic_id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "موقف سيارات",
  "icon": "Car",
  "available": true,
  "display_order": 1
}
```

---

## 💬 TESTIMONIALS Table

**Purpose:** Stores patient reviews and testimonials for clinics

### Table Fields:

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, AUTO-GENERATED | Unique identifier for the testimonial |
| `clinic_id` | UUID | NOT NULL, FOREIGN KEY | Reference to the clinic (from clinics table) |
| `patient_name` | VARCHAR(255) | NOT NULL | Name of the patient who left the review |
| `rating` | INTEGER | NOT NULL, CHECK (1-5) | Rating from 1 to 5 stars |
| `comment` | TEXT | NOT NULL | The testimonial text/review content |
| `date` | DATE | NOT NULL, DEFAULT CURRENT_DATE | Date when the review was written |
| `avatar` | VARCHAR(500) | NULLABLE | URL to patient's avatar image |
| `avatar_alt` | VARCHAR(255) | NULLABLE | Alt text for the avatar image (accessibility) |
| `verified` | BOOLEAN | NOT NULL, DEFAULT false | Whether the review is verified (patient actually visited) |
| `is_approved` | BOOLEAN | NOT NULL, DEFAULT false | Whether admin has approved the review for display |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the record was created |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the record was last updated |

### Indexes:
- `idx_testimonials_clinic_id` - Fast lookup by clinic
- `idx_testimonials_rating` - Fast filtering by rating
- `idx_testimonials_verified` - Fast filtering by verification status
- `idx_testimonials_approved` - Fast filtering by approval status
- `idx_testimonials_date` - Fast sorting by date (DESC)

### Foreign Keys:
- `clinic_id` → `clinics(id)` ON DELETE CASCADE

### Example Data:
```sql
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "clinic_id": "123e4567-e89b-12d3-a456-426614174000",
  "patient_name": "محمد السعدي",
  "rating": 5,
  "comment": "تجربة ممتازة، الدكتور محترف جداً وشرح لي حالتي بوضوح تام.",
  "date": "2024-01-15",
  "avatar": "https://images.unsplash.com/photo-1624411024074-18a756682b50",
  "avatar_alt": "Patient testimonial",
  "verified": true,
  "is_approved": true
}
```

---

## 🔗 Relationships

```
clinics (1) ──→ (many) clinic_facilities
clinics (1) ──→ (many) testimonials
```

Both tables have a **one-to-many** relationship with the `clinics` table:
- One clinic can have multiple facilities
- One clinic can have multiple testimonials

---

## 📊 Common Queries

### Get all facilities for a clinic:
```sql
SELECT * FROM clinic_facilities 
WHERE clinic_id = 'your-clinic-id' 
  AND available = true
ORDER BY display_order ASC;
```

### Get approved testimonials for a clinic:
```sql
SELECT * FROM testimonials 
WHERE clinic_id = 'your-clinic-id' 
  AND is_approved = true
ORDER BY date DESC, created_at DESC;
```

### Get average rating for a clinic:
```sql
SELECT 
    AVG(rating) as average_rating, 
    COUNT(*) as total_reviews
FROM testimonials 
WHERE clinic_id = 'your-clinic-id' 
  AND is_approved = true;
```

### Get high-rated testimonials (4-5 stars):
```sql
SELECT * FROM testimonials 
WHERE clinic_id = 'your-clinic-id' 
  AND is_approved = true 
  AND rating >= 4
ORDER BY rating DESC, date DESC
LIMIT 10;
```

---

## 🎨 Icon Names Reference

For the `clinic_facilities.icon` field, use these icon names (from Lucide React):

| Icon Name | Use Case |
|-----------|----------|
| `Building` | Examination rooms, clinic building |
| `Car` | Parking facilities |
| `TestTube` | Laboratory |
| `Pill` | Pharmacy |
| `Camera` | Imaging equipment (X-ray, MRI, etc.) |
| `Wifi` | Free WiFi |
| `Armchair` | Waiting area |
| `Building2` | Prayer room |
| `Coffee` | Cafeteria |
| `Accessibility` | Wheelchair accessible |
| `Baby` | Kids play area |
| `Heart` | Emergency services |

---

## ✅ Best Practices

### For Facilities:
1. Use `display_order` to control the order facilities appear in the UI
2. Set `available = false` instead of deleting facilities that are temporarily unavailable
3. Use consistent icon names across all clinics

### For Testimonials:
1. Always set `is_approved = false` by default (admin approval required)
2. Use `verified = true` only for patients who actually visited the clinic
3. Store the original review date in the `date` field
4. Keep patient names anonymous if privacy is a concern (e.g., "مريض راضٍ")
5. Moderate comments before approval to ensure quality and appropriateness

---

## 🔄 Auto-Update Triggers

Both tables have triggers that automatically update the `updated_at` timestamp whenever a record is modified. No manual intervention needed!
