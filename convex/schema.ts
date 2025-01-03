

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    passwordVaultPersonal: defineTable({
      userId: v.string(),
      category: v.optional(v.string()), // Dropdown category field
      websiteName: v.string(), // "Website Name" field
      email: v.optional(v.string()), // "Email" field (Optional)
      username: v.optional(v.string()), // "Username" field (Optional)
      password: v.string(), // Encrypted password
      url: v.optional(v.string()), // "URL" field (Optional)
      createdAt: v.number(),
    }),
  });


//   passwordVaultTeam: defineTable({
//     teamId: v.id("teams"),
//     category: v.optional(v.string()), // Dropdown category field
//     websiteName: v.string(), // "Website Name" field
//     email: v.optional(v.string()), // "Email" field (Optional)
//     username: v.optional(v.string()), // "Username" field (Optional)
//     password: v.string(), // "Password" field
//     url: v.optional(v.string()), // "URL" field (Optional)
//     createdAt: v.number(),
//   }),