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