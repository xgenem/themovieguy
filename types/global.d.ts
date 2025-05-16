declare global {
  interface Movie {
    id: number;
    title: string;
    name?: string;
    poster_path: string;
  }
}

export {};
