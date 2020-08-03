process.stdin.on('data', (data) =>
  process.stdout.write(data.toString().trim().split('').reverse().join('').concat('\n'))
);
