/*
  Warnings:

  - You are about to drop the `interviewrs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "available_interviewers" DROP CONSTRAINT "available_interviewers_interviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_interviewer_id_fkey";

-- DropTable
DROP TABLE "interviewrs";

-- CreateTable
CREATE TABLE "interviewres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "interviewres_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "interviewres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_interviewers" ADD CONSTRAINT "available_interviewers_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "interviewres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
