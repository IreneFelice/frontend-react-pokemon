import './App.css'

function App() {
    const [facts, setFacts] = useState([]);

    async function fetchData(){
        try{
            const response = await
                axios.get('https://pokeapi.co/api/v2/pokemon/ditto',
                );
            setFacts(response.data);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
            fetchData();
            console.log('pokemon');
    },[]);

  return (
    <>
      <h1>Gotta catch em all!</h1>
        <div>{facts.map((el,i) =>
        {
            return (
                <div key={i}>
                    {el.fact}
                </div>
            );
        })}</div>
    </>
  )
}

toevoegen nieuwe branch

export default App
