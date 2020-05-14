import React, { useState, useEffect } from 'react';

const Lists = ({posts}) => {
  const [listItems, setListItems] = useState(posts.slice(0,20));
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [fetchMoreListItems, isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  function fetchMoreListItems() {
    setTimeout(() => {
        setListItems(prevState => ([...prevState, ...posts.slice(listItems.length, (listItems.length + 20)|| "")]));
        setIsFetching(false);
    }, 2000);
  }
  
  return (
    <>
      <ul className="list-group mb-2">
        {listItems.map((listItem, i) => <li key={i} className="list-group-item"> {listItem.title}</li>)}
      </ul>
      {isFetching && (listItems.length < posts.length) && (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading Loading...</span>
        </div>
      )}
    </>
  );
};

export default Lists;