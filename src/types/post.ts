export interface PostType {
  postId: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

export interface DetailPostType {
  postId: number;
  createdAt: string;
  writer: string;
  title: string;
  content: string;
  likeCount: number;
  hasLiked: boolean;
  images: string[];
}

export interface CommentType {
  commentId: number;
  createdAt: string;
  writer: string;
  content: string;
  likeCount: number;
  hasLiked: false;
  replies: ReplyType[];
}

export interface ReplyType {
  commentId: number;
  createdAt: string;
  writer: string;
  content: string;
  likeCount: number;
  hasLiked: false;
}
