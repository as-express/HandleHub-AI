import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'

@Injectable()
export class JobsService {
  constructor(
    @InjectQueue('jobs')
    private readonly queue: Queue,
  ) {}

  async addJob(data: any) {
    await this.queue.add('complaint', data)
  }
}
