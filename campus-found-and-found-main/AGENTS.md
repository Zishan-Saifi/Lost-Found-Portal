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

# CampusFind

- CampusFind is a frontend-only portal: all state (items, bookmarks, claims, theme) lives in React state persisted to localStorage via `src/lib/campusfind/storage.ts`. Do not introduce a database or server functions unless the user asks for shared/cross-device data.
- CampusFind UI lives in `src/components/campusfind/` and composes in `src/routes/index.tsx`; item mock data and types live in `src/lib/campusfind/data.ts`. Keep color/status styling on semantic tokens (`--status-lost`, `--status-found`, `--claimed`) from `src/styles.css`, never hardcoded utilities.
