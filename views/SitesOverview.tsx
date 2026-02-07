
import React, { useState } from 'react';
import { Site, UserRole } from '../types';

interface SitesOverviewProps {
  onSelectSite: (id: string) => void;
  userRole: UserRole;
}

const MOCK_SITES: Site[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    clientName: 'TechFlow Inc.',
    domain: 'techflow.io',
    liveUrl: 'https://techflow.io',
    previewUrl: 'https://techflow-preview.vercel.app',
    githubRepo: 'techflow/website',
    vercelProject: 'techflow-io',
    status: 'online',
    lastModified: '2024-03-21T10:40:00Z',
    modules: { content: true, seo: true, ai: true }
  },
  {
    id: '2',
    name: 'Organic Greens',
    clientName: 'Green Life LLC',
    domain: 'organicgreens.com',
    liveUrl: 'https://organicgreens.com',
    previewUrl: 'https://organicgreens-preview.vercel.app',
    githubRepo: 'green-life/organic-greens',
    vercelProject: 'organic-greens',
    status: 'online',
    lastModified: '2024-03-20T14:22:00Z',
    modules: { content: true, seo: true, ai: false }
  },
  {
    id: '3',
    name: 'Syncro Dashboard',
    clientName: 'Syncro Apps',
    domain: 'syncro.app',
    liveUrl: 'https://syncro.app',
    previewUrl: 'https://syncro-preview.vercel.app',
    githubRepo: 'syncro-apps/dashboard',
    vercelProject: 'syncro-dashboard',
    status: 'deploying',
    lastModified: '2024-03-21T09:15:00Z',
    modules: { content: true, seo: true, ai: true }
  },
  {
    id: '4',
    name: 'Urban Architecture',
    clientName: 'Urban Design Group',
    domain: 'urbanarch.nl',
    liveUrl: 'https://urbanarch.nl',
    previewUrl: 'https://urbanarch-preview.vercel.app',
    githubRepo: 'urban-group/arch-web',
    vercelProject: 'urban-arch',
    status: 'online',
    lastModified: '2024-03-18T16:50:00Z',
    modules: { content: false, seo: true, ai: false }
  }
];

const SitesOverview: React.FC<SitesOverviewProps> = ({ onSelectSite, userRole }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    return (localStorage.getItem('nexus-view-mode') as 'grid' | 'list') || 'grid';
  });

  const toggleViewMode = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    localStorage.setItem('nexus-view-mode', mode);
  };

  const filteredSites = userRole === UserRole.CLIENT 
    ? MOCK_SITES.filter(s => s.clientName.includes('TechFlow')) 
    : MOCK_SITES;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Websites</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Beheer en monitor al jouw actieve projecten.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex p-1 bg-gray-200 dark:bg-white/5 rounded-xl border border-gray-300 dark:border-white/5">
            <button 
              onClick={() => toggleViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 shadow-sm text-indigo-600 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              title="Grid View"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => toggleViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-white/10 shadow-sm text-indigo-600 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              title="List View"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {userRole === UserRole.ADMIN && (
            <button className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform active:scale-95">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nieuwe Site
            </button>
          )}
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSites.map((site) => (
            <div 
              key={site.id}
              onClick={() => onSelectSite(site.id)}
              className="group cursor-pointer relative bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-5 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9V3" />
                    </svg>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    site.status === 'online' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                    site.status === 'deploying' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                  }`}>
                    {site.status}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{site.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{site.domain}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="text-[11px] text-gray-400 dark:text-gray-500">
                    Update {new Date(site.lastModified).toLocaleDateString()}
                  </div>
                  <div className="flex -space-x-2">
                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-[#12121a]" src={`https://picsum.photos/seed/${site.id}1/24/24`} alt="avatar" />
                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-[#12121a]" src={`https://picsum.photos/seed/${site.id}2/24/24`} alt="avatar" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-indigo-500/0 group-hover:border-indigo-500/50 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white dark:bg-[#12121a] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-white/2 border-b border-gray-200 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Website</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Klant</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Domein</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Laatste Update</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              {filteredSites.map((site) => (
                <tr 
                  key={site.id} 
                  onClick={() => onSelectSite(site.id)}
                  className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/2 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9V3" />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{site.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                    {site.clientName}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-400 dark:text-gray-500 hidden lg:table-cell">
                    {site.domain}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      site.status === 'online' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                      site.status === 'deploying' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                    }`}>
                      {site.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                    {new Date(site.lastModified).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SitesOverview;
