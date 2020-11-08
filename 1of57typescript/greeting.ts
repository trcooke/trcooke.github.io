const form = document.getElementById("greeting");

form.addEventListener("submit", function ( event ) {
    event.preventDefault();
    var nameInput = document.getElementById("name") as HTMLInputElement
    var person = new Person(nameInput.value);

    var outputSpan = document.getElementById("output") as HTMLSpanElement
    outputSpan.innerText = generateGreeting(person)
})

function generateGreeting(person: Person) {
    return "Hello, " + person.name + ", nice to meet you!"
}

class Person {
    constructor(public name: string) {
    }
}