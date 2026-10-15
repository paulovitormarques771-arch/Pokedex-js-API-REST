<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the Kanto model, filtering and public PokéAPI client in `src/lib/pokemon.ts`; a bundled public snapshot supports immediate rendering and API outages without a database.
- Keep the first Pokédex experience at `/` using TanStack Router and browser-side query refresh; the original static project has no authentication or private data.
- Import official artwork through Lovable Assets and reference its CDN URLs in the public Pokémon snapshot so image display does not depend on the API's image host.
