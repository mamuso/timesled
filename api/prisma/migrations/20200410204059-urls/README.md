# Migration `20200410204059-urls`

This migration has been generated by Manuel Muñoz Solera at 4/10/2020, 8:40:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Page" ADD COLUMN "url" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200410182448-scaffold..20200410204059-urls
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
@@ -19,8 +19,9 @@
 model Page {
   id        String    @default(cuid()) @id
   slug      String    @unique
+  url       String
   captures  Capture[]
   reports   Report[]  @relation(references: [id])
   createdAt DateTime  @default(now())
 }
```


