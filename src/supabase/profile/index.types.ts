export type FillProfileInfoPayload = {
  id: string;
  avatar_url?: string | null;
  full_name?: string | null;
  username?: string | null;
  gender:
    | "Female"
    | "Male"
    | "Non-Binary"
    | "Prefer Not To Say"
    | null
    | undefined;
  birthday?: Date | null;
};
