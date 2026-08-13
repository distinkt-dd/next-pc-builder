-- CreateEnum
CREATE TYPE "ComponentType" AS ENUM ('cpu', 'gpu', 'ram', 'ssd', 'motherboard', 'psu', 'case', 'cooler');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "components" (
    "id" TEXT NOT NULL,
    "type" "ComponentType" NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "socket" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "builds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "builds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "build_components" (
    "id" TEXT NOT NULL,
    "build_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "build_components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "build_id" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "build_components_build_id_component_id_key" ON "build_components"("build_id", "component_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_build_id_key" ON "likes"("user_id", "build_id");

-- AddForeignKey
ALTER TABLE "builds" ADD CONSTRAINT "builds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build_components" ADD CONSTRAINT "build_components_build_id_fkey" FOREIGN KEY ("build_id") REFERENCES "builds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build_components" ADD CONSTRAINT "build_components_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_build_id_fkey" FOREIGN KEY ("build_id") REFERENCES "builds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
