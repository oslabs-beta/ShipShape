/* eslint-disable import/prefer-default-export */
const colors = ['rgb(160, 192, 206)', 'rgb(38,84,121)', 'rgb(207, 225, 232)'];

export function fetchChartData(queryType, hours = 6, step = '2m') {
  console.log(hours);
  const end = new Date();
  const start = new Date(end - 3600000 * hours);

  console.log('start:',start,'end:',end);

  console.log(`fetching data for ${queryType} between ${start.toISOString()} to ${end.toISOString()} stepped by ${step}`);

  const query = `
    {
      ${queryType}(start: "${start.toISOString()}", end: "${end.toISOString()}", step: "${step}"){
        timestamps
        seriesLabels
        seriesValues
      }
    }
    `;

  // console.log(query);
  return fetch('/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((res) => res.json())
    .then(({ data }) => {
      data = data[queryType];
      const labels = data.timestamps;
      const datasets = [];
      data.seriesLabels.slice(0, 10).forEach((label, i) => {
        datasets.push({
          label,
          data: data.seriesValues[i],
          backgroundColor: colors[i],
        });
      });
      return { labels, datasets };
    })
    .catch((err) => console.log(err));
}
