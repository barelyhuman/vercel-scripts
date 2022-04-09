import got from 'got'

const baseUrl = suffix => 'https://api.vercel.com/v8' + suffix

export const URLS = {
	getProjectsURL: () => baseUrl('/projects?limit=1000'),
	deleteProjectURL: id => baseUrl('/projects/' + id),
}

function baseFetcher(url) {
	const ctx = this || {}
	const headers = {
		Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
	}
	if (ctx.delete) {
		return got
			.delete(url, {
				headers,
			})
			.json()
	}
	return got(url, {
		headers,
	}).json()
}

export const fetcher = baseFetcher.bind({delete: false})
export const deletor = baseFetcher.bind({delete: true})
