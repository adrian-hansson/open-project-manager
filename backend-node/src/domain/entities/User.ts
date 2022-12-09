import { Email } from "src/domain/valueObjects/Email";
import { Password as HashedPassword } from "src/domain/valueObjects/HashedPassword";
import { Id } from "src/domain/valueObjects/Id";
import { Username } from "src/domain/valueObjects/Username";

export class User {
    private constructor(
        private id: Id,
        private username: Username,
        private email: Email,
        private password: HashedPassword,
        private isLoggedIn: boolean,
        private timeLastLogin: Date,
        private timeLastActivity: Date
    ) {}

    public login(passwordInPlaintext: string): boolean {
        const hashedPassword = passwordInPlaintext; // TODO: implement actual hashing
        const isPasswordCorrect: boolean = hashedPassword === this.password.value;

        if (isPasswordCorrect) {
            this.isLoggedIn = true;
            this.timeLastLogin = new Date();
            this.timeLastActivity = new Date();
        }

        return isPasswordCorrect;
    }

    public logout(): void {
        this.isLoggedIn = false;
        this.timeLastActivity = new Date();
    }

    public updateEmail(email: string): Email {
        const newEmail: Email = Email.create(email);

        this.email = newEmail;

        return this.email;
    }
}
