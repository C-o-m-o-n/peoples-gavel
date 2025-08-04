import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { BiFilter } from "react-icons/bi";
import { FaCheck, FaTimes, FaMinus } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

interface LawData {
  id: string;
  serial: string;
  title: string;
  content: string;
  category: "Parliament" | "Senate" | "County";
  userVote: "Yes" | "No" | "Abstained" | null;
  becameLaw: string | null;
  votingResults: {
    representatives: {
      yes: number;
      no: number;
      abstained: number;
    };
    people: {
      yes: number;
      no: number;
      abstained: number;
    };
  };
}

function Law() {
  const [laws, setLaws] = useState<LawData[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("current");

  const router = useRouter();

  // Mock data based on the structure provided
  const mockLaws: LawData[] = [
    {
      id: "1",
      serial: "NA/2024/001",
      title: "Education Reform Law",
      content: "This law overhauls the current educational system by introducing new curricula and teaching methods aimed at enhancing students' critical thinking and problem-solving skills.",
      category: "Parliament",
      userVote: "Yes",
      becameLaw: "12/08/2024",
      votingResults: {
        representatives: { yes: 204, no: 105, abstained: 4 },
        people: { yes: 6000, no: 2000, abstained: 560 }
      }
    },
    {
      id: "2",
      serial: "SB/2024/005",
      title: "Healthcare Improvement Law",
      content: "This law seeks to allocate additional funds to county healthcare systems, focusing on enhancing infrastructure, medical supplies, and staff training.",
      category: "Senate",
      userVote: "Yes",
      becameLaw: "12/08/2024",
      votingResults: {
        representatives: { yes: 204, no: 105, abstained: 4 },
        people: { yes: 6000, no: 2000, abstained: 560 }
      }
    },
    {
      id: "3",
      serial: "CA/2024/012",
      title: "Nairobi Urban Planning and Zoning Law",
      content: "This law updates urban planning regulations to manage Nairobi's growth sustainably. It includes stricter zoning laws, the development of green spaces, and incentives for eco-friendly construction.",
      category: "County",
      userVote: null,
      becameLaw: "12/08/2024",
      votingResults: {
        representatives: { yes: 204, no: 105, abstained: 4 },
        people: { yes: 6000, no: 2000, abstained: 560 }
      }
    }
  ];

  useEffect(() => {
    setLaws(mockLaws);
  }, []);

  const filters = ["All", "Parliament", "Senate", "County"];
  const tabs = [
    { id: "current", label: "Current Laws" },
    { id: "recent", label: "Recent Activity" },
    { id: "comparison", label: "Public vs Representatives" },
    { id: "regional", label: "Representation by Region" }
  ];

  const getVoteIcon = (vote: string | null) => {
    switch (vote) {
      case "Yes":
        return <FaCheck className="text-green-600" size={14} />;
      case "No":
        return <FaTimes className="text-red-600" size={14} />;
      case "Abstained":
        return <FaMinus className="text-gray-600" size={14} />;
      default:
        return null;
    }
  };

  const getVoteColor = (vote: string | null) => {
    switch (vote) {
      case "Yes":
        return "text-green-600 bg-green-50";
      case "No":
        return "text-red-600 bg-red-50";
      case "Abstained":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Parliament":
        return "bg-blue-50 text-blue-700";
      case "Senate":
        return "bg-purple-50 text-purple-700";
      case "County":
        return "bg-orange-50 text-orange-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const VotingResultsCard = ({ law }: { law: LawData }) => (
    <div className="bg-gray-50 rounded-lg p-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Representatives</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-600" size={12} />
                <span className="text-sm">Yes</span>
              </div>
              <span className="text-sm font-medium">{law.votingResults.representatives.yes}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaTimes className="text-red-600" size={12} />
                <span className="text-sm">No</span>
              </div>
              <span className="text-sm font-medium">{law.votingResults.representatives.no}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaMinus className="text-gray-600" size={12} />
                <span className="text-sm">Abstained</span>
              </div>
              <span className="text-sm font-medium">{law.votingResults.representatives.abstained}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">People</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-600" size={12} />
                <span className="text-sm">Yes</span>
              </div>
              <span className="text-sm font-medium">{law.votingResults.people.yes.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaTimes className="text-red-600" size={12} />
                <span className="text-sm">No</span>
              </div>
              <span className="text-sm font-medium">{law.votingResults.people.no.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaMinus className="text-gray-600" size={12} />
                <span className="text-sm">Abstained</span>
              </div>
              <span className="text-sm font-medium">{law.votingResults.people.abstained}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ComparisonView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">NA/2024/001: Education Reform Law</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Nairobi County</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">People</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs">Yes</span>
                    <span className="text-xs font-medium">10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">No</span>
                    <span className="text-xs font-medium">3,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Abstained</span>
                    <span className="text-xs font-medium">800</span>
                  </div>
                  <div className="border-t pt-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-xs">Total</span>
                      <span className="text-xs">14,300</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">MPs</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs">Yes</span>
                    <span className="text-xs font-medium">140</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">No</span>
                    <span className="text-xs font-medium">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Abstained</span>
                    <span className="text-xs font-medium">30</span>
                  </div>
                  <div className="border-t pt-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-xs">Total</span>
                      <span className="text-xs">270</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Parliament</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">People</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs">Yes</span>
                    <span className="text-xs font-medium">10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">No</span>
                    <span className="text-xs font-medium">3,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Abstained</span>
                    <span className="text-xs font-medium">800</span>
                  </div>
                  <div className="border-t pt-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-xs">Total</span>
                      <span className="text-xs">14,300</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">MPs</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs">Yes</span>
                    <span className="text-xs font-medium">140</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">No</span>
                    <span className="text-xs font-medium">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Abstained</span>
                    <span className="text-xs font-medium">30</span>
                  </div>
                  <div className="border-t pt-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-xs">Total</span>
                      <span className="text-xs">270</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "comparison":
        return <ComparisonView />;
      case "regional":
        return (
          <div className="text-center py-12">
            <HiOutlineDocumentText size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Regional Data Coming Soon</h3>
            <p className="text-gray-600">Regional representation data will be available here</p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {laws && laws.length > 0 ? (
              laws.map((law) => (
                <div key={law.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(law.category)}`}>
                        {law.category}
                      </span>
                      {law.userVote && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getVoteColor(law.userVote)}`}>
                          {getVoteIcon(law.userVote)}
                          <span>You voted: {law.userVote}</span>
                        </div>
                      )}
                      {!law.userVote && (
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                          You did not vote
                        </span>
                      )}
                    </div>
                    
                    {law.becameLaw && (
                      <span className="text-xs text-gray-500">
                        Became a law on: {law.becameLaw}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {law.serial}: {law.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {law.content}
                    </p>
                  </div>

                  <VotingResultsCard law={law} />

                  <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 text-[#01C909] border border-[#01C909] rounded-lg hover:bg-[#01C909] hover:text-white transition-colors text-sm">
                      Read more
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <HiOutlineDocumentText size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No laws available</h3>
                <p className="text-gray-600">Check back later for new legislation</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="pt-[60px] lg:pt-[75px] px-4 lg:px-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Laws</h1>
            <p className="text-gray-600">Track current legislation and your voting history</p>
          </div>
          
          <button className="bg-[#01C909] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00a808] transition-colors lg:self-start">
            View All Laws
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search laws by number or title..."
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

        {/* Tab Navigation */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors text-sm ${
                activeTab === tab.id
                  ? "bg-[#01C909] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Tabs (only show for current and recent tabs) */}
        {(activeTab === "current" || activeTab === "recent") && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm ${
                  selectedFilter === filter
                    ? "bg-[#01C909] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}

export default Law;