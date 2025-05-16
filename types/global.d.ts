declare global {
  interface Show {
    id: number;
    backdrop_path: string;
    overview: string;
    media_type: string;
    name?: string;
    poster_path: string;
    release_date: string;
    title: string;
  }
}

export {};
