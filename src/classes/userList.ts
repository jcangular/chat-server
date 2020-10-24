import User from './user';

export default class UserList {

    private users: User[] = [];

    constructor() { }

    public addUser(user: User): void {
        console.log('[addUser]', user);
        this.users.push(user);
    }

    /**
     * Actualiza el nombre del usuario.
     * @param id es el id del usuario.
     * @param name es el nombre del usuario.
     */
    public updateName(id: string, name: string): void {
        const user = this.users.find(u => u.id === id);
        if (user) {
            user.name = name;
            console.log('[update]', user);
        }
    }

    /**
     * Obtiene el listado de usuarios conectados.
     */
    public getUserList(): User[] {
        return this.users;
    }

    public getUser(id: string): User | null {
        return this.users.find(u => u.id === id) || null;
    }

    public getUserOfRoom(room: string): User[] {
        return this.users.filter(u => u.room === room);
    }

    public deleteUser(id: string): User | null {
        const index = this.users.map(u => u.id).indexOf(id);
        if (index >= 0) {
            return this.users.splice(index, 1)[0];
        }
        return null;
    }

}