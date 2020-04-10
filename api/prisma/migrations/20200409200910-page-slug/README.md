# Migration `20200409200910-page-slug`

This migration has been generated by Manuel Muñoz Solera at 4/9/2020, 8:09:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Page" ADD COLUMN "slug" text  NOT NULL DEFAULT '';

CREATE UNIQUE INDEX "Page.slug" ON "public"."Page"("slug")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200409200517-scaffold..20200409200910-page-slug
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("POSTGRES_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -17,8 +17,9 @@
 }
 model Page {
   id        String    @default(cuid()) @id
+  slug      String    @unique
   captures  Capture[]
   reports   Report[]
   createdAt DateTime  @default(now())
 }
```

