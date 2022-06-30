let mylibrary=[];        //array contains all the books
let readBooks=0;         //number of read books


class Book{
    constructor(title, author,pages,rate,isRead){
        this.title = title ;
        this.author=author; 
        this.pages=pages;
        this.rate=rate;
        this.isRead=isRead;  
    }
}

 let addbtn=document.getElementById("add-btn");
addbtn.addEventListener("click",()=>{
    openform();
    search_box.value="";
    search_box2.value="";
})

let newBookCloseBtn=document.getElementById("close-btn-newbook");
newBookCloseBtn.addEventListener("click",()=>{
    closeform();
})

let updateCloseBtn=document.getElementById("close-btn-update");
updateCloseBtn.addEventListener("click",()=>{
    closeUpdateform();
})


///// newbook form /////
let titleinput=document.getElementById("titleinput");
let authorinput=document.getElementById("authorinput");
let pagesinput=document.getElementById("pagesinput");
let rateinput=document.getElementById("rateinput");
let isReadCheckbox=document.getElementById("isRead");
let form=document.getElementById("newBookForm");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let title=titleinput.value;
    let author=authorinput.value;
    let pages=parseInt(pagesinput.value);
    let rate=parseFloat(rateinput.value);
    let isRead= isReadCheckbox.checked ? true :false;
    addBook(title,author,pages,rate,isRead);
})

///// update form /////
let updatedbook="";      //the previous title of the current updated book 
let updatetitleinput=document.getElementById("titleinput-update");
let updateauthorinput=document.getElementById("authorinput-update");
let updatepagesinput=document.getElementById("pagesinput-update");
let updaterror=document.getElementById("error-update");
let updaterateinput=document.getElementById("rateinput-update");
let updateisReadCheckbox=document.getElementById("isRead-update");
let updateform=document.getElementById("update-Form");
updateform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let title=updatetitleinput.value;
    let author=updateauthorinput.value;
    let pages=updatepagesinput.value;
    let rate=updaterateinput.value;
    let isRead= updateisReadCheckbox.checked ? true :false;
 
    if(isInLibrary(title) && title!==updatedbook)
   {
       updaterror.textContent="This book already exists in your library";
   }
   else 
   {
     for(let i=0;i<mylibrary.length;i++)
     {
         if(mylibrary[i].title===updatedbook)
         {
             mylibrary[i].title=title;
             mylibrary[i].author=author;
             mylibrary[i].pages=parseInt(pages);
             mylibrary[i].rate=parseFloat(rate);
             mylibrary[i].isRead=isRead;
             if(isRead===true)
             {
                 readBooks+=1;
             }
             else
             {
                 readBooks-=1;
             }
         }
     } 
    closeUpdateform();
    updateinfo(mylibrary);
    updateBook(updatedbook,title);
   }
 })

 //// search boxes ///////
let search_box=document.getElementById("search-input");
let search_box2=document.getElementById("search-input2");
 search_box.addEventListener("input",(e)=>{   
    if(search_box.value!=" ")
    {
        clearBooksContainer();
        showbooks(sortBooks(mylibrary,search_box.value));
    }
    else
    {
      search_box.value="";
    }
})

search_box2.addEventListener("input",(e)=>{
    if(search_box.value!=" ")
    {
        clearBooksContainer();
        showbooks(sortBooks(mylibrary,search_box2.value));
    }
    else
    {
      search_box.value="";
    }
})

let books_number=document.getElementById("number1");
let read_books_number=document.getElementById("number2");
function updateinfo(library)  //update library information in left container
{
  books_number.textContent=mylibrary.length;
  read_books_number.textContent=readBooks;
}

function updateBook(oldtitle,newtitle)     //update book information in the books container
{
  let title=document.getElementById(`title-${oldtitle}`);
  let author=document.getElementById(`author-${oldtitle}`);
  let rate=document.getElementById(`rate-${oldtitle}`);
  let pages=document.getElementById(`pages-${oldtitle}`);
  let btn=document.getElementById(`isread-${oldtitle}`);

  let book=document.getElementById(oldtitle);

  book.id=newtitle;
  title.id=`title-${newtitle}`;
  author.id=`author-${newtitle}`;
  rate.id=`rate-${newtitle}`;
  pages.id=`pages-${newtitle}`;

  for(let i=0;i<mylibrary.length;i++)
  {
      if(mylibrary[i].title===newtitle)
      {
        title.textContent=mylibrary[i].title;
        author.textContent=mylibrary[i].author;
        rate.textContent=mylibrary[i].rate;
        pages.textContent=mylibrary[i].pages !=="1" ?   `${mylibrary[i].pages} pages` : '1 page';;
        if(mylibrary[i].isRead===true)
        {
            book.style.borderColor="rgb(38, 224, 38)";
        }
        else
        {
            book.style.borderColor="red";
        }
    }
  }
}

let error=document.getElementById("error");
function addBook(title,author,pages,rate,isRead)   //add new book to mylibrary array
{
  if(isInLibrary(title))
  {
     error.textContent="This book already exists in your library";
  }
  else
  {
    mylibrary.push(new Book(title,author,pages,rate,isRead));
    if(isRead===true)
    {
        readBooks+=1;
    }
    Updatebookscontainer(title,author,pages,rate,isRead);
    updateinfo(mylibrary);
    closeform();
  }
}

function isInLibrary(name)
{
    for(let i=0;i<mylibrary.length;i++)
    {
        if(mylibrary[i].title===name)
        {
            return true;
        }
    }
    return false;
}

let bookcontainer=document.getElementById("books-container");
function Updatebookscontainer(booktitle,bookauthor,bookpages,bookrate,isread) //adding bookcard to the bookcontainer 
{
    bookcontainer.appendChild(makeBookCard(booktitle,bookauthor,bookpages,bookrate,isread));

}

function makeBookCard(booktitle,bookauthor,bookpages,bookrate,isread)  
{
    let bookcard=document.createElement("div");

    let title=document.createElement("h1");
    let author=document.createElement("p");
    let pages=document.createElement("p");
    let rate=document.createElement("div");
    let ratediv=document.createElement("div");
    let star=document.createElement("i");
    let deleteicon=document.createElement("i");
    let settingsicon=document.createElement("i");

    title.id=`title-${booktitle}`;
    author.id=`author-${booktitle}`;
    pages.id=`pages-${booktitle}`;
    rate.id=`rate-${booktitle}`;

    deleteicon.id="delete-btn";
    deleteicon.classList.add("bi");
    deleteicon.classList.add("bi-trash");

    settingsicon.id="settings-btn";
    settingsicon.classList.add("bi");
    settingsicon.classList.add("bi-sliders");

    star.id="star";
    star.classList.add("bi");
    star.classList.add("bi-star-fill");


    deleteicon.addEventListener("click",(e)=>{
      deleteBook(e);
    })

    settingsicon.addEventListener("click",(e)=>{
       modifyBook(e);    
    })

    title.textContent=booktitle;
    author.textContent=bookauthor;
    pages.textContent= bookpages!==1 ?   `${bookpages} pages` : '1 page';

    if(isread===false)
    {
        bookcard.style.borderColor="red";
    }
    else
    {
        bookcard.style.borderColor="rgb(38, 224, 38)";
    }


    rate.textContent=bookrate;
    rate.style.display="inline";
    ratediv.appendChild(star);
    ratediv.appendChild(rate);

    ratediv.id="ratediv";

    bookcard.appendChild(settingsicon);
    bookcard.appendChild(deleteicon);
    bookcard.appendChild(title);
    bookcard.appendChild(author);
    bookcard.appendChild(pages);
    bookcard.appendChild(ratediv);

    bookcard.classList.add("book-card");
    bookcard.id=booktitle;

    return bookcard;
}




function modifyBook(e) //open updateform with the book information 
{
    let book=e.target.parentElement;
    updatedbook=book.id;
    openUpdateform();
    book=booksearch(book.id);
    updatetitleinput.value=book.title;
    updateauthorinput.value=book.author;
    updatepagesinput.value=book.pages;
    updaterateinput.value=book.rate;
    
    if(book.isRead===true)
    {
      updateisReadCheckbox.checked=true;    }
    else
    {
      updateisReadCheckbox.checked=false;
    }

}

function booksearch(title)
{
    for(let i=0;i<mylibrary.length;i++)
    {
        if(mylibrary[i].title===title)
        {
           return mylibrary[i];
        }
    }
    return null;
}

let grid=document.getElementById("books-container");
function deleteBook(e)
{
    let book=e.target.parentElement;
    grid.removeChild(book);
  
    for(let i=0;i<mylibrary.length;i++)
    {
        if(mylibrary[i].title===book.id)
        {
            if(mylibrary[i].isRead===true)
            {
                readBooks-=1;
            }
            mylibrary.splice(i, 1);
        }
    }
    updateinfo(mylibrary);
}


function formReset()  //resert form values
{
   error.textContent="";
   titleinput.value="";
   authorinput.value="";
   pagesinput.value="";
   rateinput.value="";
   isReadCheckbox.checked=false;
}

let overlay=document.getElementById("overlay");
function closeform(){
    form.style.display="none";
    overlay.style.display="none";  
    formReset();
}

function openform(){
    form.style.display="flex";
    overlay.style.display="block";
    
}

function openUpdateform()
{
    updateform.style.display="flex";
    overlay.style.display="block";
}

function closeUpdateform(){
    updateform.style.display="none";
    overlay.style.display="none";
    updaterror.textContent="";  
}


function showbooks(array)     //show the given books array in the grid 
{
    let books_container=document.getElementById("books-container");
    for(let i=0;i<array.length;i++)
    {
        books_container.appendChild(makeBookCard(array[i].title,array[i].author,array[i].pages,array[i].rate,array[i].isRead));

    }

}

function clearBooksContainer()          //remove all books from the bookscontainer
{
    let books_container=document.getElementById("books-container");
    let c = books_container.childNodes; 
    let length=c.length;
    for(let i=0;i<length;i++)
    {
        books_container.removeChild(c[0]);
    }  
}

function sortBooks(array,str)    // return books which their  title start with str
{
    sortedArr=[];
  for(let i=0;i<array.length;i++)
  {
      if(array[i].title.substring(0,str.length)===str)
      {
          sortedArr.push(array[i]);
      }
  }
  return sortedArr;
}




