import { useEffect, useState } from 'react';

export const UseFetch =  (URL) => {

  const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(URL)
      .then((res) => res.text())
      .then((data) => setData(data))
      .catch((err) => setError(err))
			.finally(()=> setLoading(false))
  }, []);

	return {data, loading, error}
}

