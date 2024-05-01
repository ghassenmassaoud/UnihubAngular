import { MyPosts } from "./models/my-posts";

export class PostStatisticsService {

    constructor() { }
  
    calculatePostActionsStatistics(posts: MyPosts[]): Record<string, number> {
      // Initialiser le compteur pour chaque action de publication
      const actionsStatistics: Record<string, number> = {
        like: 0,
        love: 0,
        instructive: 0,
        solution: 0,
        dislike: 0
      };
  
      // Parcourir chaque publication pour compter les actions
      posts.forEach(post => {
        // Compter les likes
        actionsStatistics['like'] += post.postLikes.filter(like => like.action === 'like').length;
  
        // Compter les loves
        actionsStatistics['love'] += post.postLikes.filter(like => like.action === 'love').length;
  
        // Compter les instructives
        actionsStatistics['instructive'] += post.postLikes.filter(like => like.action === 'instructive').length;
  
        // Compter les solutions
        actionsStatistics['solution'] += post.postLikes.filter(like => like.action === 'solution').length;
  
        // Compter les dislikes
        actionsStatistics['dislike'] += post.postLikes.filter(like => like.action === 'dislike').length;
      });
  
      return actionsStatistics;
    }
}
