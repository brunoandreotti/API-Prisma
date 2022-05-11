const NodeEnvironment = require('jest-environment-node').default
const { randomUUID } = require('crypto')
const { execSync } = require('child_process')
const { resolve } = require('path')

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test')
})
const prismaCli = resolve(__dirname, '..', 'node_modules', '.bin', 'prisma' )


class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    this.schema = `dev.db`
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    //Rodar as migration no banco de teste

    const setupCommand = `${prismaCli} migrate dev --schema ./prisma/testDatabase/schema.prisma --name db-test-init`

    execSync(setupCommand)
  }

  teardown() {
    const tearDownCommand = `${prismaCli} migrate reset --schema ./prisma/testDatabase/schema.prisma -f`

    execSync(tearDownCommand)
  }
}

module.exports = CustomEnvironment
