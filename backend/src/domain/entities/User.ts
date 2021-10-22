class User {
  constructor(
    public id: string,
    public name: string,
    public github_id: number,
    public avatar_url: string,
    public login: string,
  ) {}
}

export { User }