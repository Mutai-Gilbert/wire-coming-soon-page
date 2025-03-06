// Example Node.js code to connect to your database
// This assumes you're using PostgreSQL with the 'pg' package

import pkg from "pg"
const { Pool } = pkg

// Database connection configuration
const pool = new Pool({
  user: "your_username",
  host: "your_host",
  database: "wira_db",
  password: "your_password",
  port: 5432,
})

// Example function to insert a new talent
async function insertTalent(talent) {
  const query = `
    INSERT INTO talents (name, email, phone, profession, mailing_list)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `

  const values = [talent.name, talent.email, talent.phone, talent.profession, talent.mailingList || false]

  try {
    const result = await pool.query(query, values)
    console.log("Talent inserted with ID:", result.rows[0].id)
    return result.rows[0].id
  } catch (error) {
    console.error("Error inserting talent:", error)
    throw error
  }
}

// Example function to insert a new company
async function insertCompany(company) {
  const query = `
    INSERT INTO companies (company_name, country, state, sector, hiring_needs, contact_email, contact_phone)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `

  const values = [
    company.companyName,
    company.country,
    company.state,
    company.sector,
    company.hiringNeeds,
    company.contactEmail,
    company.contactPhone,
  ]

  try {
    const result = await pool.query(query, values)
    console.log("Company inserted with ID:", result.rows[0].id)
    return result.rows[0].id
  } catch (error) {
    console.error("Error inserting company:", error)
    throw error
  }
}

// Example function to insert a new government entity
async function insertGovernmentEntity(government) {
  const query = `
    INSERT INTO government_entities (government_name, level, talent_interest, contact_email, contact_phone)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `

  const values = [
    government.governmentName,
    government.level,
    government.talentInterest,
    government.contactEmail,
    government.contactPhone,
  ]

  try {
    const result = await pool.query(query, values)
    console.log("Government entity inserted with ID:", result.rows[0].id)
    return result.rows[0].id
  } catch (error) {
    console.error("Error inserting government entity:", error)
    throw error
  }
}

// Example usage
const newTalent = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+1234567890",
  profession: "Data Scientist",
  mailingList: true,
}

// Uncomment to test
// insertTalent(newTalent)
//   .then(id => console.log('Success! Talent ID:', id))
//   .catch(err => console.error('Failed to insert talent:', err))
//   .finally(() => pool.end());

export { insertTalent, insertCompany, insertGovernmentEntity }

