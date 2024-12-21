import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log('running on ', config.port as string)
    })
  } catch (error) {
    console.log(error)
  }
}
export default main

main()
