import {conch} from '@barelyreaper/conch'
import {deletor, fetcher, URLS} from './http.js'

/**
 * @typedef {object} ProjectItem
 * @property {string} id
 * @property {string} name
 */

/**
 *
 * @returns  {ProjectItem[]}
 */
export async function getProjects() {
	const projectResponse = await fetcher(URLS.getProjectsURL())
	const formatted = projectResponse.projects.map(x => ({
		id: x.id,
		name: x.name,
	}))
	return formatted
}

/**
 *
 * @param {[]ProjectItem} projects
 */
export async function deleteProjects(projects) {
	console.log('deleting projects...')

	/**
	 *
	 * @param {ProjectItem} project
	 */
	const requestor = async project => {
		await deletor(URLS.deleteProjectURL(project.id))
		console.log(`Deleted: ${project.name} | ${project.id}`)
	}

	await conch(projects, requestor, {limit: 5})
}
