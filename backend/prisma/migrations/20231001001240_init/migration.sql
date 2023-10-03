-- CreateTable
CREATE TABLE "Interviewer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "Interviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableInterviewer" (
    "id" SERIAL NOT NULL,
    "interviewer_id" INTEGER NOT NULL,
    "day_id" INTEGER NOT NULL,

    CONSTRAINT "AvailableInterviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "student" TEXT NOT NULL,
    "interviewer_id" INTEGER NOT NULL,
    "appointment_id" INTEGER NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);
