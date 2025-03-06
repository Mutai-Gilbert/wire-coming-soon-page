-- Insert a new talent
INSERT INTO talents (name, email, phone, profession, mailing_list)
VALUES ('John Doe', 'john@example.com', '+1234567890', 'Software Engineer', TRUE);

-- Insert a new company
INSERT INTO companies (company_name, country, state, sector, hiring_needs, contact_email, contact_phone)
VALUES ('Acme Corporation', 'United States', 'California', 'Technology', 
        'Looking for experienced software engineers and product managers', 
        'hr@acme.com', '+1987654321');

-- Insert a new government entity
INSERT INTO government_entities (government_name, level, talent_interest, contact_email, contact_phone)
VALUES ('California Department of Labor', 'state', 
        'Seeking skilled professionals in workforce development and labor policy', 
        'contact@labor.ca.gov', '+1122334455');

-- Query to find all talents in a specific profession
SELECT * FROM talents WHERE profession ILIKE '%engineer%';

-- Query to find companies in a specific sector and location
SELECT * FROM companies WHERE sector = 'Technology' AND country = 'United States';

-- Query to find government entities at a specific level
SELECT * FROM government_entities WHERE level = 'state';

-- Query to find potential matches between talents and companies (example logic)
SELECT 
    t.id AS talent_id, 
    t.name AS talent_name, 
    t.profession,
    c.id AS company_id,
    c.company_name,
    c.sector
FROM 
    talents t
CROSS JOIN 
    companies c
WHERE 
    t.profession ILIKE '%' || c.sector || '%'
ORDER BY 
    t.name, c.company_name;

-- Update a talent's information
UPDATE talents 
SET phone = '+1999888777', profession = 'Senior Software Engineer', updated_at = CURRENT_TIMESTAMP
WHERE email = 'john@example.com';

-- Delete a company (with cascading delete for any matches)
DELETE FROM companies WHERE company_name = 'Acme Corporation';

