import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useParams,useNavigate  } from 'react-router-dom';
import Ratings from './Ratings';
import {getCookie} from '../utlis/Authorization'



const sharedClasses = {
  flex: 'flex',
  flexCol: 'flex flex-col',
  flexRow: 'flex flex-row',
  flexShrink: 'flex-shrink-0',
  flexGrow: 'flex-grow',
  itemsCenter: 'items-center',
  textSm: 'text-sm',
  textMd: 'text-md',
  textLg: 'text-lg',
  textXl: 'text-xl',
  text2xl: 'text-2xl',
  fontBold: 'font-bold',
  mb2: 'mb-2',
  mb4: 'mb-4',
  ml2: 'ml-2',
  ml4: 'ml-4',
  mr2: 'mr-2',
  py2: 'py-2',
  px4: 'px-4',
  underline: 'underline',
  block: 'block',
  borderT: 'border-t',
  pt4: 'pt-4',
  bgAccent: 'bg-accent',
  p2: 'p-2',
  textAccentForeground: 'text-accent-foreground',
  textPrimary: 'text-primary',
  textSecondaryForeground: 'text-secondary-foreground',
  hoverSecondary: 'hover:bg-secondary/80',
  bgSecondary: 'bg-secondary',
  textYellow500: 'text-yellow-500',
  textMutedForeground: 'text-muted-foreground',
};

const BookDetails = () => {
  const { pageId } = useParams();
  const [Author, setAuthor] = useState([]); 
  const [Genre, setGenre] = useState([]); 
  const [Title, setTitle] = useState([]);
  const [ISBN, setISBN] = useState([]);
  const [Rating, setRating] = useState([]);
  const [Publication, setPublication] = useState([]);
  const [Stock, setStock] = useState([]);
  const [Image, setImage] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("the name of the current book: " + pageId);
        const RequestURL = "http://localhost:3001/BookInfo/ISBN/" + pageId;
        const response = await axios.get(RequestURL);
        console.log(response.data.Rating);
        setGenre(response.data.Genre);
        setTitle(response.data.Title);
        setRating(response.data.Rating);
        setPublication(response.data.DateOfPublication.split("T")[0]);
        setStock(response.data.StockOfBooks);
        var  ISBN_FROM_RESPONSE =  response.data.ISBN
        console.log("ISBN_FROM_RESPONSE : ",ISBN_FROM_RESPONSE)
        setISBN(ISBN_FROM_RESPONSE);
        
        setAuthor(response.data.Author);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [pageId]);



  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        console.log("the name of the current book: " + pageId);
        const RequestURL = "http://localhost:3001/BookInfo/ISBN/" + pageId;
        const response_ISBN = await axios.get(RequestURL);

        var ISBN_Image = response_ISBN.data.ISBN

        console.log("Getting Image for the displaying book "+Title +" ISBN: "+ ISBN_Image)
        var RequestURL_Image ="http://localhost:3001/BookCover/Images/Single/"+ISBN_Image;
        const response = await axios.get(RequestURL_Image);
        console.log("Data from image getting in SampleBookPage "+response.data[0].EncodedString )

        setImage(response.data[0].EncodedString)
        
      }
      catch (error) {
        console.error('Error:', error);
      }

      
}
fetchData();
}


,[])

const AddToBasket = ( ) =>{
  

  var UserEmail = getCookie("Email");
  
  var CurrentBasket = JSON.parse(localStorage.getItem(UserEmail));

  console.log("Basket value at the start of function ", CurrentBasket)

  if( CurrentBasket===null ){
    console.log("No basket")
    CurrentBasket = []
  }
  
  if(Stock <=0){
    
    return alert("Sorry there are no more books in Stock. Please check again later")
  }

  
  setStock(Stock-1)
  var BookDataToBasket = {Title: Title,
    Author: Author, ISBN:ISBN , Quanity: 1
  }

  
  var  InBasket= (CurrentBasket) =>{
    
    for (var Item in CurrentBasket){
      console.log("Item in the forloop ",CurrentBasket[Item].ISBN)
      if (CurrentBasket[Item].ISBN == ISBN) {
        CurrentBasket[Item].Quanity+=1
          return true
      }
    }

    return false

  }

  

  var result = InBasket(CurrentBasket)
  console.log("result ",result)

  if (result!=true){

    CurrentBasket.push(BookDataToBasket )
  }

  

  

  //Username{ISBN,Title, Author, Quanity}

  
  localStorage.setItem(UserEmail,JSON.stringify(CurrentBasket))
  
  return alert("Item added to the cart")
  

}
    
    
      
const divStyle = {
  width: '500px', // Adjust the width as needed
  transform: 'scale(1.5)'
};

    
  

  return (

    
    <div className={`${sharedClasses.flex} ${sharedClasses.flexRow} ${sharedClasses.p4}`} style={divStyle}>
      <img  class = 'bookCover-Single'src ={`data:image/jpeg;base64,${Image}`} alt="fuck off"></img>
    
    
      <div className={sharedClasses.flexGrow}>
        

        <h1 className={`${sharedClasses.text2xl} ${sharedClasses.fontBold} ${sharedClasses.mb2}`}>
        {Title}
        </h1>
        
        <p className={sharedClasses.textMutedForeground}>{Author}</p>
        <p className={sharedClasses.textMutedForeground}>Genre: {Genre}</p>
        <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.mb4}`}>
          <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.textYellow500}`}>
            
            <div className ='StarContainer'></div>
            <Ratings rating={Rating} ></Ratings>
          </div>
          <span className={`${sharedClasses.ml2} ${sharedClasses.textMutedForeground}`}>(1)</span>
          <span className={`${sharedClasses.ml4} ${sharedClasses.textMutedForeground}`}>Publication Date: {Publication}</span>
        </div>
        <div className={`${sharedClasses.text2xl} ${sharedClasses.fontBold} ${sharedClasses.mb2}`}>Stock: {Stock}</div>
        <div className={`${sharedClasses.bgAccent} ${sharedClasses.p2} ${sharedClasses.mb4}`}>
          
        </div>
        <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.mb4}`}>
          <button id ='BasketButton'className={`${sharedClasses.bgSecondary} ${sharedClasses.textSecondaryForeground} ${sharedClasses.hoverSecondary} ${sharedClasses.py2} ${sharedClasses.px4} ${sharedClasses.mr2}`} onClick={AddToBasket}>
           Add To basket 
          </button>
          
        </div>
       
        
      </div>
    </div>
  );
};

export default BookDetails;
