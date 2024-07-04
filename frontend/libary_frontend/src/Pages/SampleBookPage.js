import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Ratings from './Ratings';



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
  
  useEffect(() => {
    console.log("the name of the current book: "+pageId)
    var RequestURL ="http://localhost:3001/BookInfo/ISBN/"+pageId;
    axios.get(RequestURL)
      .then(response => {
        console.log(response.data.Rating)
        setGenre(response.data.Genre)
        setTitle(response.data.Title)
        setRating(response.data.Rating)
        setPublication(response.data.DateOfPublication.split("T")[0])
        setStock(response.data.StockOfBooks)
        setISBN(response.data.ISBN)
        setAuthor(response.data.Author)

        console.log("Rating: "+Rating)
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  return (
    <div className={`${sharedClasses.flex} ${sharedClasses.flexRow} ${sharedClasses.p4}`}>
      <div className={`${sharedClasses.flexShrink} ${sharedClasses.mb4} ${sharedClasses.ml4}`}>
       
      </div>
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
          <button className={`${sharedClasses.bgSecondary} ${sharedClasses.textSecondaryForeground} ${sharedClasses.hoverSecondary} ${sharedClasses.py2} ${sharedClasses.px4} ${sharedClasses.mr2}`}>
            Hardcover $43.99
          </button>
          <button className={`${sharedClasses.bgSecondary} ${sharedClasses.textSecondaryForeground} ${sharedClasses.hoverSecondary} ${sharedClasses.py2} ${sharedClasses.px4}`}>
            Kobo eBook $16.99
          </button>
        </div>
       
        
      </div>
    </div>
  );
};

export default BookDetails;
