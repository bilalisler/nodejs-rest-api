'use strict';

var fs = require('fs');
var validator = require('validator');

var books = JSON.parse(fs.readFileSync(__dirname + '/../data/books.js', 'utf8'));

const BookService = {
    checkBook(bookId) {
        let response = null;
        for (const[index,book] of Object.entries(books)){
            if(book.id === parseInt(bookId)){
                response = books[index]
            }
        }
        return response;
    },

    list(){
        return books;
    },
    
    validate(params){
        let errors = [];
        if(!params.hasOwnProperty('id')){
            errors.push("Field 'id' is required");
        }
        if(!params.hasOwnProperty('title')){
            errors.push("Field 'title' is required");
        }
        if(!params.hasOwnProperty('author')){
            errors.push("Field 'author' is required");
        }

        if(errors.length === 0){
            if(validator.isEmpty(params.id.toString())){
                errors.push("Field 'id' could not be empty");
            }
            if(validator.isEmpty(params.title)){
                errors.push("Field 'title' could not be empty");
            }
            if(validator.isEmpty(params.author)){
                errors.push("Field 'author' could not be empty");
            }

            for (const[index,book] of Object.entries(books)){
                if(book.author === params.author){
                    errors.push('Another book with similar author already exists.');
                }
                if(book.id === parseInt(params.id)){
                    errors.push('Another book with similar id already exists.');
                }
                if(book.title === params.title){
                    errors.push('Another book with similar title already exists.');
                }
            }
        }

        return errors;
    }
};

module.exports = BookService;