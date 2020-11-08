var form = document.getElementById("greeting");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameInput = document.getElementById("name");
    var person = new Person(nameInput.value);
    var outputSpan = document.getElementById("output");
    outputSpan.innerText = generateGreeting(person);
});
function generateGreeting(person) {
    return "Hello, " + person.name + ", nice to meet you!";
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
