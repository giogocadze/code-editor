"use client"

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavigationHeader from "../components/NavigationHeader";
import ProfileHeaderSkeleton from "./_components/ProfileHeaderSkeleton";
import ProfileHeader from "./_components/ProfileHeader";
import { motion } from "framer-motion";
import { ListVideo, Star } from "lucide-react";

const TABS = [
    {
      id: "executions",
      label: "Code Executions",
      icon: ListVideo,
    },
    {
      id: "starred",
      label: "Starred Snippets",
      icon: Star,
    },
  ];

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
                <div
                    className="bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-3xl shadow-2xl 
        shadow-black/50 border border-gray-800/50 backdrop-blur-xl overflow-hidden"
                >
                    {/* Tabs */}
                    <div className="border-b border-gray-800/50">
                        <div className="flex space-x-1 p-4">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as "executions" | "starred")}
                                    className={`group flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${activeTab === tab.id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-blue-500/10 rounded-lg"
                                            transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.6,
                                            }}
                                        />
                                    )}
                                    <tab.icon className="w-4 h-4 relative z-10" />
                                    <span className="text-sm font-medium relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ProfilePage
