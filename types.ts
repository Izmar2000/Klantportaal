
export enum UserRole {
  ADMIN = 'ADMIN',
  TEAM = 'TEAM',
  CLIENT = 'CLIENT'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Site {
  id: string;
  name: string;
  clientName: string;
  domain: string;
  liveUrl: string;
  previewUrl: string;
  githubRepo: string;
  vercelProject: string;
  status: 'online' | 'maintenance' | 'deploying';
  lastModified: string;
  modules: {
    content: boolean;
    seo: boolean;
    ai: boolean;
  };
}

export interface ChangeRequest {
  id: string;
  siteId: string;
  title: string;
  description: string;
  location: string;
  status: RequestStatus;
  createdAt: string;
}

export interface ContentField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea' | 'image';
  section: string;
}

export interface SEOData {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}
