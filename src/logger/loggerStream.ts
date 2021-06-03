import Transport from 'winston-transport';

export default class LoggerStream extends Transport {
  public log(info: string, callback: () => void): void {
    setImmediate(() => {
      this.emit('logged', info);
      process.stdout.write(info);
    });

    callback();
  }
}
