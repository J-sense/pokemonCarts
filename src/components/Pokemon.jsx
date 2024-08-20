import { useState } from "react";
import { useEffect } from "react";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search,setSearch] = useState("");
  console.log(pokemon);
  const APi = "https://pokeapi.co/api/v2/pokemon?limit=24";
  const fetchPokeApi = async () => {
    try {
      const res = await fetch(APi);
      const data = await res.json();
      const detailplokemonData = data.results.map(async (currentData) => {
        const res = await fetch(currentData.url);
        const data = await res.json();
        return data;
      });
      const allData = await Promise.all(detailplokemonData);
      setPokemon(allData);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPokeApi();
  }, []);
  const  filterPokemon = pokemon.filter( curPokemon => curPokemon.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <h1 className="text-3xl font-mono font-semibold text-center">
        Let'<s></s> catch the pokemon
      </h1>
      <div className="text-center mt-1">
        <input
          type="text"
          placeholder="Enter the name"
          className="border p-1 px-8 bg-green-50 rounded-md"
          value={search}
          onChange={(e)=> setSearch(e.target.value) }
        />
      </div>
      <div className="grid md:grid-cols-3 md:w-[80%] w-full px-4 md:px-0 mx-auto gap-4 grid-cols-1">
        {filterPokemon.map((currentData) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <div className="p-4">
              <div className="h-28 w-28 mx-auto flex items-center justify-center">
                <img
                  src={currentData.sprites.other.dream_world.front_default}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-black text-base text-center font-bold">
                {currentData.name}
              </p>
              <div className="text-center flex items-center justify-center mt-2 ">

                <div className="btn text-center rounded p-1 mt-1 bg-green-500 px-2 text-white">
                 {currentData.types.map( curreType => curreType.type.name).join(", ")}
                </div>
              </div>
              <div className="flex justify-around mt-3">
                <p className="text-sm text-gray-600 font-semibold">Hight:{currentData.height}</p>
                <p className="text-sm text-gray-600 font-semibold">Weight:{currentData.weight}</p>
                <p className="text-sm text-gray-600 font-semibold">Speed:{currentData.order}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
