const NodeEnvironment = require('jest-environment-node').default
const { randomUUID } = require('crypto')
const { execSync } = require('child_process')
const { resolve } = require('path')

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(resolve(__dirname, 'testDatabase', 'test.db'));

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test')
})
const prismaCli = resolve(__dirname, '..', 'node_modules', '.bin', 'prisma' )


class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    
    this.connectionString = `${process.env.DATABASE_URL}`
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    //Rodar as migration no banco de teste

    const setupCommand = `${prismaCli} migrate dev --schema ./prisma/testDatabase/schema.prisma --name db-test-init`

    execSync(setupCommand)
  }

  teardown() {
    db.serialize(() => {
      db.run(`DELETE FROM games`)
    })
    
  }
}

module.exports = CustomEnvironment
