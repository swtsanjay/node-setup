// import { Models } from '../loaders/mongoose';
// import {
//   Logger,
//   Message,
//   Response,
// } from '../utilities';

// export class UserService {
//   static async getAll() {
//     try {
//       Logger.info('Getting users');

//       let users = await Models.user.findAll({});

//       return {
//         data: users,
//       };
//     } catch (e) {
//       Logger.error('Getting users', e);

//       throw Response.createError(Message.tryAgain, e);
//     }
//   }
// }
