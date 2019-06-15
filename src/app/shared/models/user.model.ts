export class User {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  id: string;
  username: string;
  email: string;
  bgPicture: string;
  avatar: string;
  firstName: string;
  lastName: string;

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================
  constructor() {
  }

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  clear() {
    this.id = '';
    this.username = '';
    this.email = '';
    this.bgPicture = '';
    this.avatar = '';
    this.firstName = '';
    this.lastName = '';
  }
}
