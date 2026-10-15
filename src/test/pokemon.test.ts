import { describe, it, expect } from 'vitest';
import { filterPokemon, pokemonSnapshot, TOTAL_POKEMON } from '@/lib/pokemon';

describe('Pokédex de Kanto', () => {
  it('preserves all 151 original Pokémon', () => {
    expect(TOTAL_POKEMON).toBe(151);
    expect(pokemonSnapshot).toHaveLength(151);
    expect(pokemonSnapshot.at(-1)?.id).toBe(151);
  });
  it('finds a Pokémon by name or Pokédex number', () => {
    expect(filterPokemon(pokemonSnapshot, 'pikachu', 'all', 'asc').map(p => p.id)).toEqual([25]);
    expect(filterPokemon(pokemonSnapshot, '#025', 'all', 'asc').map(p => p.id)).toEqual([25]);
  });
  it('filters by secondary type as well as primary type', () => {
    expect(filterPokemon(pokemonSnapshot, 'bulbasaur', 'poison', 'asc').map(p => p.id)).toEqual([1]);
    expect(filterPokemon(pokemonSnapshot, 'bulbasaur', 'fire', 'asc')).toHaveLength(0);
  });
});