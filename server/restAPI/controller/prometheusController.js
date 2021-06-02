const fetch = require('node-fetch');
const cmd = require('node-cmd');
const { spawn } = require('child_process')

const prometheusURL = 'http://127.0.0.1:9090/api/v1/'

const prometheusController = {};

/**
 * Install Helm Chart
 * Run Helm Chart to Create Prometheus Deployment inside the K8S Cluster
 * Wait??
 * Check if all the Prometheus Pods are Running?
 */

prometheusController.downloadHelmChart = (req, res, next) => {

}

prometheusController.runHelmChart = (req, res, next) => {

}

// const portPrometheus = (port = 9090) => {
//   if(!/^\d+$/.test(port)) return console.log(`ERROR: ${port} not a valid port number`);

//   const process = spawn('kubectl --namespace=default port-forward deploy/prometheus-server',[port])

//   process.stdout.on('data', data => {
//     console.log(`stdout: ${data}`);
//   })

//   process.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
//   })

//   process.on('close', (code) => {
//     if(code === 1) console.log('PROMETHEUS ALREADY IN USE NUM NUM');
//     console.log(`child process exited with code ${code}`);
//   })  

//   next();
//   }catch(err){
//     console.log(err);
//   }


// }


// const portForwardPrometheus = (req, res, next, port = 9090) => {
//   let command = `kubectl --namespace=default port-forward deploy/prometheus-server ${port}`;
//   let portError = false;
//   cmd.run(command, (err, data, stderr) => {
//     if(stderr){
//       portError = true;
//       console.log(
//       `COULD NOT PORT FORWARD PROMETHEUS.
//       Port ${port} is likely already in use.
//       If this error persists, please kill the port and try again
//       STDERR: ${stderr}`);
//     }
//   });
//   setTimeout(() => { if(!portError) prometheusIsUp(req, res, next)})
// }

// const prometheusIsUp = async (req, res, next) => {
//   let queryStr = prometheusURL +'query?query=up';

//   try{
//     const response = await fetch(queryStr)
//     let body = await response.json();
//     res.locals.query = body;
//     return next()
//   }catch(err){
//     console.log(this);
//     portForwardPrometheus(req, res, next);
//   } 
// }

prometheusController.isUp = async (req, res, next) => {
  let queryStr = prometheusURL +'query?query=up';

  try{
    const response = await fetch(queryStr)
    let body = await response.json();
    res.locals.query = body;
    return next();
  }catch(err){
    next(err)
    // console.log(this);
    // portForwardPrometheus(req, res, next);
  } 
}


prometheusController.portPrometheus = (req, res, next) => {
  // let command = 'kubectl --namespace=default port-forward deploy/prometheus-server 9090';
  // const process = cmd.run(command, (err, data, stderr) => {
  //   if(stderr) console.log(`COULD NOT PORT FORWARD PROMETHEUS.
  //   The port is likely already in use. `)
    
  // });
  try{

  const port = 9090;
  const process = spawn('kubectl', ['--namespace=default', 'port-forward', 'deploy/prometheus-server', '9090'])

  process.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  })

  process.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  })

  process.on('close', (code) => {
    if(code === 1) console.log('PROMETHEUS ALREADY IN USE NUM NUM');
    console.log(`child process exited with code ${code}`);
  })  

  next();
  }catch(err){
    console.log(err);
  }
}

module.exports = prometheusController;