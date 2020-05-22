import React, { useState, useEffect } from "react";


function Lists() {
  const [posts, setPosts] = useState([]);
  const [freshposts, setFreshposts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 7;

  const getPosts = async () => {
    // setIsFetching(true)
    console.log("api request called....");
    
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    const data = await response.json();
    setFreshposts(data);
    setPosts([...posts, ...data]);
    setIsFetching(false);
    
  };

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  }

  function getMorePosts() {
    // setTimeout(() => {
      setPage(page + 1);
      getPosts();
    // }, 2000);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(
    () => {
      getPosts();
    },[]);

  useEffect(() => {
    if (!isFetching) return;
    if(freshposts.length > 0){
        getMorePosts();
    }
  }, [isFetching]);

 console.log("page :", page);
 console.log("data length: ", freshposts.length);
  
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
      {isFetching && freshposts.length > 0 && (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
 }

export default Lists;
