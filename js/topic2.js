/* 
 *Javascript for topic2.html
 *Objects Creation Funtions, Properties, Methods, Instantiation, Inheritance
 */


// Book1  create object and return message to div in topic2
    const book1 = new Object(); //create object with new keyword.
    book1.title = "Ender's Game"; // property of book1
    book1.pages = 394; // "pages" is the key, "394" is the value
    book1.author = "Orson Scott Card";
    book1.message = function () {
      return this.author + " is a great author.";
    };
    document.getElementById("book1result").innerHTML = "book1.message: " + book1.message();
    
// book2 create object
    const book2 = {name: "Cinder", pages: 254, author: "Marissa Meyer"};
    

// book3 create object and display sale function in div in topic2
    const book3 = {
        name: "The Hobbit",
        pages: 546,
        author: "JRR Tolkien",
        price: 12.99,
        display: function () {
            return this.name + "by " + this.author;

        },
        sale() {
        return (this.price * .8).toFixed(2);
      },
    };
    document.getElementById("book3result").innerHTML = "book3.sale: $" + book3.sale();

// shoe1 create object and display display function to div in topic2
    const shoe1 = new Object(); // create the object
    shoe1.size = 5; // add the properties
    shoe1.color = "black";
    shoe1.type = "dress shoes";
    shoe1.display = function () {
      return "This shoe is available in " + this.color + ", size " + this.size;
    };
    document.getElementById("shoe1").innerHTML = "shoe1.display: " + shoe1.display();

// shoe2 create object
    const shoe2 = {
        size: 7,
        color: "blue",
        quantity: 20};

    // Shoe constructor function     
    const Shoe = function (size, color, type, quantity = 0) {
        this.size = size;
        this.color = color;
        this.type = type;
        this.quantity = quantity;
        this.display = function () {
            return "I have " + this.quantity + " " + this.color + " " + this.type + ".";
      };
    };

// shoe3 and shoe4 create using Shoe function display display function in div
    const shoe3 = new Shoe(10.5, "pink", "ballet slippers", 4);
    const shoe4 = new Shoe(5, "green", "sneakers");
    document.getElementById('shoe3').innerHTML = "shoe3.display(): " + shoe3.display();
    document.getElementById('shoe4').innerHTML = "shoe4.display(): " + shoe4.display();

// Book create Book prototype
    const Book = {
        name: "name",
        author: "author",
        pages: 0,
        rating: 3,
        read() {
          return "Read a book";
        },
        display() {
          return this.name + ", by " + this.author + " is " + this.pages + " pages long.";
        }
    };
    document.getElementById("Book").innerHTML = "Book.display(): " + Book.display();

// book5 Use Book Prototype to create Book object
    const book5 = Object.create(Book);
    book5.name = "The Hunger Games";
    book5.author = "Suzanne Collins";
    book5.rating = 5;
    document.getElementById("book5").innerHTML = "book5.display(): " + book5.display();

