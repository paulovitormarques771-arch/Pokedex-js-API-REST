import pokemonData from '@/data/pokemon.json';

export type Pokemon = (typeof pokemonData)[number];
export const TOTAL_POKEMON = 151;
export const PAGE_SIZE = 12;
export const pokemonSnapshot: Pokemon[] = pokemonData;
export const typeNames: Record<string, string> = { grass: 'Planta', fire: 'Fogo', water: 'Água', electric: 'Elétrico', bug: 'Inseto', normal: 'Normal', poison: 'Veneno', flying: 'Voador', ground: 'Terra', fairy: 'Fada', fighting: 'Lutador', psychic: 'Psíquico', rock: 'Pedra', ghost: 'Fantasma', ice: 'Gelo', dragon: 'Dragão', steel: 'Aço', dark: 'Sombrio' };
export function filterPokemon(pokemon: Pokemon[], search: string, type: string, order: string) {
  const term = search.trim().toLowerCase().replace(/^#0*/, '');
  return pokemon.filter(p => (type === 'all' || p.types.includes(type)) && (!term || p.name.includes(term) || String(p.id) === term)).sort((a, b) => order === 'name' ? a.name.localeCompare(b.name) : order === 'desc' ? b.id - a.id : a.id - b.id);
}
type ApiPokemon = { id: number; name: string; height: number; weight: number; types: { type: { name: string } }[]; stats: { stat: { name: string }; base_stat: number }[]; abilities: { ability: { name: string } }[] };
export async function fetchPokemon(): Promise<Pokemon[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${TOTAL_POKEMON}`);
  if (!response.ok) throw new Error('Não foi possível acessar a PokéAPI.');
  const list: { results: { url: string }[] } = await response.json();
  return Promise.all(list.results.map(async entry => {
    const detail = await fetch(entry.url);
    if (!detail.ok) throw new Error('Não foi possível atualizar os Pokémon.');
    const p: ApiPokemon = await detail.json();
    const snapshot = pokemonSnapshot.find(item => item.id === p.id);
    return { id: p.id, name: p.name, height: p.height, weight: p.weight, types: p.types.map(t => t.type.name), image: snapshot?.image ?? '', stats: p.stats.map(s => ({ name: s.stat.name, value: s.base_stat })), abilities: p.abilities.map(a => a.ability.name) };
  }));
}