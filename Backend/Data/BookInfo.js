
class BookInfo{
    constructor(Title, Author, Publisher , Genre, Rating, DateOfPublication,Stock,Times){
        this.ISBN= generateISBN()

        this.Tilte = Title

        this.Author = Author

        this.Publisher = Publisher

        this.Genre = Genre

        this.Rating = Rating

        this.DateOfPublication = DateOfPublication

        this.Stock= Times


    }

    GetISBN(){

        return this.ISBN
    }
    GetAuthor(){

        return this.Author
    }

    GetTitle(){

        return this.Title
    }


    GetPublisher(){

        return this.Publisher
    }

    GetGenre(){

        return this.Genre
    }

    GetRating(){

        return this.Rating
    }
    GetDateOfPublication(){

        return this.DateOfPublication
    }
    GetStock(){

        return this.Stock
    }


    

}




function generateISBN() {
    // Generate the first 12 digits randomly
    const first12Digits = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
  
    // Calculate the checksum digit
    const checksumDigit = calculateISBNChecksum(first12Digits);
  
    // Combine the first 12 digits with the checksum digit
    const isbn = first12Digits + checksumDigit;
  
    return isbn;
  }
  
  function calculateISBNChecksum(digits) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += (i % 2 === 0) ? parseInt(digits[i]) : parseInt(digits[i]) * 3;
    }
  
    const remainder = sum % 10;
    const checksumDigit = (remainder === 0) ? 0 : 10 - remainder;
  
    return checksumDigit.toString();
  }
  
  // Example usage
  const generatedISBN = generateISBN();



module.exports = { BookInfo } 