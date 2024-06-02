-- CreateTable
CREATE TABLE "api" (
    "api_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_pkey" PRIMARY KEY ("api_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "api_client_id_key" ON "api"("client_id");
