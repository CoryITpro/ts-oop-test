import { UserType, MessageType } from "./types"
import { DEFAULT_PROFILE_IMAGE } from "./config"
import { Message } from "./message"
var messagesArr: Message[] = []

abstract class Person {
  private email: string = ""
  private profileImage: string = ""
  protected type: UserType = UserType.Teacher
  id: number = 1
  firstName: string
  lastName: string

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.setEmail(email)
    this.setProfileImage(profileImage)
  }
  getEmail() {
    return this.email
  }
  setEmail(newEmail: string) {
    if (new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(newEmail))
      this.email = newEmail
    else throw new Error()
  }
  getProfileImage() {
    if (this.profileImage) return this.profileImage
    else return DEFAULT_PROFILE_IMAGE
  }
  setProfileImage(newImage: string) {
    if (newImage.toLowerCase().endsWith(".jpg")) this.profileImage = newImage
    else throw new Error("Invalid Image")
  }
  getType() {
    return this.type
  }
  abstract getFullName(): string
  abstract sendMessage(receiver: Person, text: string, type: MessageType): void
}

class Teacher extends Person {
  salutation: string
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string,
    salutation: string
  ) {
    super(id, firstName, lastName, email, profileImage)
    this.type = UserType.Teacher
    this.salutation = salutation
  }
  getFullName() {
    return this.salutation + " " + this.firstName + " " + this.lastName
  }
  sendMessage(receiver: Person, text: string, type: MessageType) {
    let msg = new Message(this, receiver, text, type)
    messagesArr.push(msg)
  }
}

class Student extends Person {
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string
  ) {
    super(id, firstName, lastName, email, profileImage)
    this.type = UserType.Student
  }
  getFullName() {
    return this.firstName + " " + this.lastName
  }
  sendMessage(receiver: Teacher, text: string, type: MessageType) {
    let msg = new Message(this, receiver, text, type)
    messagesArr.push(msg)
  }
}

class Parent extends Person {
  salutation: string
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string,
    salutation: string
  ) {
    super(id, firstName, lastName, email, profileImage)
    this.type = UserType.Parent
    this.salutation = salutation
  }
  getFullName() {
    return this.salutation + " " + this.firstName + " " + this.lastName
  }
  sendMessage(receiver: Teacher, text: string, type: MessageType) {
    let msg = new Message(this, receiver, text, type)
    messagesArr.push(msg)
  }
}

export { Person, Teacher, Student, Parent, messagesArr }
