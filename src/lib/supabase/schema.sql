-- ==============================================================================
-- ME THE CHANGE NGO — DATABASE SCHEMA (PHASE 7: ENGAGEMENT & CONTACT FORMS)
-- ==============================================================================
--
-- This script creates the minimal tables and security policies needed for:
-- 1. volunteer_applications
-- 2. contact_inquiries
-- 3. csr_inquiries
--
-- Security:
-- - Row Level Security (RLS) is ENABLED on all tables.
-- - Anon/public direct access is revoked to prevent scraping.
-- - Inserts and queries are performed through Next.js server route handlers using the service_role key.
--
-- ==============================================================================

-- 1. Volunteer Applications Table
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'archived')),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    availability TEXT NOT NULL,
    areas_of_interest TEXT[] NOT NULL DEFAULT '{}',
    message TEXT,
    ip_hash TEXT,
    user_agent TEXT
);

-- Index for querying applications by status and date
CREATE INDEX IF NOT EXISTS idx_volunteer_created_at ON public.volunteer_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_volunteer_status ON public.volunteer_applications (status);

-- Enable RLS
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Service role has full access
CREATE POLICY "Service role full access on volunteer_applications"
    ON public.volunteer_applications
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- 2. General Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_hash TEXT,
    user_agent TEXT
);

-- Index for sorting contact inquiries
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_inquiries (status);

-- Enable RLS
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Service role has full access
CREATE POLICY "Service role full access on contact_inquiries"
    ON public.contact_inquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- 3. CSR & Institutional Partnerships Table
CREATE TABLE IF NOT EXISTS public.csr_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_discussion', 'partnered', 'archived')),
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    area_of_interest TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_hash TEXT,
    user_agent TEXT
);

-- Index for CSR inquiries
CREATE INDEX IF NOT EXISTS idx_csr_created_at ON public.csr_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_csr_status ON public.csr_inquiries (status);

-- Enable RLS
ALTER TABLE public.csr_inquiries ENABLE ROW LEVEL SECURITY;

-- Service role has full access
CREATE POLICY "Service role full access on csr_inquiries"
    ON public.csr_inquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
