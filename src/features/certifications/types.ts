export interface CertificationItem {
  id: string;
  number: string;
  year: string;
  organization: string;
  title: string;
  description: string;
  iconClass: string;
  tags: string[];
  credentialUrl?: string;
}
