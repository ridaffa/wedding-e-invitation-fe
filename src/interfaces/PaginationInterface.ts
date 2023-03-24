import { IGuest } from './GuestInterface';
import { IMessage } from './MessageInterface';
export interface IPagination {
  page: number;
  size: number;
}

export interface IPaginationRes {
  items: IMessage[] | IGuest[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: boolean;
  first: boolean;
  visible: number;
}