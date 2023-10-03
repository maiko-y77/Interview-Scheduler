/*
  Warnings:

  - You are about to drop the `AvailableInterviewer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interviewer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AvailableInterviewer";

-- DropTable
DROP TABLE "Interview";

-- DropTable
DROP TABLE "Interviewer";

-- CreateTable
CREATE TABLE "days" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "day_id" INTEGER NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "id" SERIAL NOT NULL,
    "student" TEXT NOT NULL,
    "interviewer_id" INTEGER NOT NULL,
    "appointment_id" INTEGER NOT NULL,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviewrs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "interviewrs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_interviewers" (
    "id" SERIAL NOT NULL,
    "interviewer_id" INTEGER NOT NULL,
    "day_id" INTEGER NOT NULL,

    CONSTRAINT "available_interviewers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "interviewrs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_interviewers" ADD CONSTRAINT "available_interviewers_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_interviewers" ADD CONSTRAINT "available_interviewers_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "interviewrs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
