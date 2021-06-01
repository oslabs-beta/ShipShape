const { SchemaDirectiveVisitor } = require("apollo-server");

// Documentation on implementation of Directives in Apollo Server w/ graphql-tools: 
// https://www.apollographql.com/docs/apollo-server/schema/creating-directives/ 

class PrometheusUpDirective extends SchemaDirectiveVisitor {
  isPrometheusUp = false;
  portAttempts = 0;
  
  visitObject(object){
    object.resolve = () => {
      console.log("HIIIII");
      if(true) return "Hello"
      else throw new Error('Cannot Port Prometheus. Check Server Logs.');
    }
  }

  // create an async child process that will port forward prometheus from inside the cluster
  // if there is an error it will console.log to the server.
  // invokes Prometheus check after half a second. Which will attempt 3 times before giving up and throwing
  portPrometheus(port = 9090){
    if(!/^\d+$/.test(port)) return console.log(`ERROR: ${port} not a valid port number`);

    const process = spawn('kubectl --namespace=default port-forward deploy/prometheus-server',[port])
    this.portAttempts += 1

    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      this.isPrometheusUp = true;
    })

    process.stderr.on('data', (err) => {
      console.log(`stderr: ${err}`);
    })

    process.on('close', (code) => {
      if(code === 1) console.log(`Port ${port} is already in use. Try running the query again. 
                                  If the error persists, kill port 9090 before trying again`);
      else console.log(`child process exited with code ${code}`);
    })

    setTimeout(this.prometheusCheck, 1000);
  }

  async prometheusCheck(){
    if (this.isPrometheusUp) return true;
    if (this.portAttempts > 3) return false;
    let queryStr = prometheusURL +'query?query=up';
    try{
      const response = await fetch(queryStr)
      const check = await response.json(); // this line may be unnecessary
      this.isPrometheusUp = true;
      return true;
    }catch(err){
      console.log('error connecting to prometheus, trying to Port Forward on 9090...');
      this.portPrometheus();
    } 
  } 
}

module.exports = PrometheusUpDirective;