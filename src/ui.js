import enquirer from 'enquirer'
import {getProjects, deleteProjects} from './projects.js'

export async function ui() {
	const allProjects = await getProjects()

	const actions = [
		{
			name: 'delete',
			action: deleteProjects,
		},
		{
			name: 'cancel',
			action: cancelProcess,
		},
	]

	const questions = [
		{
			type: 'multiselect',
			name: 'project',
			message: 'Select the projects you want to perform an action on',
			limit: 10,
			choices: allProjects,
		},
		{
			type: 'select',
			name: 'action',
			choices: actions.map(x => x.name),
		},
	]

	const answers = await enquirer.prompt(questions).catch(console.error)

	const selections = {}
	selections.projects = allProjects.filter(
		x => answers.project.indexOf(x.name) > -1,
	)
	selections.action = actions.find(x => answers.action === x.name)
	return selections
}

function cancelProcess() {
	console.log('Cancelled!')
	process.exit(1)
}
