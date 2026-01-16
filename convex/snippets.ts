import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const identy = await ctx.auth.getUserIdentity();
    if (!identy) throw new Error("user not authenthicated");

    identy.na

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identy.subject))
      .first();

    if (!user) throw new Error("User not found");

    const snippetId = await ctx.db.insert("snippets" , {
        userId: identy.subject,
        userName : user.name, 
        title : args.title,
        language : args.language,
        code : args.code,

    })

    return snippetId
  },
});
