/*
  Warnings:

  - A unique constraint covering the columns `[studentId,courseId,year,semester]` on the table `CourseOffer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseOffer_studentId_courseId_year_semester_key" ON "CourseOffer"("studentId", "courseId", "year", "semester");
