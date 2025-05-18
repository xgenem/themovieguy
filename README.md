# The Movie Guy
- Uses Expo
- Uses expo-router

# Tasks
* [x] - Display Movies & Tv Shows
* [x] - Display details of Movie / TV show on a separate route
* [x] - Play trailer in app

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create local env inside project directory (root) and paste

   ```bash
   touch .env.local
   ```

3. Paste the following details and add your TMDB_ACCESS_TOKEN

   ```environment
   EXPO_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3/
   EXPO_PUBLIC_TMDB_IMG_PATH=https://image.tmdb.org/t/p/w500
   EXPO_PUBLIC_TMDB_ACCESS_TOKEN=
   ```

4. Start the app

   ```bash
   npx expo start
   ```

5. If not in Expo Go, switch to Expo Go by pressing (s) while in the terminal. It should run an iOS Simulator and open the application.