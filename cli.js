#!/usr/bin/env node

import env from 'dotenv'
import {ui} from './src/ui.js'

env.config()

async function main() {
	const selections = await ui()
	selections.action.action(selections.projects)
}

main()
