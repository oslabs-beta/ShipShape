/* eslint-disable import/prefer-default-export */
const colors = ['rgb(160, 192, 206)', 'rgb(38,84,121)', 'rgb(207, 225, 232)'];

export function fetchChartData(queryType, hours = 6, step = '2m') {
  const end = new Date();
  const start = new Date(end - 3600000 * hours);

  const query = `
    {
      ${queryType}(start: "${start.toISOString()}", end: "${end.toISOString()}", step: "${step}"){
        timestamps
        seriesLabels
        seriesValues
      }
    }
    `;

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
      const result = data[queryType];
      const labels = result.timestamps;
      const datasets = [];
      result.seriesLabels.slice(0, 10).forEach((label, i) => {
        datasets.push({
          label,
          data: result.seriesValues[i],
          backgroundColor: colors[i % colors.length],
        });
      });
      return { labels, datasets };
    })
    .catch((err) => console.log(err));
}
