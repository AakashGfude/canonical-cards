import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardComponent from './Card/Card.js';
import './App.css'; // For styling
import './style.css'

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              // Replace with your API
              const result = await axios('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json');
              setData(result.data);
          } catch (error) {
              console.error("Error fetching data: ", error);
          }
      };

      fetchData();
  }, []);

    const filterAuthors = (author, authorId) => {
        const authorArray =  author.filter((item) => item.id === authorId)
        return authorArray.map((item) => item.name).join(', ')
    }

    const filterTopicsAndCategories = (arr, idArr) => {
        const result =  arr.map((item) => { 
          const names = []
          item.forEach((i) => {
             if(idArr.includes(i.id)) {
                names.push(i.name)
             }; 
          })
          return names.join(', ')
        })
        return result.join('')
    }
  
    return (
      <div className="App">
        <div className="card-container">
          {data.slice(0, 3).map((item, index) => {
          const authors = filterAuthors(item._embedded.author, item.author)
            const topic = filterTopicsAndCategories(item._embedded['wp:term'], item.topic)
            const category = filterTopicsAndCategories(item._embedded['wp:term'], item.categories)
            const myProps = {
              title: item.title.rendered,
              link: item.link,
              category: category,
              topic: topic,
              author: authors,
              date: item.modified,
              imageUrl: item.featured_media
            }
            return (  
              <CardComponent key={index}  {...myProps}/>
            )
            }
          )}
        </div>
      </div>
    );

}

export default App;