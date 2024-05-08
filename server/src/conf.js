const config = {
  database_url : process.env.DATABASE_URL || "mongodb://localhost",
  database_name : process.env.DATABASE_NAME || "GrandLineDB"
}

export default config
