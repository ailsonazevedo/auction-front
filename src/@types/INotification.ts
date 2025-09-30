export interface INotification {
  action: string;
  links: Array<{ [key: string]: any }>;
  logId: number;
  message_content: string;
  message_title: string;
  read_at: null | string;
  recipient_id: string;
  sent_at: string;
  was_read: boolean;
}
