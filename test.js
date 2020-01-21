class Dog {
  constructor(name, bread) {
    this.name = name
    this.bread = bread
  }

  bark = () => {
    return `Bark Bark! My name is ${this.name}`
  }
}
const mini = new Dog('Mini', 'Spitz')
console.log(mini.bark())
