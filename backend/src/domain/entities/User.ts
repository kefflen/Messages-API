class User {
  constructor(
    private id: string,
    private name: string,
    private githubId: number,
    private avatarUrl: string,
    private login: string,
  ) {}
}

export { User }