"use client"

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavigationHeader from "../components/NavigationHeader";
import ProfileHeaderSkeleton from "./_components/ProfileHeaderSkeleton";
import ProfileHeader from "./_components/ProfileHeader";

function ProfilePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"executions" | "starred">("executions");

    const userStats = useQuery(api.codeExecutions.getUserStats, {
        userId: user?.id ?? "",
    });

    const starredSnippets = useQuery(api.snippets.getStarredSnippets);

    const {
        results: executions,
        status: executionStatus,
        isLoading: isLoadingExecutions,
        loadMore,
    } = usePaginatedQuery(
        api.codeExecutions.getUserExecutions,
        {
            userId: user?.id ?? "",
        },
        { initialNumItems: 5 }
    );

    const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });
    if (!user && isLoaded) return router.push("/");

    const handleLoadMore = () => {
        if (executionStatus === "CanLoadMore") loadMore(5);
    };
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <NavigationHeader />
            <div className="max-w-7xl mx-auto px-4 py-12">
                {userStats && userData && (
                    <ProfileHeader userStats={userStats} userData={userData} user={user!} />
                )}

                {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}
            </div>
        </div>
    )
}
export default ProfilePage
