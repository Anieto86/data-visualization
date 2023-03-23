import { UseFetch } from '../../hooks/useFetch';

const CssNamedColors = () => {
  const URL = `https://gist.githubusercontent.com/Anieto86/fdb1f57cb2f7436074b5daf574fa868e/raw/CSSNamedColors.csv`;

  const { data, loading, error } = UseFetch(URL);

  return (
    <>
      {error && `error...`}
      <h1>CssNamedColors</h1>
      {loading && <h2>Loading...</h2>}
      <p>{data}</p>
    </>
  );
};

export default CssNamedColors;
