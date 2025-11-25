import { Injectable } from "@nestjs/common";
import { CoursesDAO } from "./dao/courses.dao";
import { convertDates } from "src/common/util/googleTimestamp";
import { Course } from "@prisma/client";

@Injectable()
export class CoursesService {
    constructor(private readonly coursesDAO: CoursesDAO) {}

    async getAllCourses(): Promise<Array<Omit<Course, 'createdAt' | 'updatedAt'> & { createdAt: google.protobuf.Timestamp; updatedAt: google.protobuf.Timestamp }>> {
        const courses = await this.coursesDAO.findAll();
        return courses.map(course => convertDates(course));
    }

    async getCourseById(id: string): Promise<(Omit<Course, 'createdAt' | 'updatedAt'> & { createdAt: google.protobuf.Timestamp; updatedAt: google.protobuf.Timestamp }) | null> {
        const course = await this.coursesDAO.findById(id);
        if (!course) return null;
        return convertDates(course);
    }

    async createCourse(data: { title: string; code: string; description: string; instructorId: string }): Promise<Omit<Course, 'createdAt' | 'updatedAt'> & { createdAt: google.protobuf.Timestamp; updatedAt: google.protobuf.Timestamp }> {
        const course = await this.coursesDAO.create(data);
        return convertDates(course);
    }

    async updateCourse(id: string, data: { title?: string; code?: string; description?: string; instructorId?: string }): Promise<Omit<Course, 'createdAt' | 'updatedAt'> & { createdAt: google.protobuf.Timestamp; updatedAt: google.protobuf.Timestamp }> {
        const course = await this.coursesDAO.update(id, data);
        return convertDates(course);
    }

    async deleteCourse(id: string): Promise<Omit<Course, 'createdAt' | 'updatedAt'> & { createdAt: google.protobuf.Timestamp; updatedAt: google.protobuf.Timestamp }> {
        const course = await this.coursesDAO.delete(id);
        return convertDates(course);
    }
}