import React, { useEffect, useState } from 'react';

function App() {
  const [data, setdata] = useState(null);
  const [dataArray, setdataArray] = useState([]);

  useEffect(() => {
    fetch('https://api.exchangeratesapi.io/latest').then((result) => {
      let x = result.json();
      x.then((d) => {
        setdata(d.rates);
      });
    });
  }, []);
  useEffect(() => {
    if (data) {
      Object.keys(data).map((d, k) => {
        setdataArray((old) => [...old, { id: k, name: d, value: data[d] }]);
      });
    }
  }, [data]);

  function change(e, k, value) {
    let x = dataArray.map((d) => {
      if (d.id === k) {
        return { ...d, value: e.target.value };
      } else {
        return { ...d, value: (d.value / value) * e.target.value };
      }
    });
    setdataArray(x);
  }
  return (
    <div>
      {dataArray
        ? dataArray.map((d, k) => (
            <div key={k}>
              <b>{d.name}:</b>
              <input
                type='text'
                value={d.value}
                onChange={(e) => {
                  change(e, k, d.value);
                }}
              />
            </div>
          ))
        : 'Loading'}
    </div>
  );
}

export default App;
