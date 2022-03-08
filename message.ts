import { UserType, MessageType } from "./types"
import { Person } from "./person"
class Message {
  private sender: Person
  private receiver: Person
  private type: MessageType
  created_at: number
  text: string
  constructor(
    sender: Person,
    receiver: Person,
    text: string,
    type: MessageType
  ) {
    if (
      type == MessageType.System &&
      (sender.getType() != UserType.Teacher ||
        receiver.getType() != UserType.Student)
    ) {
      throw new Error(
        "System messages can only be sent from Teachers and only to Students."
      )
    } else {
      this.sender = sender
      this.receiver = receiver
      this.text = text
      this.type = type
      this.created_at = Date.now()
    }
  }
  getSenderFullName() {
    return this.sender.getFullName()
  }
  getReceiverFullName() {
    return this.receiver.getFullName()
  }
  getFormattedTime() {
    return new Date(this.created_at * 1000).toUTCString()
  }
  getType() {
    return this.type
  }
  setType(newType: MessageType) {
    if (
      newType == MessageType.Manual ||
      (newType == MessageType.System &&
        this.sender.getType() == UserType.Teacher &&
        this.receiver.getType() == UserType.Student)
    ) {
      this.type = newType
    } else {
      throw new Error(
        "System messages can only be sent from Teachers and only to Students."
      )
    }
  }
  setSender(newSender: Person) {
    if (
      this.type == MessageType.System &&
      newSender.getType() != UserType.Teacher
    ) {
      throw new Error("System messages can only be sent from Teachers.")
    } else {
      this.sender = newSender
    }
  }
  setReceiver(newReceiver: Person) {
    if (
      this.type == MessageType.System &&
      newReceiver.getType() != UserType.Student
    ) {
      throw new Error("System messages can only be sent to Students.")
    } else {
      this.sender = newReceiver
    }
  }
}

export { Message }
