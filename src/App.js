import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorBoundary";
import { Box, ThemeProvider, CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./comps/Header/Header";
import { theme } from "./customizedTheme";
import NoPage from "./comps/noMatchRoute/404Page";
const Trending = lazy(() => import("./comps/Trending/Trending"));
const Movies = lazy(() => import("./comps/Movies/Movies"));
const TV = lazy(() => import("./comps/TV/TV"));
const Search = lazy(() => import("./comps/Search/Search"));
const DetailInfo = lazy(() => import("./comps/DetailInfo/DetailInfo"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<CircularProgress />}>
            <Box mt={"55px"}>
              <Routes>
                <Route path="/">
                  <Route index element={<Trending />} />
                  <Route path=":page" element={<Trending />} />
                </Route>
                <Route exact path="movie/:page" element={<Movies />} />
                <Route exact path="tv/:page" element={<TV />} />
                <Route exact path="search" element={<Search />} />
                <Route exact path="info/:type/:id" element={<DetailInfo />} />
                <Route exact path="*" element={<NoPage />} />
              </Routes>
            </Box>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;