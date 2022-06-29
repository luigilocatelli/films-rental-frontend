import { api } from "boot/axios";

export class RegisterService {
  doRegister(registerRequest) {
    return api.post("/register", registerRequest);
  }
}

export class RegisterRequest {
  constructor(username, password, email, name, surname, address) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.address = address;
  }
}
