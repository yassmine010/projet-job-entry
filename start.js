const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
function runCommand(command, cwd, waitTime = 0) {
  return new Promise((resolve) => {
    console.log(`:fusée: Starting: ${command} in ${cwd}`);
    // Vérifier si le dossier existe
    if (!fs.existsSync(cwd)) {
      console.error(`:x: Directory ${cwd} not found!`);
      process.exit(1);
    }
    const child = spawn(command, [], {
      shell: true,
      cwd: path.resolve(cwd),
      stdio: 'inherit'
    });
    // Attendre que le processus soit bien lancé
    setTimeout(() => {
      resolve(child);
    }, waitTime * 1000);
  });
}
async function startAll() {
  try {
    console.log(' Starting backend...');
    await runCommand('npm start', 'backend', 8);
    console.log(' Starting frontend candidat...');
    await runCommand('npm start', 'frontend-candidat', 10);
    console.log('Starting frontend recreteur...');
    await runCommand('npm start', 'mon-projet', 10);
    console.log(' All services started sequentially!');
  } catch (error) {
    console.error(' Error starting services:', error);
  }
}
startAll();