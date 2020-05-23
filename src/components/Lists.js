import React, { useState, useEffect } from "react";
import axios from "axios";

function Lists() {
  const [posts, setPosts] = useState([]);
  const [newposts, setNewposts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  // let prevPage = usePrevious(page);
  const LIMIT = 7;
  
  const getPosts = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`)
      .then(res => {
        setNewposts(res.data);
        setPosts([...posts, ...res.data]);
        setIsFetching(false);
      })
  };

  const getMorePosts= () => {
      setPage(page + 1);
      getPosts();
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop  !==
      document.documentElement.offsetHeight
    ) return;
    setIsFetching(true);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
      getPosts();
    },[]);

  useEffect(() => {
    if (!isFetching){
      return;
    }
    if( newposts.length > 0 ){
        getMorePosts();
        console.log("CHECK RE RENDER...");
    }
  }, [isFetching]);
  
  return (
    <div className="App">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <div className="number">{post.id}</div>
          <div className="post-info">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
          </div>
        </div>
      ))}
      {isFetching && newposts.length > 0 && (
        <div style = {{display: "flex", justifyContent:"center"}}>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </div>
      )}
    </div>
  );
 }

export default Lists;
