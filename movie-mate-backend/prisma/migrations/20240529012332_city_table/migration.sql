-- CreateTable
CREATE TABLE "city" (
    "city_id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "city_city_key" ON "city"("city");
