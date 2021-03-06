import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { intArg, makeSchema, objectType, stringArg } from "@nexus/schema";

import path from "path";
import { type } from "os";

export const Report = objectType({
  name: "Report",
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.current();
    t.model.pages({ type: "Page" });
    t.model.pagecount();
    t.model.captures({ type: "Capture" });
    t.model.createdAt();
  },
});

export const Page = objectType({
  name: "Page",
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.captures({ type: "Capture" });
    t.model.reports({ type: "Report" });
    t.model.reportcount();
    t.model.startsAt();
    t.model.endsAt();
    t.model.createdAt();
  },
});

export const Capture = objectType({
  name: "Capture",
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.url();
    t.model.urlmin();
    t.model.urldiff();
    t.model.diff();
    t.model.diffindex();
    t.model.page({ type: "Page" });
    t.model.report({ type: "Report" });
    t.model.device({ type: "Device" });
    t.model.deviceScaleFactor();
    t.model.createdAt();
  },
});

export const Device = objectType({
  name: "Device",
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.name();
    t.model.specs();
    t.model.deviceScaleFactor();
    t.model.captures({
      type: "Capture",
      ordering: {
        slug: true,
      },
    });
    t.model.createdAt();
  },
});

export const Sparkline = objectType({
  name: "Sparkline",
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.device({ type: "Device" });
    t.model.page({ type: "Page" });
    t.model.data();
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.report();
    t.crud.page();
    t.crud.capture();
    t.crud.device();
    t.crud.sparkline();
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.createOneReport();
    t.crud.createOnePage();
    t.crud.createOneDevice();
    t.crud.createOneCapture();
    t.crud.createOneSparkline();
  },
});

const generateArtifacts = Boolean(process.env.GENERATE_ARTIFACTS);

export const schema = makeSchema({
  types: [Query, Mutation, Report, Page, Capture, Device, Sparkline],
  plugins: [
    nexusSchemaPrisma({
      shouldGenerateArtifacts: generateArtifacts,
      experimentalCRUD: true,
      outputs: {
        typegen: path.join(__dirname, "/generated/prisma-nexus.ts"),
      },
    }),
  ],
  shouldGenerateArtifacts: generateArtifacts,
  outputs: {
    schema: path.join(__dirname, "/../../schema.graphql"),
    typegen: path.join(__dirname, "/generated/nexus.ts"),
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});
