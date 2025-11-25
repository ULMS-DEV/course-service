import { Controller } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { GrpcMethod } from "@nestjs/microservices";
import { OffersService } from "src/offers/offers.services";

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService, private readonly offersService: OffersService) {}

    @GrpcMethod('CourseService', 'GetAllCourses')
    async getAllCourses() {
        const courses = await this.coursesService.getAllCourses();
        return {courses};
    }
    
    @GrpcMethod('CourseService', 'GetCourseById')
    async getCourseById(data: { id: string }) {
        return this.coursesService.getCourseById(data.id);
    }

    @GrpcMethod('CourseService', 'CreateCourse')
    async createCourse(data: { title: string; code: string; description: string; instructorId: string }) {
        return this.coursesService.createCourse(data);
    }

    @GrpcMethod('CourseService', 'CreateCourseOffer')
    async createCourseOffer(data: { courseId: string; studentId: string; semester: string; year: number }) {
        return this.offersService.createOffer(data);
    }

    @GrpcMethod('CourseService', 'GetOffersForStudent')
    async getOffersForStudent(data: { studentId: string }) {
        const offers = await this.offersService.getOffersByStudent(data.studentId);
        return { offers };
    }
}