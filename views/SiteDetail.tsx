
import React, { useState } from 'react';
import { Site, RequestStatus, ChangeRequest, ContentField, SEOData, UserRole } from '../types';

interface SiteDetailProps {
  siteId: string;
  onBack: () => void;
  userRole: UserRole;
}

const SiteDetail: React.FC<SiteDetailProps> = ({ siteId, onBack, userRole }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'changes' | 'content' | 'seo'>('overview');
  
  // Mock data for the specific site
  const site: Site = {
    id: siteId,
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
  };

  const [requests, setRequests] = useState<ChangeRequest[]>([
    { id: 'r1', siteId, title: 'Update Pricing Section', description: 'Add 2024 tier', location: 'Homepage', status: RequestStatus.IN_PROGRESS, createdAt: '2024-03-19T08:00:00Z' },
    { id: 'r2', siteId, title: 'Fix Header Logo', description: 'Center the logo on mobile', location: 'Global Header', status: RequestStatus.COMPLETED, createdAt: '2024-03-15T12:30:00Z' },
  ]);

  const [contentFields, setContentFields] = useState<ContentField[]>([
    { id: 'c1', label: 'Hero Title', value: 'Innovation Meets Excellence', type: 'text', section: 'Homepage' },
    { id: 'c2', label: 'Hero Subtext', value: 'Crafting future-ready digital experiences for the modern world.', type: 'textarea', section: 'Homepage' },
    { id: 'c3', label: 'Hero Image', value: 'https://picsum.photos/seed/hero/800/400', type: 'image', section: 'Homepage' },
    { id: 'c4', label: 'CTA Button Text', value: 'Get Started', type: 'text', section: 'Homepage' },
  ]);

  const [seo, setSeo] = useState<SEOData>({
    title: 'TechFlow | Modern Web Solutions',
    description: 'TechFlow provides top-tier web development and design services.',
    ogTitle: 'Build Your Digital Future with TechFlow',
    ogDescription: 'Innovating since 2018.'
  });

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ title: '', description: '', location: '' });

  const handleAddRequest = () => {
    const req: ChangeRequest = {
      id: Date.now().toString(),
      siteId,
      ...newRequest,
      status: RequestStatus.PENDING,
      createdAt: new Date().toISOString()
    };
    setRequests([req, ...requests]);
    setIsRequestModalOpen(false);
    setNewRequest({ title: '', description: '', location: '' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{site.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{site.domain}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={site.liveUrl} target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            Visit Site
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all">
            Manage Infrastructure
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-white/5 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'changes', label: 'Changes' },
          { id: 'content', label: 'Content' },
          { id: 'seo', label: 'SEO' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connections</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">GitHub Repository</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{site.githubRepo}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Vercel Project</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{site.vercelProject}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Module Health</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(site.modules).map(([name, active]) => (
                    <div key={name} className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-center">
                      <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">{name}</div>
                      <div className={`text-sm font-semibold ${active ? 'text-green-500' : 'text-gray-400'}`}>
                        {active ? 'ACTIVE' : 'OFF'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-500">View History</button>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== 3 && <div className="absolute top-8 bottom-[-24px] left-4 w-px bg-gray-100 dark:bg-white/5"></div>}
                    <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-medium">Content Update Published</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago • by Admin</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'changes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-indigo-50 dark:bg-indigo-500/5 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-500/10">
              <div className="max-w-xl">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400">Request a Change</h3>
                <p className="text-sm text-indigo-700/70 dark:text-indigo-400/60">Our team (and AI agents) will process your request typically within 2 hours.</p>
              </div>
              <button 
                onClick={() => setIsRequestModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
              >
                New Request
              </button>
            </div>

            <div className="bg-white dark:bg-[#12121a] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-white/2 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                  <tr>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                          req.status === RequestStatus.COMPLETED ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                          req.status === RequestStatus.IN_PROGRESS ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                        }`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{req.title}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{req.location}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{new Date(req.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-[#12121a] p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Managed Content Fields</h3>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Save All Changes</button>
                </div>
                
                <div className="space-y-8">
                  {contentFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex justify-between">
                        {field.label}
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{field.section}</span>
                      </label>
                      {field.type === 'text' && (
                        <input 
                          type="text" 
                          value={field.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            setContentFields(contentFields.map(f => f.id === field.id ? {...f, value: val} : f));
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                        />
                      )}
                      {field.type === 'textarea' && (
                        <textarea 
                          rows={3} 
                          value={field.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            setContentFields(contentFields.map(f => f.id === field.id ? {...f, value: val} : f));
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" 
                        />
                      )}
                      {field.type === 'image' && (
                        <div className="flex flex-col gap-4">
                           <div className="relative aspect-[2/1] rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 group">
                            <img src={field.value} className="w-full h-full object-cover" alt="preview" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-bold shadow-xl">Change Image</button>
                            </div>
                           </div>
                           <p className="text-[10px] text-gray-400">Recommended size: 1200x600px. Format: WEBP/JPG.</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-600/20">
                <h4 className="font-bold text-lg mb-2">Live Preview</h4>
                <p className="text-indigo-100 text-sm mb-6">Preview your content changes in a secure sandbox before publishing.</p>
                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                  Open Preview Sandbox
                </button>
              </div>
              
              <div className="bg-white dark:bg-[#12121a] p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Module Controls</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Content Module</span>
                    <div className="w-10 h-6 bg-indigo-600 rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between opacity-50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Direct Code Access</span>
                    <div className="w-10 h-6 bg-gray-300 dark:bg-white/10 rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#12121a] p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Standard Meta Tags</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Page Title</label>
                    <span className={`text-[11px] font-bold ${seo.title.length > 60 ? 'text-red-500' : 'text-green-500'}`}>
                      {seo.title.length}/60
                    </span>
                  </div>
                  <input 
                    type="text" 
                    value={seo.title}
                    onChange={(e) => setSeo({...seo, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Meta Description</label>
                    <span className={`text-[11px] font-bold ${seo.description.length > 160 ? 'text-red-500' : 'text-green-500'}`}>
                      {seo.description.length}/160
                    </span>
                  </div>
                  <textarea 
                    rows={4} 
                    value={seo.description}
                    onChange={(e) => setSeo({...seo, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-white/5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Open Graph (Social)</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">OG Title</label>
                    <input 
                      type="text" 
                      value={seo.ogTitle}
                      onChange={(e) => setSeo({...seo, ogTitle: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">OG Description</label>
                    <textarea 
                      rows={2} 
                      value={seo.ogDescription}
                      onChange={(e) => setSeo({...seo, ogDescription: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded text-[10px] font-mono opacity-60">Google Search Preview</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">https://techflow.io › solutions</div>
                  <div className="text-xl text-blue-400 hover:underline cursor-pointer truncate font-medium">{seo.title}</div>
                  <div className="text-sm text-gray-300 leading-relaxed line-clamp-2">{seo.description}</div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#12121a] p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white mb-6">SEO Recommendations</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mobile-first indexing check: Passed</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-xs">!</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Meta description could be more specific with keywords like "Performance".</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsRequestModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#12121a] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Submit Modification Request</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">What would you like to change?</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Update Pricing, Change Hero Banner..."
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Where on the site?</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Home, Contact Page, Footer"
                  value={newRequest.location}
                  onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Details & Context</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Describe your request in detail..."
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                ></textarea>
              </div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-white/2 flex justify-end gap-3">
              <button 
                onClick={() => setIsRequestModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRequest}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteDetail;
