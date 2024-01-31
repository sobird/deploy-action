const fs = require('fs');
const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // conn.forwardOut('192.168.100.102', 8000, '127.0.0.1', 80, (err, stream) => {
  //   if (err) throw err;
  //   stream.on('close', () => {
  //     console.log('TCP :: CLOSED');
  //     conn.end();
  //   }).on('data', (data) => {
  //     console.log('TCP :: DATA: ' + data);
  //   }).end([
  //     'HEAD / HTTP/1.1',
  //     'User-Agent: curl/7.27.0',
  //     'Host: 127.0.0.1',
  //     'Accept: */*',
  //     'Connection: close',
  //     '',
  //     ''
  //   ].join('\r\n'));
  // });

  conn.sftp((err, sftp) => {
    if (err) throw err;

    var readStream = fs.createReadStream( "./package.json" );
    var writeStream = sftp.createWriteStream( "/home/apps/package.json" );

    writeStream.on(
      'close',
      function () {
          console.log( "- file transferred" );
          sftp.end();
          process.exit( 0 );
      }
  );

  // initiate transfer of file
  readStream.pipe( writeStream );

    sftp.readdir('/home/apps', (err, list) => {
      if (err) throw err;
      console.dir(list);
      conn.end();
    });
  });
}).connect({
  host: 'ssh.zhuxian.me',
  port: 22,
  username: 'apps',
  privateKey: fs.readFileSync('/Users/sobird/.ssh/id_rsa'),
  debug: (s) => {console.log(s)}
});

console.log('121212', fs.readFileSync('/Users/sobird/.ssh/id_rsa').toString())