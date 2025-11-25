import { Injectable } from "@nestjs/common";
import { CourseOffer } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OffersDAO {
    constructor(private readonly prisma: PrismaService) {}
    
    async createOffer(data: { courseId: string; studentId: string; semester: string; year: number }): Promise<CourseOffer> {
        return this.prisma.courseOffer.create({
            data
        });
    }

    async getStudentOffers(studentId: string): Promise<CourseOffer[]> {
        return this.prisma.courseOffer.findMany({
            where: { studentId },
            include: {
                course: true,
            }
        });
    }
}