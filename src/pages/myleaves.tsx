import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContextProvider";

interface Leave {
  id: string;
  fromDate: string;
  toDate: string;
  reason: string;
  isApproved: boolean;
}

export default function MyLeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:5000/leaves/myleaves", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLeaves(response.data);
      } catch (error: any) {
        console.error("Error fetching leaves", error);
        setError(error?.response?.data?.error || "Failed to fetch leaves.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchLeaves();
    }
  }, [token]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-stone-900">
        <p className="text-xl text-stone-300">Loading your leaves...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-stone-900">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 to-stone-900 p-6">
      <h1 className="text-4xl font-bold text-center text-stone-200 mb-8">
        My Leaves
      </h1>

      {leaves.length === 0 ? (
        <p className="text-center text-stone-400 text-lg">No leaves applied yet.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {leaves.map((leave) => (
            <div
              key={leave.id}
              className="bg-stone-800/70 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:bg-stone-700/70 transition transform hover:-translate-y-1 border border-stone-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-stone-200">
                  {leave.isApproved ? "Approved ✅" : "Pending ⏳"}
                </h2>
              </div>
              <div className="text-stone-400 text-md">
                <p>
                  <span className="font-medium text-stone-300">From:</span> {formatDate(leave.fromDate)}
                </p>
                <p>
                  <span className="font-medium text-stone-300">To:</span> {formatDate(leave.toDate)}
                </p>
                <p className="mt-2">
                  <span className="font-medium text-stone-300">Reason:</span> {leave.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
