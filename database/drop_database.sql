-- -- Drop database database_project
-- DROP DATABASE IF EXISTS database_project;

-- Drop trigger rating_trigger
DROP TRIGGER rating_trigger ON public.user CASCADE;

-- Drop function update_rating
DROP FUNCTION IF EXISTS update_rating CASCADE;

-- Drop table public.user
DROP TABLE IF EXISTS public.user CASCADE;

-- Drop table public.city
DROP TABLE IF EXISTS public.city CASCADE;

-- Drop table public.offer
DROP TABLE IF EXISTS public.offer CASCADE;

-- Drop table public.request
DROP TABLE IF EXISTS public.request CASCADE;

-- Drop table public.message
DROP TABLE IF EXISTS public.message CASCADE;



