import { 
    useState, 
    useEffect 
} from 'react';

export default function Meme() {
    const [meme, setMemeImage] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'https://i.imgflip.com/1bij.jpg'
    });

    const [allMemes, setAllMemes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getMemes() {
            try {
                setError(null);
                const res = await fetch('https://api.imgflip.com/get_memes');
                if (!res.ok) {
                    const msg = `There was an error: ${res.status} ${res.statusText}`;
                    setError(msg);
                    throw new Error(msg);
                }
                const data = await res.json();
                setAllMemes(data.data.memes);
            } catch (err) {
                setError(`There was an error. Try refreshing the page.`);
            }
        }
        getMemes();
    }, [])

    function getRandomInteger(max) {
        return Math.floor(Math.random() * max);
    }

    function getMemeImage() {
        const randomPosition = getRandomInteger(allMemes.length);
        const memeUrl = allMemes[randomPosition].url;
        setMemeImage(prevState => {
            return {
                ...prevState,
                randomImage: memeUrl
            }
        })
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setMemeImage(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    if (error) {
        return (
            <h1 className="error">{error}</h1>
        )
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    name="topText" 
                    placeholder="Top text"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="bottomText" 
                    placeholder="Bottom text"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}