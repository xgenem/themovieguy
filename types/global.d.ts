export {};
declare global {
  type ShowType = (typeof ShowTypes)[keyof typeof ShowTypes];
  interface Show {
    id: number;
    backdrop_path: string;
    overview: string;
    media_type: ShowType;
    name?: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
  }
}
