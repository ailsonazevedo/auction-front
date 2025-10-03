export interface INotification {
  content: any;
  logId: number;
  read_at: null | string;
  sent_at: string;
  type: string;
  was_read: boolean;
}
