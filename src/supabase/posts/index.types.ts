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
  };
  user_id: string | null;
  created_at: string;
  id: number;

  stitched_count: number | null;
};
