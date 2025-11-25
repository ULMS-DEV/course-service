/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Assignment" DROP CONSTRAINT "Assignment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Submission" DROP CONSTRAINT "Submission_assignmentId_fkey";

-- DropTable
DROP TABLE "public"."Assignment";

-- DropTable
DROP TABLE "public"."Submission";
