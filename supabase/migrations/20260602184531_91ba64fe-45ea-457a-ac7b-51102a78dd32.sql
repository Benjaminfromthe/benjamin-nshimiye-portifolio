
CREATE TABLE public.site_stats (
  id INT PRIMARY KEY DEFAULT 1,
  visit_count BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

GRANT SELECT ON public.site_stats TO anon, authenticated;
GRANT ALL ON public.site_stats TO service_role;

ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read stats" ON public.site_stats FOR SELECT USING (true);

INSERT INTO public.site_stats (id, visit_count) VALUES (1, 0);

CREATE OR REPLACE FUNCTION public.increment_visits()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE public.site_stats
  SET visit_count = visit_count + 1, updated_at = now()
  WHERE id = 1
  RETURNING visit_count INTO new_count;
  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_visits() TO anon, authenticated;

ALTER PUBLICATION supabase_realtime ADD TABLE public.site_stats;
ALTER TABLE public.site_stats REPLICA IDENTITY FULL;
