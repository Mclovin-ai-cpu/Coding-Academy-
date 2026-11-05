-- Coding Academy v4: Tabelle für den Fortschritt pro Nutzer
-- Im Supabase-Dashboard unter SQL Editor einfügen und „Run“ klicken.

create table if not exists public.academy_state (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb       not null,
  saved_at   bigint      not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security: jeder sieht und ändert nur seine eigene Zeile
alter table public.academy_state enable row level security;

drop policy if exists "eigene Zeile lesen" on public.academy_state;
create policy "eigene Zeile lesen" on public.academy_state
  for select using (auth.uid() = user_id);

drop policy if exists "eigene Zeile anlegen" on public.academy_state;
create policy "eigene Zeile anlegen" on public.academy_state
  for insert with check (auth.uid() = user_id);

drop policy if exists "eigene Zeile ändern" on public.academy_state;
create policy "eigene Zeile ändern" on public.academy_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
