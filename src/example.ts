import { TimelyApp } from '.'
import dotenv from 'dotenv'
dotenv.config()

const timely = new TimelyApp({
    accountId: process.env.TIMELY_ACCOUNT as string,
    token: process.env.TIMELY_TOKEN as string,
})

;(async () => {
    const output = await timely.getClients()
    // eslint-disable-next-line no-console
    console.dir(output, { depth: null })
    // eslint-disable-next-line no-console
})().catch(console.log)
