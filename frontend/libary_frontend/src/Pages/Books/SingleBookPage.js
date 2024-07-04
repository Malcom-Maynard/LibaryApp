import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import DefaultPage from '../DefaultPage';
import { useParams } from 'react-router-dom';
import { getCookie } from '../../utlis/Authorization';
import BookComponent from '../SampleBookPage';


export const SingleBookPage = () => {

   
  
  
    return (
      <body>
        
        {<DefaultPage></DefaultPage>}
        {<BookComponent></BookComponent>}
        
        
      </body>
    );
  };
  
  export default SingleBookPage;
  