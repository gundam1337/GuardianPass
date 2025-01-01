import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


//to do add the authentication for the mudation and query

export const createPassword = mutation({
  args: { text: v.string() },

  handler: async (ctx, args) => {
    const password = await ctx.db.insert("password", { text: args.text });
    return password;
  },
});

export const getPassword = query({
  args: {},

  async handler(ctx) {
    const identity = ctx.auth.getUserIdentity();
    console.log("identity is ",identity);
    const password = await ctx.db.query("password").collect();
    return password;
  },
});
