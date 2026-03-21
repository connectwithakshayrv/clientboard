-- =============================================
-- Subscriptions Table Migration
-- Run this in Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  razorpay_subscription_id text,
  plan text NOT NULL DEFAULT 'free',
  status text NOT NULL DEFAULT 'active',
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Creators can read their own subscription
CREATE POLICY "Users can read own subscription"
  ON public.subscriptions FOR SELECT
  USING (creator_id = auth.uid());

-- Service role can insert/update (API routes use service role via server client)
-- For client-side, allow authenticated users to read their own
CREATE POLICY "Users can insert own subscription"
  ON public.subscriptions FOR INSERT
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Users can update own subscription"
  ON public.subscriptions FOR UPDATE
  USING (creator_id = auth.uid());
