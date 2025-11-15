import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

interface Url {
  _id: string;
  shortCode: string;
  targetUrl: string;
  clicks: number;
}

export default function DashboardPage() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [targetUrl, setTargetUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<Url | null>(null);
  const [editTarget, setEditTarget] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
  try {
    setLoading(true);
    const { data } = await api.get("/url/codes");
    setUrls(data.data.allUrls || []);
  } catch (err: any) {
    toast.error("Failed to fetch URLs");
    setUrls([]);
  } finally {
    setLoading(false);
  }
};

  const handleShorten = async () => {
    if (!targetUrl) return toast.error("Enter a URL");
    
    try {
      await api.post("/url/shorten", { 
        targetUrl, 
        shortCode: shortCode || undefined 
      });
      setTargetUrl("");
      setShortCode("");
      fetchUrls();
      toast.success("URL shortened!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to shorten URL");
    }
  };

  const handleUpdate = async () => {
    if (!editTarget || !selectedUrl) return;
    
    try {
      await api.patch(`/url/codes/${selectedUrl._id}`, { 
        targetUrl: editTarget 
      });
      setSelectedUrl(null);
      fetchUrls();
      toast.success("URL updated!");
    } catch (err: any) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/url/codes/${id}`);
      setSelectedUrl(null);
      fetchUrls();
      toast.success("URL deleted!");
    } catch (err: any) {
      toast.error("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out");
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(`http://localhost:8000/${code}`);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      
      <div className="flex justify-between items-center px-8 py-5 bg-[#111] border-b border-[#1a1a1a]">
        <h1 className="text-xl font-semibold">ShortURL</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-white text-black rounded-lg hover:bg-[#f2f2f2] transition font-medium"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 px-8 py-8 max-w-5xl mx-auto w-full">
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Shorten a URL</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="Paste your long URL"
              className="flex-1 px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] focus:outline-none focus:border-white placeholder-[#666] text-white"
            />
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="Custom code (optional)"
              className="w-48 px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] focus:outline-none focus:border-white placeholder-[#666] text-white"
            />
            <button
              onClick={handleShorten}
              className="px-6 py-3 bg-white text-black rounded-xl hover:bg-[#f2f2f2] transition font-semibold"
            >
              Shorten
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Your URLs</h2>
          
          {loading ? (
            <div className="text-center py-12 text-[#888]">Loading...</div>
          ) : urls.length === 0 ? (
            <div className="text-center py-12 text-[#888]">
              No URLs yet. Create your first one above!
            </div>
          ) : (
            <div className="space-y-3">
              {urls.map((url) => (
                <div
                  key={url._id}
                  className="p-5 bg-[#111] border border-[#1a1a1a] rounded-xl flex justify-between items-center hover:border-[#2a2a2a] transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-white font-medium">
                        /{url.shortCode}
                      </span>
                      <button
                        onClick={() => copyToClipboard(url.shortCode)}
                        className="text-xs text-[#888] hover:text-white transition"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="text-sm text-[#888] truncate max-w-lg">
                      {url.targetUrl}
                    </div>
                    <div className="text-xs text-[#666] mt-2">
                      {url.clicks} clicks
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedUrl(url);
                      setEditTarget(url.targetUrl);
                    }}
                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-[#f2f2f2] transition font-medium text-sm"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#111] border border-[#1a1a1a] p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6">Edit URL</h2>
            <input
              type="text"
              value={editTarget}
              onChange={(e) => setEditTarget(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black border border-[#2a2a2a] focus:outline-none focus:border-white mb-6 text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUrl(null)}
                className="px-4 py-2 rounded-lg border border-[#2a2a2a] hover:bg-[#1a1a1a] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedUrl._id)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-[#f2f2f2] transition font-medium"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}