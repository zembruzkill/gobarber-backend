export default {
  // host: 'smtp.gmail.com',
  // port: 465,
  // auth: {
  //   user: 'zembruzki558@gmail.com',
  //   pass: '91384552',
  // },
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};
