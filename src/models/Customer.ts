export default class Customer {
  private firstName: string;
  private lastName: string;
  private documentation: string;

  //we need to make properties private in order to not have problems with other classes for example if another class has a firstName there could be a clash

  //we also need to make them public for public user for example we are exporting these properties to the Order entity

  constructor(firstName: string, lastName: string, documentation: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.documentation = documentation;
  }

  getFirstName() {
    return this.firstName;
  }
  //this is an example of a getter which means it gets information from an object

  getLastName() {
    return this.lastName;
  }

  getDocumentation() {
    return this.documentation;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  setDocumentation(documentation: string) {
    this.documentation = documentation;
  }

  //examples of setters which are used to update information
}
