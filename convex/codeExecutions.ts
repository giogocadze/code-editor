import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveExecutions = mutation({
  args: {
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identy = await ctx.auth.getUserIdentity();

    if (!identy) throw new ConvexError("Not Authethicated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identy.subject))
      .first();

      if(!user?.isPro && args.language !== "javascript") {
        throw new ConvexError("Pro Subscription Required To Use this language")
      }

      await ctx.db.insert("codeExecutions", {
        ...args,
        userId: identy.subject
      })
  }
});
