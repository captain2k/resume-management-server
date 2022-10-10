import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class TechnologyService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}

  async update() {}

  async delete() {}

  async get() {}

  async getDetail() {}
}
