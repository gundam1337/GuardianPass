import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Simple base64 encoding/decoding for passwords using browser-compatible methods
function encodePassword(password: string): string {
  return btoa(password);
}

function decodePassword(encodedPassword: string): string {
  return atob(encodedPassword);
}

export const createPasswordVaultEntryPersonal = mutation({
  args: {
    websiteName: v.string(),
    username: v.optional(v.string()),
    email: v.optional(v.string()),
    password: v.string(),
    url: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<void> => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Unauthorized");
    }
    
    const userId = identity.subject;
    
    try {
      // Encode the password
      const encodedPassword = encodePassword(args.password);
      
      // Store the password entry
      await ctx.db.insert("passwordVaultPersonal", {
        userId,
        websiteName: args.websiteName,
        username: args.username,
        email: args.email,
        password: encodedPassword,
        url: args.url,
        category: args.category,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error('Encoding error:', error);
      throw new Error(
        `Failed to create password entry: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
});

// Query to get all passwords for a user with decoded passwords
export const getAllPasswords = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Unauthorized");
    }
    
    const userId = identity.subject;
    
    // Get all password entries for this user
    const passwords = await ctx.db
      .query("passwordVaultPersonal")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();
    
    // Decode passwords before returning
    return passwords.map(entry => ({
      ...entry,
      password: decodePassword(entry.password)
    }));
  },
});

// Query to get a single password entry by ID
// export const getPasswordById = query({
//   args: { id: v.id("passwordVaultPersonal") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
    
//     if (!identity) {
//       throw new Error("Unauthorized");
//     }
    
//     const entry = await ctx.db.get(args.id);
    
//     if (!entry) {
//       throw new Error("Password entry not found");
//     }
    
//     if (entry.userId !== identity.subject) {
//       throw new Error("Unauthorized");
//     }
    
//     return {
//       ...entry,
//       password: decodePassword(entry.password)
//     };
//   },
// });