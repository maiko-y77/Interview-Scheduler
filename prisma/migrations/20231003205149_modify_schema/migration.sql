/*
  Warnings:

  - A unique constraint covering the columns `[appointment_id]` on the table `interviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "interviews_appointment_id_key" ON "interviews"("appointment_id");
