create table sessions (
  id          text primary key,
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  date        date not null,
  target_type text not null check (target_type in ('resource', 'project')),
  target_id   text not null,
  minutes     integer not null check (minutes between 1 and 1440),
  rating      smallint check (rating between 1 and 5),
  notes       text not null default '',
  blocker     text not null default '',

  check (target_type = 'resource' or rating is null)
);

create table projects (
  id          text primary key,
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  name        text not null,
  description text not null default '',
  url         text not null default '',
  created_at  date not null default current_date
);

create table completed_resources (
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  resource_id text not null,
  primary key (user_id, resource_id)
);

grant select, insert, update, delete on sessions            to authenticated;
grant select, insert, update, delete on projects            to authenticated;
grant select, insert, update, delete on completed_resources to authenticated;

alter table sessions            enable row level security;
alter table projects            enable row level security;
alter table completed_resources enable row level security;

create policy "own rows" on sessions
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "own rows" on projects
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "own rows" on completed_resources
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());