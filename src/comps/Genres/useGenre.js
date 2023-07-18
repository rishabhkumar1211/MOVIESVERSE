const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) {
    return "";
  }

  const selectedGeneresIds = selectedGenres.map((sg) => sg.id).join(",");
  return selectedGeneresIds;
};

export default useGenre;
