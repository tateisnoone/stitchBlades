export type PostInfoPayload = {
  title: string | null;
  description: string | null;
  image_url: string | null;
  category:
    | "Punk"
    | "Gothic"
    | "Grunge"
    | "Emo"
    | "Steampunk"
    | "Cyberpunk"
    | "Vintage/Retro"
    | "Cottagecore"
    | "Fairycore"
    | "Y2K"
    | "Casual"
    | "K-Fashion"
    | "Anime"
    | "Fantasy"
    | "Medieval"
    | null;
  profiles: {
    username: string | null;
  };
};
export type Post = {
  title: string | null;
  description: string | null;
  image_url: string | null;
  category:
    | "Punk"
    | "Gothic"
    | "Grunge"
    | "Emo"
    | "Steampunk"
    | "Cyberpunk"
    | "Vintage/Retro"
    | "Cottagecore"
    | "Fairycore"
    | "Y2K"
    | "Casual"
    | "K-Fashion"
    | "Anime"
    | "Fantasy"
    | "Medieval"
    | null;
  profiles: {
    username: string | null;
  } | null;
  user_id: string | null;
  created_at: string;
  id: number;

  stitched_count: number | null;
};

export type CategoryType =
  | "Punk"
  | "Gothic"
  | "Grunge"
  | "Emo"
  | "Steampunk"
  | "Cyberpunk"
  | "Vintage/Retro"
  | "Cottagecore"
  | "Fairycore"
  | "Y2K"
  | "Casual"
  | "K-Fashion"
  | "Anime"
  | "Fantasy"
  | "Medieval";

export type PostComment = {
  id: number;
  created_at: string;
  post_id: number;
  user_id: string | null;
  comment_text: string | null;
  profiles: {
    username: string | null;
  } | null;
};
export type Stitches = {
  id: number;
  created_at: string;
  stitched_by: string | null;
  stitched_post: number | null;
};
