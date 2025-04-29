import { TaskStatus } from '../../../types/deliver';

export interface TaskItem {
  id: number;
  number: string;
  status: TaskStatus;
  time: string;
  address: string;
  customerName: string;
  phone: string;
  notes: string;
  plan: string;
  weight?: number;
  liter: number;
  dropPointPhotos?: string[];
  actualWeight?: number;
  driverPhotos?: string[];
}

export interface ReportForm {
  issue: string | null;
  otherIssue: string;
  isSubmitted: boolean;
  isCleared: boolean;
  lastSubmitted: {
    issue: string | null;
    otherIssue: string;
  } | null;
}
