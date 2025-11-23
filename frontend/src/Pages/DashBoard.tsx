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

  // FOR FETCHING STORED URLS
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

  //FOR SHORTENING URL
  const handleShorten = async () => {
    if (!targetUrl) return toast.error("Enter a URL");

    try {
      await api.post("/url/shorten", {
        targetUrl,
        shortCode: shortCode || undefined,
      });
      setTargetUrl("");
      setShortCode("");
      fetchUrls();
      toast.success("URL shortened!");
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.error || err.response?.data?.message;

      if (status === 429) {
        toast.error(message || "Too many URLs created. Try again later.", {
          duration: 5000,
          icon: "⏱️",
        });
      } else {
        toast.error(message || "Failed to shorten URL");
      }
    }
  };

  // FOR HANDLING UPDATE( EDIT )
  const handleUpdate = async () => {
    if (!editTarget || !selectedUrl) return;

    try {
      await api.patch(`/url/codes/${selectedUrl._id}`, {
        targetUrl: editTarget,
      });
      setSelectedUrl(null);
      fetchUrls();
      toast.success("URL updated!");
    } catch (err: any) {
      toast.error("Update failed");
    }
  };

  // FOR HANDLING DELETE
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

  // FOR HANDLING LOGOUT
 const handleLogout = async () => {
  await api.post("/user/logout");
  navigate("/");
  toast.success("Logged out");
};

  // FOR COPYING TO CLIPBOARD
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(`http://localhost:8000/${code}`);
    toast.success("Copied to clipboard!");
  };

  // FOR COUNTING TOTAL CLICKS ON ALL URL'S COMBINED
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* HEADER */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">URLShortner</div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg transition font-medium text-sm"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* DIV FOR SHOWING STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
                Total Links
              </div>
              <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-white">{urls.length}</div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
                Total Clicks
              </div>
              <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-white">{totalClicks.toLocaleString()}</div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
                Avg per Link
              </div>
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-white">
              {urls.length > 0 ? Math.round(totalClicks / urls.length) : 0}
            </div>
          </div>
        </div>

        {/* DIV FOR CREATING LINK */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Shorten a link</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="Paste a long URL"
              className="flex-1 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="Custom code (optional)"
              className="w-full sm:w-48 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              onClick={handleShorten}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap shadow-lg shadow-emerald-900/50"
            >
              Shorten
            </button>
          </div>
        </div>

        {/* FOR MAPPING THROUGH THE STORED URL'S */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your links</h2>
            <div className="text-sm text-zinc-400">{urls.length} total</div>
          </div>

          {loading ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <div className="text-zinc-400">Loading...</div>
            </div>
          ) : urls.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="text-white font-semibold mb-1">No links yet</div>
              <div className="text-zinc-400 text-sm">Create your first shortened URL above</div>
            </div>
          ) : (
            <div className="space-y-3">
              {urls.map((url) => (
                <div
                  key={url._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="font-mono font-semibold text-emerald-400 text-lg">
                          /{url.shortCode}
                        </div>
                        <button
                          onClick={() => copyToClipboard(url.shortCode)}
                          className="text-sm text-zinc-400 hover:text-white font-medium px-3 py-1 hover:bg-zinc-800 rounded-md transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="text-sm text-zinc-400 truncate mb-2">
                        {url.targetUrl}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                          </svg>
                          <span className="font-semibold text-zinc-400">{url.clicks}</span> clicks
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // SET SELECTED URL VALUE FROM NULL TO THIS PARTICULAR URL WHEN CLICKED
                        // AS SOON AS IT HAS DATA IN IT IT WILL RENDER EDIT MODAL COMPONENT
                        setSelectedUrl(url);
                        // FOR UPDATING THE TARGET URL
                        setEditTarget(url.targetUrl);
                      }}
                      className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg transition font-medium text-sm whitespace-nowrap"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL FOR UPDATING SELECTED URL */}
      {selectedUrl && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Manage link</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-zinc-200 mb-2">
                Destination URL
              </label>
              <input
                type="text"
                value={editTarget}
                onChange={(e) => setEditTarget(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUrl(null)}
                className="px-5 py-2.5 border border-zinc-700 hover:bg-zinc-800 text-white rounded-lg transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedUrl._id)}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
              >
                Delete
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-medium"
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