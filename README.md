# TimelyApp Node SDK

[![Timely Rest API](https://img.shields.io/badge/Timely%20Rest%20API--green.svg)](https://dev.timelyapp.com/)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/pliancy/timelyapp-sdk/CI)](https://github.com/pliancy/timelyapp-sdk)
[![npm](https://img.shields.io/npm/v/timelyapp.svg)](https://www.npmjs.com/package/timelyapp)
[![Downloads](https://img.shields.io/npm/dm/timelyapp.svg)](https://npmjs.com/timelyapp)
[![Dependency Status](https://img.shields.io/david/pliancy/timelyapp-sdk)](https://david-dm.org/pliancy/timelyapp-sdk)
[![License](https://img.shields.io/github/license/pliancy/timelyapp-sdk)](https://npmjs.com/timelyapp)

A typed node module which provides a wrapper and several convienence functions for the TimelyApp.com API

## Installation

```shell
npm install timelyapp
```

## Examples
```typescript
import { TimelyApp } from 'timelyapp'
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
```

### Create the client

```typescript
import { TimelyApp } from 'timelyapp'

const timely = new TimelyApp({
  clientId: 'xxxxxxxxxxxxx',
  clientSecret: 'xxxxxxxxxxxxx',
  accountId: '123456',
})
```

### Get all users

```typescript
const users = await timely.users.getAll()
```
