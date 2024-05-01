import { MyPosts } from "./my-posts";

export enum SubscriptionType {
    comments = 'comments',
    updates = 'updates',
    likes = 'likes'
  }


export class Subscription {
  id_subs!: number;
  post: MyPosts | null = null;
  type_subs!: SubscriptionType;
    
}
