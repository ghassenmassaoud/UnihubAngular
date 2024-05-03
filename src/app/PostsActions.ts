import { MyPosts } from "./models/my-posts";

export class PostStatisticsService {

    constructor() { }
  
    calculatePostActionsStatistics(posts: MyPosts[]): Record<string, number> {
      const actionsStatistics: Record<string, number> = {
        like: 0,
        love: 0,
        instructive: 0,
        solution: 0,
        dislike: 0
      };
  
      posts.forEach(post => {
        actionsStatistics['like'] += post.postLikes.filter(like => like.action === 'like').length;
  
        actionsStatistics['love'] += post.postLikes.filter(like => like.action === 'love').length;
  
        actionsStatistics['instructive'] += post.postLikes.filter(like => like.action === 'instructive').length;
  
        actionsStatistics['solution'] += post.postLikes.filter(like => like.action === 'solution').length;
  
        actionsStatistics['dislike'] += post.postLikes.filter(like => like.action === 'dislike').length;
      });
  
      return actionsStatistics;
    }
}
