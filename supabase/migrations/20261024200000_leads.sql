-- Leads inbox: every quote request and booking from the website is stored here.
-- Rows are inserted only by the website's server (service role key). Signed-in admins can read and update them.

create type public.lead_status as enum ('new', 'contacted', 'scheduled', 'completed', 'lost');

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status public.lead_status not null default 'new',
  kind text not null check (kind in ('quote', 'booking')),
  service text,
  customer_type text,
  first_name text not null,
  last_name text,
  phone text not null,
  email text,
  company text,
  address text,
  city text,
  zip text,
  message text,
  appointment_date date,
  appointment_window text,
  sms_consent boolean not null default false,
  page_path text,
  utm jsonb,
  notes text
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);

-- Who can open the leads dashboard.
create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_touch_updated_at
before update on public.leads
for each row execute function public.touch_updated_at();

alter table public.leads enable row level security;
alter table public.admin_users enable row level security;

create policy "Admins can read leads" on public.leads
  for select to authenticated using (public.is_admin());

create policy "Admins can update leads" on public.leads
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Users can see their own admin row" on public.admin_users
  for select to authenticated using (user_id = auth.uid());
