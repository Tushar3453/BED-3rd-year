-- DropForeignKey
ALTER TABLE "public"."Tweet" DROP CONSTRAINT "Tweet_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Tweet" ADD CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
