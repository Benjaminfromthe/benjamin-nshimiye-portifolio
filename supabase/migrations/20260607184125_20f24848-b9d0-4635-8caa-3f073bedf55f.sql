
CREATE TABLE public.guestbook_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 50),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 280),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.guestbook_entries TO anon;
GRANT SELECT, INSERT ON public.guestbook_entries TO authenticated;
GRANT ALL ON public.guestbook_entries TO service_role;
ALTER TABLE public.guestbook_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guestbook is publicly readable" ON public.guestbook_entries FOR SELECT USING (true);
CREATE POLICY "Anyone can sign the guestbook" ON public.guestbook_entries FOR INSERT WITH CHECK (true);

CREATE TABLE public.visitor_stats (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  count bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.visitor_stats (id, count) VALUES (1, 0);
GRANT SELECT ON public.visitor_stats TO anon, authenticated;
GRANT ALL ON public.visitor_stats TO service_role;
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitor count is publicly readable" ON public.visitor_stats FOR SELECT USING (true);

CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS bigint LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE new_count bigint;
BEGIN
  UPDATE public.visitor_stats SET count = count + 1, updated_at = now() WHERE id = 1 RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;
GRANT EXECUTE ON FUNCTION public.increment_visitor_count() TO anon, authenticated;

ALTER PUBLICATION supabase_realtime ADD TABLE public.guestbook_entries;
