import { slugifyFuncWeb } from '@/sanity/lib/utils';
import axios from 'axios'
import type { JobPayload, JobsResponsePayload } from '@/types'

export async function getTeamTailorJobs(size: Number = 10, number: Number = 1, requestMeta: Boolean = false) {
  if (!process.env.TEAMTAILOR_API_KEY || !process.env.TEAMTAILOR_API_VER) {
    throw new Error('Missing API keys')
  }

  try { 
    const { data: jobsData } = await axios.get('https://api.teamtailor.com/v1/jobs', {
      headers: {
        Authorization: `Bearer ${process.env.TEAMTAILOR_API_KEY}`,
        'X-Api-Version': process.env.TEAMTAILOR_API_VER
      },
      params: {
        include: 'locations,department',
        'page[size]': `${size}`,
        'page[number]': `${number}`
      }
    })

    if (!jobsData) {
      throw new Error('No jobs found')
    }

    const friendlyText = jobsData.meta.texts

    const jobs: JobPayload = jobsData.data.map((job) => {
      const { id, attributes, links, relationships } = job || {}

      const jobLocations = jobsData.included.filter((location) =>
        location.type === 'locations' && location.id === relationships.locations.data[0].id)

      const jobDepartments = jobsData.included.find((department) =>
        department.type === 'departments' && department.id === relationships.department?.data?.id)

      return {
        id: id,
        title: attributes.title,
        remote: friendlyText[attributes['remote-status']] || attributes['remote-status'],
        type: friendlyText[attributes['employment-type']] || attributes['employment-type'],
        body: attributes.body,
        department: jobDepartments?.attributes?.name || null,
        location: jobLocations.map((location) => {
          return {
            city: location.attributes.city
          }
        }),
        slug: `/careers/${id}/${slugifyFuncWeb(attributes.title)}`,
        created_at: attributes['created-at'],
        apply_url: links['careersite-job-apply-url']
      }
    })

    if (requestMeta) {
      return<JobsResponsePayload> {
        jobs,
        meta: jobsData.meta
      }
    }

    return <JobPayload>jobs
  } catch (error) {
    return error
  }
}