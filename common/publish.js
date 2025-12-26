const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter your npm OTP code: ', (otp) => {
  if (!otp) {
    console.error('OTP code is required.');
    rl.close();
    return;
  }

  // Use JSON.stringify to safely handle the package name
  const packageName = JSON.parse(require('fs').readFileSync('package.json', 'utf8')).name;
  const publishCommand = `npm publish --otp=${otp}`;

  console.log(`Running: ${publishCommand}`);

  const child = exec(publishCommand, { cwd: __dirname });

  child.stdout.on('data', (data) => {
    console.log(data);
  });

  child.stderr.on('data', (data) => {
    console.error(data);
  });

  child.on('close', (code) => {
    console.log(`npm publish process exited with code ${code}`);
    rl.close();
  });
});
