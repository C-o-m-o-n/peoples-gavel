import { discussionsData } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { BiFilter } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";

function Discussions() {
  const [discussions, setDiscussions] = useState<[]>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const router = useRouter();

  const handleGetDiscussions = async () => {
    const res = await fetch("/api/discussions", {
      method: "GET",
    });

    const data = await res.json();
    console.log("data from Discussions", data);
    setDiscussions(data.data);
  };

  useEffect(() => {
    handleGetDiscussions();
  }, []);

  const filters = ["All", "Popular", "Recent", "Following", "Trending"];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="pt-[60px] lg:pt-[75px] px-4 lg:px-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Discussions</h1>
            <p className="text-gray-600">Join conversations about current issues and policies</p>
          </div>
          
          <button className="bg-[#01C909] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00a808] transition-colors lg:self-start">
            Start Discussion
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01C909] focus:border-transparent"
            />
            <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BiFilter size={20} />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === filter
                  ? "bg-[#01C909] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {discussions && discussions.length > 0 ? (
          discussions.map((discussion: discussionsData) => (
            <div key={discussion.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              {/* Discussion Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#01C909] to-[#00a808] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {discussion.author ? discussion.author.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{discussion.author || 'Anonymous User'}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <IoTimeOutline size={14} />
                      <span>{formatTimeAgo(discussion.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <HiOutlineDotsVertical size={20} />
                </button>
              </div>

              {/* Discussion Content */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {discussion.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 leading-relaxed">
                  {discussion.content}
                </p>
              </div>

              {/* Discussion Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                  Policy
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">
                  Healthcare
                </span>
              </div>

              {/* Discussion Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-[#01C909] transition-colors">
                    <FaRegHeart size={16} />
                    <span className="text-sm">24</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-500 hover:text-[#01C909] transition-colors">
                    <FaRegComment size={16} />
                    <span className="text-sm">12</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-500 hover:text-[#01C909] transition-colors">
                    <FaRegBookmark size={16} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 text-[#01C909] border border-[#01C909] rounded-lg hover:bg-[#01C909] hover:text-white transition-colors text-sm">
                    View Discussion
                  </button>
                  <button className="px-4 py-2 bg-[#01C909] text-white rounded-lg hover:bg-[#00a808] transition-colors text-sm">
                    Join Discussion
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRegComment size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No discussions yet</h3>
            <p className="text-gray-600 mb-4">Be the first to start a conversation about current issues</p>
            <button className="bg-[#01C909] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00a808] transition-colors">
              Start First Discussion
            </button>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {discussions && discussions.length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Load More Discussions
          </button>
        </div>
      )}
    </div>
  );
}

export default Discussions;