export type Notification = {
    id: number;
    message: string;
    type: 'info' | 'success' | 'error' | 'warning';
}
