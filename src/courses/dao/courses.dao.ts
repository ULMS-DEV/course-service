import { Injectable } from "@nestjs/common";
import { Course } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CoursesDAO {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Course[]> {
        return this.prisma.course.findMany();
    }

    async findById(id: string): Promise<Course | null> {
        return this.prisma.course.findUnique({
            where: { id },
            include: {
                lectures: true,
            }
        });
    }

    async create(data: { title: string; code: string; description: string; instructorId: string }): Promise<Course> {
        return this.prisma.course.create({
            data,
        });
    }

    async update(id: string, data: { title?: string; code?: string; description?: string; instructorId?: string }): Promise<Course> {
        return this.prisma.course.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Course> {
        return this.prisma.course.delete({
            where: { id },
        });
    }
}