export async function render(): Promise<void> {
    // TODO render your app here
    const APIKEY = 'api_key=04c35731a5ee918f014970082a0088b1';
    const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&" + APIKEY;
    const IMGPATH = 'https://image.tmdb.org/t/p/w500';
    const IMGHIGHPATH = 'https://image.tmdb.org/t/p/w1280'
    const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&" + APIKEY + "&query=";
    const RATEDAPI = 'https://api.themoviedb.org/3/movie/top_rated?' + APIKEY + '&query=';
    const POPAPI = 'https://api.themoviedb.org/3/movie/popular?' + APIKEY + '&query=';
    const COMMINGAPI = 'https://api.themoviedb.org/3/movie/upcoming?' + APIKEY + '&query=';
    const PAGINAPI = 'https://api.themoviedb.org/3/movie/popular?' + APIKEY + '&page=';

    const btnTrigger = document.querySelector('#button-wrapper') as HTMLDivElement;
    const movie = document.querySelectorAll('.col-lg-3') as NodeListOf<HTMLDivElement>;
    const form = document.querySelector('form') as HTMLFormElement;
    const searchInput = document.querySelector("#search") as HTMLInputElement;
    const submitButton = document.querySelector("#submit") as HTMLButtonElement;
    const paginationBtn = document.querySelector('#load-more');
    const releaseInfo = document.querySelectorAll('.text-muted');
    const description = document.querySelectorAll('.card-text');

    let numberOfPage = 1;



    btnTrigger?.addEventListener('click', (e) => {
        const target = e.target as Element;
        if (target && target.matches('#top_rated')) showRated();
        if (target && target.matches('#popular')) showPopular();
        if (target && target.matches('#upcoming')) showComming();
    });

    getMovies(APIURL);
    async function getMovies(url: string) {
        const response = await fetch(url);
        const responseData = await response.json();

        console.log(responseData)
        showMovie(responseData)
    }

    interface MovieData {
        results: MovieObject[]
    }

    interface MovieObject {
        poster_path: string;
        release_date: string;
        overview: string;
        title: string;
    }

    


    const showMovie = (data: MovieData) => {
        let filteredPoster: MovieObject[] = [];
        filteredPoster = data.results.filter((item: MovieObject) => item.poster_path);
       
        generateRandomPoster(filteredPoster);
        for (let i = 0; i < movie.length; i++) {
            movie[i].children[0]?.firstElementChild?.setAttribute('src', IMGPATH + filteredPoster[i].poster_path);
            releaseInfo[i].textContent = filteredPoster[i].release_date;
            description[i].textContent = filteredPoster[i].overview;
        }
        
    };

    function generateRandomPoster(arrayOfMovies: MovieObject[]) {
        const randomTitle = document.querySelector('#random-movie-name') as HTMLDivElement;
        const sectionRandom = document.querySelector('#random-movie') as HTMLDivElement;
        const randomDescr = document.querySelector('#random-movie-description') as HTMLDivElement;
        let randomIdx: number = Math.floor(Math.random()*arrayOfMovies.length);

        sectionRandom.style.background = `url(${IMGHIGHPATH + arrayOfMovies[randomIdx].poster_path}) 0 -230px/cover no-repeat`;
        randomDescr.textContent = `${arrayOfMovies[randomIdx].overview}`;
        randomTitle.textContent = `${arrayOfMovies[randomIdx].title}`
    }

    const showRated = () => {
        getMovies(RATEDAPI);
    }

    const showPopular = () => {
        getMovies(POPAPI);
    }

    const showComming = () => {
        getMovies(COMMINGAPI);
    }


    const handleSearch = () => {
        const searchValue = searchInput.value;
        getMovies(SEARCHAPI + searchValue);
        searchInput.value = ''
    }
    submitButton.addEventListener("click", (e) => {
        handleSearch();
    });

    form.addEventListener("submit", function (event: SubmitEvent) {
        event.preventDefault();
        handleSearch();
    });

    paginationBtn?.addEventListener('click', () => {
        numberOfPage++;
        getMovies(PAGINAPI + numberOfPage);
        document.documentElement.scrollTop = 700;

    });
}
