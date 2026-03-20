-- =============================================
-- Feedback Table Migration
-- Run this in Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  name text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can insert feedback (public portal submissions)
CREATE POLICY "Anyone can insert feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (true);

-- Creators can view feedback for their own clients
CREATE POLICY "Creators see own feedback"
  ON public.feedback FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM public.clients WHERE creator_id = auth.uid()
    )
  );
