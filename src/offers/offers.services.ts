import { Injectable } from "@nestjs/common";
import { OffersDAO } from "./dao/offers.dao";
import { toTimestamp } from "src/common/util/googleTimestamp";
import { CourseOffer } from "@prisma/client";

@Injectable()
export class OffersService {
    constructor(private readonly offersDAO: OffersDAO) {}

    async createOffer(data: { courseId: string; studentId: string; semester: string; year: number }): Promise<Omit<CourseOffer, 'createdAt' | 'updatedAt'> & { createdAt: google.protobuf.Timestamp; updatedAt: google.protobuf.Timestamp } | null> {
        const offer = await this.offersDAO.createOffer(data);
        if(!offer) {
            return null;
        }
        return {
            ...offer,
            createdAt: toTimestamp(offer.createdAt),
            updatedAt: toTimestamp(offer.updatedAt),
        }
    }

    async getOffersByStudent(studentId: string): Promise<Array<Omit<CourseOffer, 'createdAt' | 'updatedAt'> & { createdAt: google.protobuf.Timestamp; updatedAt: google.protobuf.Timestamp }>> {
        const offers = await this.offersDAO.getStudentOffers(studentId);
        return offers.map(offer => ({
            ...offer,
            createdAt: toTimestamp(offer.createdAt),
            updatedAt: toTimestamp(offer.updatedAt),
        }));
    }
}