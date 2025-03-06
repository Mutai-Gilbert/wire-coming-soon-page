-- Create extension for UUID generation (if using PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Talents table
CREATE TABLE talents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    profession VARCHAR(255) NOT NULL,
    mailing_list BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    hiring_needs TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL UNIQUE,
    contact_phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Government Entities table
CREATE TABLE government_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    government_name VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    talent_interest TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL UNIQUE,
    contact_phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_talents_email ON talents(email);
CREATE INDEX idx_talents_profession ON talents(profession);
CREATE INDEX idx_companies_sector ON companies(sector);
CREATE INDEX idx_companies_country_state ON companies(country, state);
CREATE INDEX idx_government_level ON government_entities(level);

-- Create a table for matching talents with companies (for future use)
CREATE TABLE talent_company_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    match_score DECIMAL(5,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(talent_id, company_id)
);

-- Create a table for matching talents with government entities (for future use)
CREATE TABLE talent_government_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
    government_id UUID NOT NULL REFERENCES government_entities(id) ON DELETE CASCADE,
    match_score DECIMAL(5,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(talent_id, government_id)
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_talents_modtime
BEFORE UPDATE ON talents
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_companies_modtime
BEFORE UPDATE ON companies
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_government_entities_modtime
BEFORE UPDATE ON government_entities
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_talent_company_matches_modtime
BEFORE UPDATE ON talent_company_matches
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_talent_government_matches_modtime
BEFORE UPDATE ON talent_government_matches
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

