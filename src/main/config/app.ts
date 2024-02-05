import express from 'express'
import { setupApp } from './setup'

export const app = express()

setupApp(app)