import winston from 'winston';
import moment from 'moment';

export default function getLogger(label) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        timestamp: function timestamp() {
          return moment().format('HH:mm:ss');
        },
        colorize: true,
        level: 'info',
        label,
      })
    ]
  });
}
