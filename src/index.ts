export async function render(): Promise<void> {
    // TODO render your app here
    const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
    const IMGPATH = 'https://image.tmdb.org/t/p/w500';
    const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
    const GENREAPI = 'https://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1&query=';
    const RATEDAPI = 'https://api.themoviedb.org/3/movie/top_rated?api_key=04c35731a5ee918f014970082a0088b1&query=';
    const POPAPI = 'https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&query=';
    const COMMINGAPI = 'https://api.themoviedb.org/3/movie/upcoming?api_key=04c35731a5ee918f014970082a0088b1&query=';
    const PAGIAPI = 'https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&page='

    const APIKEY = 'api_key=04c35731a5ee918f014970082a0088b1&query=';


    const btnTrigger = document.querySelector('#button-wrapper') as HTMLDivElement;
    const movie = document.querySelectorAll('.col-lg-3') as NodeListOf<HTMLDivElement>;
    const form = document.querySelector('form') as HTMLFormElement;
    const searchInput = document.querySelector("#search") as HTMLInputElement;
    const submitButton = document.querySelector("#submit") as HTMLButtonElement;
    const paginationBtn = document.querySelector('#load-more');

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
    }


    const showMovie = (data: MovieData) => {
        let filteredPoster = [];
        filteredPoster = data.results.filter((item: MovieObject) => item.poster_path);
        for (let i = 0; i < movie.length; i++) {
            movie[i].children[0]?.firstElementChild?.setAttribute('src', IMGPATH + filteredPoster[i].poster_path);
        }
    };

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
        getMovies(PAGIAPI + numberOfPage);
        document.documentElement.scrollTop = 700;

    });

    // form.addEventListener('submit', (e: any) => {
    //     e.preventDefault();
    //     const valueSearch = search.value;
    //     getMovies(SEARCHAPI + valueSearch);
    //     search.value = '';
    // });



    // searchMovies();
    // function searchMovies() {
    //     const inputSearch = document.querySelector('#search');
    //     const btnSearch = document.querySelector('#submit');

    //     btnSearch?.addEventListener('click', (e) => {
    //         console.log(inputSearch!.value);
    //     });

    // }

}
