import drizzleOptions from './drizzleOptions'
import { Drizzle, generateStore } from 'drizzle'

const drizzleStore = generateStore(drizzleOptions)
const drizzle = new Drizzle(drizzleOptions, drizzleStore)

export default drizzle