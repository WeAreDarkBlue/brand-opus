import { slugifyFuncWeb } from '@/sanity/lib/utils';
import axios from 'axios'
import type { JobPayload, JobsResponsePayload } from '@/types'

export async function getJobviteJobs(size: Number = 10, number: Number = 1, requestMeta: Boolean = false) {
  if (!process.env.JOBVITE_API_KEY || !process.env.JOBVITE_API_SECRET) {
    throw new Error('Missing API keys')
  }

  try {
    const { data: jobsData } = await axios.get('https://api.jobvite.com/api/v2/job', {
      headers: {
        'x-jvi-api': `${process.env.JOBVITE_API_KEY}`,
        'x-jvi-sc': process.env.JOBVITE_API_SECRET
      },
      params: {
        subsidiaryName: 'T&Pm',
        start: `${number}`,
        count: `${size}`,
        availableTo: 'External'
      }
    })

    if (!jobsData?.requisitions) {
      throw new Error('No jobs found')
    }

    const jobs:JobPayload = jobsData.requisitions.map((job) => {
      const { eId, jobLocations, jobType, title, description, category, applyLink, lastUpdatedDate } = job || {}

      return {
        id: eId,
        title: title,
        remote: null,
        type: jobType,
        body: description,
        department: category,
        location: jobLocations,
        slug: `/careers/${eId}/${slugifyFuncWeb(title)}`,
        created_at: new Date(lastUpdatedDate),
        apply_url: applyLink
      }
    })

    if (requestMeta) {
      return<JobsResponsePayload> {
        jobs,
        total: jobsData.total,
      }
    }

    return <JobPayload>jobs
  } catch (error) {
    return error
  }
}