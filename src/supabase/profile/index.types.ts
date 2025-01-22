export type FillProfileInfoPayload = {
  id: string;
  full_name?: string | null;
  username?: string | null;
  avatar_url?: string | null;
  gender:
    | "Female"
    | "Male"
    | "Non-Binary"
    | "Prefer Not To Say"
    | null
    | undefined;
  birthday?: Date | null;
};
