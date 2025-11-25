-- CreateTable
CREATE TABLE "Grades" (
    "id" TEXT NOT NULL,
    "courseOfferId" TEXT NOT NULL,
    "finalExam" DOUBLE PRECISION,
    "midtermExam" DOUBLE PRECISION,
    "assignments" DOUBLE PRECISION,
    "attendance" DOUBLE PRECISION,
    "quizzes" DOUBLE PRECISION,
    "overallGrade" DOUBLE PRECISION,

    CONSTRAINT "Grades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Grades_courseOfferId_key" ON "Grades"("courseOfferId");

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_courseOfferId_fkey" FOREIGN KEY ("courseOfferId") REFERENCES "CourseOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
