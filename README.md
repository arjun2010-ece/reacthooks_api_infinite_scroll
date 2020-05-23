This is an amazing project with following features::

1. Infinite loading of data with react hooks.
2. Endpoint data is used.
3. when page is scrolled at the bottom then a loading spinner is shown and after 2 second page gets reloaded.
4. At any point if page is refreshed then scrollbar moves to the top.



This is an amazing project with react hooks.
Learnings are:

1. detect page refresh.
2. how to put scrollbar to the top
3. how to detect when you have scrolled to the bottom.



A. detect page refresh::
   
   First way but not so feasible, we can give it a try::
   
   if (window.performance) {
      if (performance.navigation.type === 1) {}
   }
   When navigation.type === 1, meaning page is refresh. And this code should be in react constructor.
 
 constructor(props){
    super(props);
    if (window.performance) {
      if (performance.navigation.type === 1) {}
     }
   }
   
   second way and the best way::
    In JS there is a function called onbeforeunload in window object that does the trick. and this code should also be in 
    constructor like below::
    
   constructor(props){
      super(props);
      // detect page refressh
      window.onbeforeunload = function (){}    
    }
   
   
 B. how to put scrollbar to the top on page refresh.
    this should be a mix of detecting refresh and putting scrollbar on top. The code should be in constructor.
    
   constructor(props){
     super(props);
     //detect page refressh
     window.onbeforeunload = function () {
        window.scrollTo(0, 0);
     }    
  }
 
 window.scrollTo(0, 0);
 this code should be there for putting the scroll on the top.
 
 C. how to detect when you have scrolled to the bottom.
 
    2 blocks of code does the tricks::
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    and in the listener function handleScroll::
    
    function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching)             return;
    setIsFetching(true);
  }
