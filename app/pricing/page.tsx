import { api } from '@/convex/_generated/api';
import { currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import React from 'react'
import ProPlanView from './_components/ProPlanView';

async function page() {
    const user = await currentUser();
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || "",
      });
      if (convexUser?.isPro) return <ProPlanView />;
    return (
        <div>

        </div>
    )
}

export default page
