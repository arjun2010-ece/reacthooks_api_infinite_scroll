import React, {useState, useEffect} from 'react';
import axios from "axios";

const Lists = () => {
      const [page, setPage] = useState(1);
      const [manifestList, setManifestList] = useState([]);
      const [isFetching, setIsFetching] = useState(false);

      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      function getManifests(pageNo){
          axios.get("http://localhost:3002/posts", { params: { _page: pageNo, _limit:20 } }).then(res => {
                console.log("data...", res.data);
                setManifestList([...manifestList, ...res.data]);
                setIsFetching(false);
          });
      }

      useEffect(() => {
        getManifests(page);
      }, []);

      useEffect(() => {
        if (!isFetching){
          return;
        }
        getManifests(page);
        
      }, [isFetching]);

      function handleScroll() {
        if (
          window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight ||
          isFetching
        )
          return;
          console.log("bottom hit...");
          let pageN = page + 1;
          setPage(pageN);
          setIsFetching(true);
      }

  console.log("page Number..", page);
  
  return (
    <div>Arjun and shiva best amigos third..fifth
      <ul className="list-group mb-2">
        {manifestList.map((listItem, i) => <li key={i} className="list-group-item"> {listItem.title}</li>)}
      </ul>
      {/* {isFetching  && (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading Loading...</span>
        </div>
      )} */}
    </div>
  );
};

export default Lists;