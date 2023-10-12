import cluster from 'cluster';
import os from 'os';
import app from './server';

if (cluster.isPrimary) {
  const number_of_cpus = os.cpus().length;

  console.log(`Master ${process.pid} is running`);
  console.log(`Forking Server for ${number_of_cpus} CPUs\n`); // Create a Worker Process for each Available CPU

  for (let index = 0; index <= number_of_cpus; index++) {
    cluster.fork();
  } // When Worker process has died, Log the worker

  cluster.on('exit', (worker, code, signal) => {
    console.log(`\nWorker ${worker.process.pid} died\n`);
  });
} else {
  // if Worker process, master is false, cluster.isWorker is true
  // worker starts server for individual cpus
  // the worker created above is starting server

  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`[server] > app listen on port: ${PORT}`);
  });
}
