const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const Client = require('ssh2').Client;
const rimraf = require('rimraf');

// 准备工作：删除 dist 目录
rimraf.sync('dist');

// 执行 npm run build
exec('npm run build', (err, stdout, stderr) => {
  if (err) {
    console.error('打包失败:', err);
    process.exit(1);
  }

  console.log('打包完成:', stdout);

  // 连接服务器
  const conn = new Client();

  conn.on('ready', () => {
    console.log('服务器连接成功');

    // 提示输入账号密码
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('请输入服务器账号: ', (username) => {
      readline.question('请输入服务器密码: ', (password) => {
        readline.close();

        // 备份部署目录
        const deployPath = '/your/deploy/path';
        const backupPath = path.join(deployPath, 'backup', `backup_${Date.now()}`);

        conn.exec(`cp -r ${deployPath} ${backupPath}`, (err, stream) => {
          if (err) throw err;

          stream.on('close', (code, signal) => {
            console.log(`备份完成，备份路径：${backupPath}`);

            // 删除部署目录下所有文件
            conn.exec(`rm -rf ${deployPath}/*`, (err, stream) => {
              if (err) throw err;

              stream.on('close', (code, signal) => {
                console.log('删除部署目录下所有文件完成');

                // 上传 dist 文件夹下所有文件到部署目录
                conn.sftp((err, sftp) => {
                  if (err) throw err;

                  const localPath = path.join(__dirname, 'dist');
                  const remotePath = deployPath;

                  sftp.fastPut(localPath, remotePath, {}, (err) => {
                    if (err) throw err;

                    console.log('文件上传完成');

                    // 关闭连接
                    conn.end();
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  conn.connect({
    host: 'your-server-ip',
    port: 22,
    username: 'your-ssh-username',
    password: 'your-ssh-password'
  });
});

