import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(file: Express.Multer.File, cloudinaryResult: any, userId?: string) {
    return this.prisma.media.create({
      data: {
        filename: cloudinaryResult.public_id,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: cloudinaryResult.secure_url,
        uploadedById: userId,
      },
    });
  }


  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.media.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { uploadedBy: { select: { id: true, name: true } } },
      }),
      this.prisma.media.count(),
    ]);

    return { data, total, page, limit };
  }

  async remove(id: string) {
    const media = await this.prisma.media.findUnique({ where: { id } });
    if (!media) throw new NotFoundException('Media not found');

    // Delete from Cloudinary
    await this.cloudinaryService.deleteFile(media.filename);

    return this.prisma.media.delete({ where: { id } });
  }

}
