import { User } from '@app/shared/models/user.model';

export class AuthFakeDb {
  public static users: User[] = AuthFakeDb.generateUser();

  public static generateUser(): any {
    return [
      {
        id: '1',
        username: 'trung.luu@logixtek.com',
        email: 'trung.luu@logixtek.com',
        bgPicture: './assets/app/media/fake-img/user/trung-bg-picture.jpg',
        avatar: './assets/app/media/fake-img/user/trung-avatar.jpg',
        firstName: 'Trung',
        lastName: 'Luu'
      },
      {
        id: '2',
        username: 'duy.luong@logixtek.com',
        email: 'duy.luong@logixtek.com',
        bgPicture: './assets/app/media/fake-img/user/trung-bg-picture.jpg',
        avatar:
          'https://avatars3.githubusercontent.com/u/20919879?s=400&u=e3bdd23d532626731848180d7702e06ee7b466d5&v=4',
        firstName: 'Duy ',
        lastName: 'Luong'
      }
    ];
  }
}
