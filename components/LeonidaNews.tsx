import React, { useEffect, useState } from 'react';
import { generateLeonidaNews } from '../services/geminiService';
import { NewsHeadline } from '../types';
import { Newspaper, Loader2, RefreshCw } from 'lucide-react';

const LeonidaNews: React.FC = () => {
  const [news, setNews] = useState<NewsHeadline[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(false);
    try {
      const headlines = await generateLeonidaNews();
      setNews(headlines);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-4xl mt-12 mb-8">
        <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-2xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-bold flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-teal-400" />
                LIVE FROM LEONIDA
            </h3>
            <button 
                onClick={fetchNews} 
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition-all border border-white/10 disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                <span>Refresh Feed</span>
            </button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && news.length === 0 ? (
          <div className="col-span-1 md:col-span-3 h-32 flex items-center justify-center bg-black/30 border border-white/5 rounded-lg">
             <div className="flex flex-col items-center gap-2 text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm">Connecting to Weazel News Network...</span>
             </div>
          </div>
        ) : (
          news.map((item, index) => (
            <div 
                key={index} 
                className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border-t-2 border-teal-500 p-4 rounded-b-lg shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-300 group"
            >
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {item.category.toUpperCase()}
                 </span>
                 <span className="text-[10px] text-gray-500">JUST NOW</span>
              </div>
              <p className="text-gray-200 font-medium leading-snug group-hover:text-white transition-colors">
                "{item.headline}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeonidaNews;