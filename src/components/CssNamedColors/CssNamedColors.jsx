import { UseFetch } from '../../hooks/useFetch';
import * as d3 from 'd3';

const CssNamedColors = () => {
  const CSVURL = `https://gist.githubusercontent.com/Anieto86/fdb1f57cb2f7436074b5daf574fa868e/raw/CSS%2520named%2520colors%2520-%2520Hoja%25201.csv`;

  const { data, loading, error } = UseFetch(CSVURL);

  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const parseData = d3.csvParse(data);
  const message = `Number of rows: ${parseData.length} , Number of columns: ${parseData.columns.length}, Data size ${Math.round(data?.length / 1024) + ' KB'}`;

  return (
    <>
      <h1>Css Named Colors</h1>
      <pre id="message-container">{message}</pre>
      {/* {parseData.map((dataTables, i) => {
        return (
            <div>
              <p>{dataTables}</p>
            </div>
        )
      })} */}
    </>
  );
};

export default CssNamedColors;
