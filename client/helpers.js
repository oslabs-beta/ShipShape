const colors = ["rgb(160, 192, 206)", "rgb(38,84,121)", "rgb(207, 225, 232)"];

export function fetchChartData(queryType, hours, step){
    const end = new Date();
    const start = new Date(end - 3600000 * hours)

    console.log(`fetching data for ${queryType} between ${start.toISOString()} to ${end.toISOString()} stepped by ${step}`);

    const query = `
    {
      ${queryType}(start: "${start}", end: "${end}", step: "${step}"){
        timestamps
        seriesLabels
        seriesValues
      }
    }
    `
    
    return fetch("/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        query
      }),
    })
    .then((res) => res.json())
    .then(({ data }) => {
      data = data[queryType];
      const labels = data.timestamps
      const datasets = []
      data.seriesLabels.slice(0,10).forEach((label, i) => {
        datasets.push({
          label: label,
          data: data.seriesValues[i],
          backgroundColor: colors[i],
        });
      })

      return {labels, datasets};
    })
    .catch((err) => console.log(err));
}