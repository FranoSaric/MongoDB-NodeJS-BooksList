const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

router.get('/',(req,res)=>{
    res.render("book/addOrEdit",{
        viewTitle : "Dodaj knjigu"
    });
});

router.post('/',(req,res)=>{
    if(req.body._id == '')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

function insertRecord(req,res){
    var book = new Book();
    book.naziv = req.body.naziv;
    book.autor = req.body.autor;
    book.godina_objave = req.body.godina_objave;
    book.datum_objave = req.body.datum_objave;
    book.cijena = req.body.cijena;
    book.broj_stranica = req.body.broj_stranica;
    book.save((err,doc)=>{
        if(!err)
            res.redirect('book/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("book/addOrEdit",{
                    viewTitle : "Dodaj knjigu",
                    book : req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req,res){
    Book.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err,doc)=>{
        if(!err){
            res.redirect('book/list');
        }else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("book/addOrEdit",{
                    viewTitle : "Dodaj knjigu",
                    book : req.body
                });
            }else{
                console.log('Error during record update: ' + err);
            }
        }
    });
}


router.get('/list',(req,res)=>{
    Book.find((err,docs)=>{
        if(!err){
            res.render("book/list",{
                list: docs        
            });
        }else{
            console.log("Error in retrieving book list: " + err);
        }
    })
});

function handleValidationError(err, body){
   for(field in err.errors){
       switch(err.errors[field].path){
           case 'naziv':
               body['nazivError'] = err.errors[field].message;
               break;
            case 'autor':
                body['autorError'] = err.errors[field].message;
                break;
            case 'godina_objave':
                body['godina_objaveError'] = err.errors[field].message;
                break; 
            case 'datum_objave':
                body['datum_objaveError'] = err.errors[field].message;
                break;       
            case 'cijena':
                body['cijenaError'] = err.errors[field].message;
                break;  
            case 'broj_stranica':
                body['broj_stranicaError'] = err.errors[field].message;
                break;      
            default:
                break;
       }
   }
}

router.get('/:id',(req,res)=>{
    Book.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("book/addOrEdit",{
                vieqTitle: "Uredi knjigu",
                book: doc        
            });
        }
    });
});

router.get('/delete/:id', (req,res)=>{
    Book.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('/book/list');
        }else{
            console.log('Error in book delete : ' + err);
        }
    })
});

module.exports = router;