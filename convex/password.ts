import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

//to do add the authentication for the mutation and query
//to add the authentication for teams 

export const createPassword = mutation({
  args: { text: v.string() },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const password = await ctx.db.insert("password", { text: args.text });
    return password;
  },
});

export const getPassword = query({
  args: {},

  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const password = await ctx.db.query("password").collect();
    return password;
  },
});
