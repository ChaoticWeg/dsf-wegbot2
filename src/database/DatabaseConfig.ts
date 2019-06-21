interface IDatabaseConfig {
    protocol: string;
    username: string;
    password: string;
    url: string;
    dbname: string;
}

export class DatabaseConfig implements IDatabaseConfig {
    public readonly protocol: string = process.env.MONGODB_PROTO || "";
    public readonly username: string = process.env.MONGODB_USER || "";
    public readonly password: string = process.env.MONGODB_PASS || "";
    public readonly url: string = process.env.MONGODB_URL || "";
    public readonly dbname: string = process.env.MONGODB_DBNAME || "";

    public get connectString(): string {
        return `${this.protocol}://${this.username}:${this.password}` +
            `@${this.url}/${this.dbname}`;
    }
}
