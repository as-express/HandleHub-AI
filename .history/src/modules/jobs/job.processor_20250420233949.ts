import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { ComplaintService } from 'src/complaint/complaint.service'
import { ComplaintJob } from './interface/complaint-job'

@Processor('jobs')
export class JobProcessor extends WorkerHost {
  constructor(private readonly complaintService: ComplaintService) {
    super()
  }

  async process(job: Job<ComplaintJob>) {
    await this.complaintService.create(+job.data.user, job.data.data)
  }
}
