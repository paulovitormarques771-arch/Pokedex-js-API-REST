import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ArrowDown, ArrowDownUp, ArrowRight, BookOpen, ChevronDown, Flame, Github, Leaf, Search, Sparkles, Waves, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { fetchPokemon, filterPokemon, PAGE_SIZE, pokemonSnapshot, typeNames, type Pokemon } from '@/lib/pokemon';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Pokédex — Explore os Pokémon de Kanto' },
    { name: 'description', content: 'Descubra os 151 Pokémon de Kanto, seus tipos, habilidades e estatísticas. Projeto do desafio de JavaScript da DIO com PokéAPI.' },
    { property: 'og:title', content: 'Pokédex — Explore os Pokémon de Kanto' },
    { property: 'og:description', content: 'Uma jornada pelos 151 Pokémon da primeira geração. Busque, filtre e conheça cada Pokémon.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Index,
});

const quickTypes = [ { key: 'all', label: 'Todos', icon: BookOpen }, { key: 'grass', label: 'Planta', icon: Leaf }, { key: 'fire', label: 'Fogo', icon: Flame }, { key: 'water', label: 'Água', icon: Waves }, { key: 'electric', label: 'Elétrico', icon: Zap } ];
const statNames: Record<string, string> = { hp: 'HP', attack: 'Ataque', defense: 'Defesa', 'special-attack': 'Ataque especial', 'special-defense': 'Defesa especial', speed: 'Velocidade' };
function Pokeball({ className = '' }: { className?: string }) { return <span aria-hidden="true" className={`pokeball ${className}`}><span /></span>; }
function Index() {
  const { data: pokemon, isError, isFetching, refetch } = useQuery({ queryKey: ['pokemon-kanto'], queryFn: fetchPokemon, initialData: pokemonSnapshot, initialDataUpdatedAt: 0, staleTime: 300000, retry: 1 });
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [order, setOrder] = useState('asc');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [about, setAbout] = useState(false);
  const filtered = filterPokemon(pokemon, search, type, order);
  function changeType(value: string) { setType(value); setVisible(PAGE_SIZE); }
  return <div className="app-shell">
    <header className="site-header"><div className="header-inner">
      <a className="brand" href="/" aria-label="Pokédex, início"><Pokeball /><span>pokédex<span className="brand-dot">.</span></span></a>
      <nav aria-label="Navegação principal"><span className="nav-active">Explorar</span><Button variant="ghost" onClick={() => setAbout(true)}>Sobre o projeto <ArrowRight /></Button></nav>
      <Button variant="outline" className="github-link" asChild><a href="https://github.com/digitalinnovationone/js-developer-pokedex" target="_blank" rel="noreferrer"><Github /> Projeto original <ArrowRight /></a></Button>
    </div></header>
    <main className="main-container">
      <section className="intro"><div className="intro-copy"><div className="eyebrow"><span className="status-dot" /> PRIMEIRA GERAÇÃO · REGIÃO DE KANTO</div><h1>Um mundo de<br />Pokémon para <span>descobrir.</span></h1><p>Dos primeiros parceiros às lendas de Kanto.<br />Encontre seu favorito e conheça cada detalhe.</p><div className="intro-meta"><span><Pokeball /> <strong>151</strong> Pokémon</span><span className="meta-divider" /><span><Sparkles size={15} /> Uma jornada, infinitas descobertas</span></div></div>
        <div className="starter-scene" aria-label="Bulbasaur, Charmander e Squirtle"><Pokeball className="scene-ball" /><img className="starter starter-bulbasaur" src={pokemonSnapshot[0]?.image} alt="Bulbasaur" /><img className="starter starter-charmander" src={pokemonSnapshot[3]?.image} alt="Charmander" /><img className="starter starter-squirtle" src={pokemonSnapshot[6]?.image} alt="Squirtle" /><span className="scene-caption"><span /> Todo começo tem um parceiro.</span></div>
      </section>
      <section className="collection" aria-label="Catálogo de Pokémon"><div className="collection-heading"><div><h2>Explore a Pokédex <span>01 — 151</span></h2><p>Qual Pokémon você vai descobrir hoje?</p></div><span className="region-tag"><span /> Kanto</span></div>
        <div className="search-row"><label className="search-field"><Search size={20} /><input value={search} onChange={e => { setSearch(e.target.value); setVisible(PAGE_SIZE); }} placeholder="Buscar por nome ou número..." aria-label="Buscar por nome ou número" />{search && <Button variant="ghost" size="icon" aria-label="Limpar busca" onClick={() => setSearch('')}><X /></Button>}</label><label className="order-field"><ArrowDownUp size={17} /><select aria-label="Ordenar Pokémon" value={order} onChange={e => setOrder(e.target.value)}><option value="asc">Número crescente</option><option value="desc">Número decrescente</option><option value="name">Nome A–Z</option></select><ChevronDown size={15} /></label></div>
        <div className="filter-row"><div className="type-filters">{quickTypes.map(t => <Button key={t.key} variant="ghost" className={`filter-button ${type === t.key ? 'selected' : ''} ${t.key}`} onClick={() => changeType(t.key)}><t.icon size={16} />{t.label}</Button>)}<label className={`other-filter ${!quickTypes.some(t => t.key === type) ? 'selected' : ''}`}><select aria-label="Outros tipos" value={quickTypes.some(t => t.key === type) ? '' : type} onChange={e => { if (e.target.value) changeType(e.target.value); }}><option value="">Outros tipos</option>{Object.entries(typeNames).filter(([key]) => !quickTypes.some(t => t.key === key)).map(([key, name]) => <option value={key} key={key}>{name}</option>)}</select><ChevronDown size={14} /></label></div><span className="result-count">{filtered.length} Pokémon encontrados</span></div>
        {isError && <div className="api-notice">A PokéAPI está indisponível. Exibindo a última coleção disponível. <Button variant="link" onClick={() => refetch()}>Tentar novamente</Button></div>}
        <div className="pokemon-grid">{filtered.slice(0, visible).map(p => <Button variant="ghost" key={p.id} className={`pokemon-card type-${p.types[0]}`} onClick={() => setSelected(p)} aria-label={`Ver detalhes de ${p.name}`}><div className="card-top"><span className="pokemon-number">#{String(p.id).padStart(3, '0')}</span><ArrowRight size={17} /></div><div className="pokemon-art"><Pokeball className="card-ball" /><img src={p.image} alt={p.name} loading={p.id > 12 ? 'lazy' : 'eager'} /></div><div className="card-bottom"><h3>{p.name}</h3><div className="type-badges">{p.types.map(t => <span key={t} className={`type-badge badge-${t}`}><span />{typeNames[t] ?? t}</span>)}</div></div></Button>)}</div>
        {filtered.length === 0 && <div className="empty-state"><Search size={32} /><h3>Nenhum Pokémon encontrado</h3><p>Tente outro nome, número ou tipo.</p><Button variant="outline" onClick={() => { setSearch(''); changeType('all'); }}>Limpar filtros</Button></div>}
        {filtered.length > 0 && <div className="pagination"><p>Exibindo <strong>{Math.min(visible, filtered.length)}</strong> de <strong>{filtered.length}</strong> Pokémon</p>{visible < filtered.length && <Button variant="outline" size="lg" onClick={() => setVisible(v => v + PAGE_SIZE)}>Carregar mais Pokémon <ArrowDown size={16} /></Button>}</div>}
      </section>
    </main>
    <footer className="site-footer"><div className="footer-inner"><span className="footer-brand"><Pokeball /> pokédex.</span><span>Feito com curiosidade. Movido pela <a href="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI <ArrowRight size={12} /></a></span><span className="dio-tag">DESAFIO DE PROJETO <strong>DIO<span>.</span></strong></span></div><div className="footer-legal">Pokémon e os nomes dos personagens são marcas da Nintendo, Game Freak e The Pokémon Company.</div></footer>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="pokemon-dialog">{selected && <><div className={`detail-art type-${selected.types[0]}`}><span className="pokemon-number">#{String(selected.id).padStart(3, '0')}</span><Pokeball className="detail-ball" /><img src={selected.image} alt={selected.name} /></div><div className="detail-content"><DialogTitle className="capitalize text-3xl">{selected.name}</DialogTitle><DialogDescription>Pokémon da região de Kanto</DialogDescription><div className="type-badges mt-3">{selected.types.map(t => <span key={t} className={`type-badge badge-${t}`}><span />{typeNames[t]}</span>)}</div><div className="measurements"><div><span>Altura</span><strong>{(selected.height / 10).toLocaleString('pt-BR')} m</strong></div><div><span>Peso</span><strong>{(selected.weight / 10).toLocaleString('pt-BR')} kg</strong></div></div><h4>Estatísticas base</h4><div className="stats">{selected.stats.map(s => <div className="stat-row" key={s.name}><span>{statNames[s.name]}</span><strong>{s.value}</strong><meter min="0" max="255" value={s.value} aria-label={statNames[s.name]} /></div>)}</div><h4>Habilidades</h4><p className="abilities">{selected.abilities.map(a => a.replaceAll('-', ' ')).join(' · ')}</p></div></>}</DialogContent></Dialog>
    <Dialog open={about} onOpenChange={setAbout}><DialogContent><DialogTitle className="text-2xl">Sobre a Pokédex</DialogTitle><DialogDescription>Desafio de projeto · DIO</DialogDescription><p>Uma Pokédex dos 151 Pokémon de Kanto, criada a partir do projeto de JavaScript da Digital Innovation One e aprimorada com busca, filtros e estatísticas.</p><p className="text-sm text-muted-foreground">Os dados são consultados na API REST pública PokéAPI. {isFetching ? 'Atualizando a coleção…' : 'A coleção está pronta para explorar.'}</p><Button asChild variant="outline"><a href="https://github.com/digitalinnovationone/js-developer-pokedex" target="_blank" rel="noreferrer"><Github /> Código original da DIO <ArrowRight /></a></Button></DialogContent></Dialog>
  </div>;
}
