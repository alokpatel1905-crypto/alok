import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProgramDto) {
    const existingProgram = await this.prisma.program.findUnique({
      where: { slug: dto.slug },
    });

    if (existingProgram) {
      throw new BadRequestException('Slug already exists');
    }

    return this.prisma.program.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        image: dto.image, 
        status: dto.status || 'DRAFT',
      },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    search = '',
    status = '',
    sortBy = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
    isActive = '',
  ) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (status) {
      where.status = status;
    }

    if (isActive !== '') {
      where.isActive = isActive === 'true';
    }

    const data = await this.prisma.program.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    });

    const total = await this.prisma.program.count({ where });

    return {
      data,
      total,
      page,
      limit,
      search,
      status,
      sortBy,
      order,
      isActive,
    };
  }

  async findPublished() {
    return this.prisma.program.findMany({
      where: {
        status: 'PUBLISHED',
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findPublishedBySlug(slug: string) {
    const program = await this.prisma.program.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
        isActive: true,
      },
    });

    if (!program) {
      throw new NotFoundException('Published program not found');
    }

    return program;
  }

  async findBySlug(slug: string) {
    const program = await this.prisma.program.findUnique({
      where: { slug },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program;
  }

  async update(id: string, dto: UpdateProgramDto) {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    if (dto.slug) {
      const existingProgram = await this.prisma.program.findFirst({
        where: {
          slug: dto.slug,
          NOT: { id },
        },
      });

      if (existingProgram) {
        throw new BadRequestException('Slug already exists');
      }
    }

    return this.prisma.program.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return this.prisma.program.delete({
      where: { id },
    });
  }

  async toggleActive(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return this.prisma.program.update({
      where: { id },
      data: {
        isActive: !program.isActive,
      },
    });
  }

  async toggleStatus(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return this.prisma.program.update({
      where: { id },
      data: {
        status: program.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED',
      },
    });
  }

  async findById(id: string) {
  const program = await this.prisma.program.findUnique({
    where: { id },
  });

  if (!program) {
    throw new NotFoundException('Program not found');
  }

  return program;
  }

  async getCounts() {
  const total = await this.prisma.program.count();

  const published = await this.prisma.program.count({
    where: { status: 'PUBLISHED' },
  });

  const draft = await this.prisma.program.count({
    where: { status: 'DRAFT' },
  });

  const active = await this.prisma.program.count({
    where: { isActive: true },
  });

  const inactive = await this.prisma.program.count({
    where: { isActive: false },
  });

  return {
    total,
    published,
    draft,
    active,
    inactive,
  };
  }
}