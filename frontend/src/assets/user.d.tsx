export interface Post {
    PostId: number,
    UserId: number,
    MediaFileName: string
    Description: string,
    Timestamp: string
}

export interface Comment {
    CommentId: number,
    UserId: number,
    PostId: number,
    Content:  string,
    Timestamp: string
}

export interface Like {
    LikeId: number,
    UserId: number,
    PostId: number,
    Timestamp: string
}