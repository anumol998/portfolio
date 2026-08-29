// src/lib/useFetch.ts
//
// Tiny generic hook so components don't repeat loading/error boilerplate.
import { useEffect, useState } from "react";

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetcher()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}

/* -----------------------------------------------------------------------
   Example usage — e.g. in a page component that used to do:

     import { projects, categories } from '../data/projects';

   becomes:

     import { useFetch } from '../lib/useFetch';
     import { fetchProjects, fetchCategories } from '../lib/api';

     function ProjectsPage() {
       const { data: categories, loading: catLoading } = useFetch(fetchCategories);
       const { data: projects, loading: projLoading } = useFetch(fetchProjects);

       if (catLoading || projLoading) return <p>Loading…</p>;
       if (!categories || !projects) return null;

       return (
         <div>
           {categories.map((cat) => (
             <section key={cat.slug}>
               <h2>{cat.title}</h2>
               {projects[cat.slug]?.map((p) => (
                 <article key={p.slug}>
                   <img src={p.cover} alt={p.title} />
                   <h3>{p.title}</h3>
                 </article>
               ))}
             </section>
           ))}
         </div>
       );
     }
----------------------------------------------------------------------- */
