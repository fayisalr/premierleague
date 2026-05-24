-- Drop existing tables if they exist
DROP TABLE IF EXISTS "Player";
DROP TABLE IF EXISTS "Match";
DROP TABLE IF EXISTS "Standing";
DROP TABLE IF EXISTS "Team";
DROP TABLE IF EXISTS "Photo";
DROP TABLE IF EXISTS "Setting";

-- Create Table: Team
CREATE TABLE "Team" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "winRate" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- Create Table: Player
CREATE TABLE "Player" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "teamId" TEXT NOT NULL REFERENCES "Team"("id") ON DELETE CASCADE
);

-- Create Table: Standing
CREATE TABLE "Standing" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "teamId" TEXT UNIQUE NOT NULL REFERENCES "Team"("id") ON DELETE CASCADE,
    "p" INTEGER NOT NULL,
    "w" INTEGER NOT NULL,
    "l" INTEGER NOT NULL,
    "gd" INTEGER NOT NULL,
    "pts" INTEGER NOT NULL
);

-- Create Table: Match
CREATE TABLE "Match" (
    "id" TEXT PRIMARY KEY,
    "homeTeamId" TEXT NOT NULL REFERENCES "Team"("id") ON DELETE CASCADE,
    "awayTeamId" TEXT NOT NULL REFERENCES "Team"("id") ON DELETE CASCADE,
    "homeScore" INTEGER,
    "awayScore" INTEGER,
    "status" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "possessionHome" INTEGER,
    "possessionAway" INTEGER,
    "shotsHome" INTEGER,
    "shotsAway" INTEGER,
    "foulsHome" INTEGER,
    "foulsAway" INTEGER
);

-- Create Table: Photo
CREATE TABLE "Photo" (
    "id" TEXT PRIMARY KEY,
    "url" TEXT NOT NULL,
    "caption" TEXT
);

-- Create Table: Setting
CREATE TABLE "Setting" (
    "key" TEXT PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- Seed Teams
INSERT INTO "Team" ("id", "name", "rank", "winRate", "img", "color") VALUES
('team-1', 'Iron Vanguard', '01', '88%', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCGMnAjSO4ppz8vQc04oEPyhqCD0ZdmiW874xL5giLpvirQzNaDqhUj4tD_GLjxQJtYVM002aXHz8Hdh6_ZiIkcby4XQJuqLRkOuWAC5tB20-2cuKiXJD6w4XEC37cjr14kuND5uRwmEzpmr6d3zuVaoO_CQ1rbhbJsimGI8FXeskB6-6nYKNXXgPTPWoKmzXi4x36jFlkra0xhAXlKkp11Fu6yPzySmS-QlUvV1bOWz8Z3CBBdUK82bKwNVActFW1VUpIo2vzxro', 'var(--primary)'),
('team-2', 'Neon Strikers', '03', '74%', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz7hl4ORoEQx7NKc14F9bzc5QKuBIFdjoTXKpv6igsClhD3UwNXNK1X1VGWgNykxVUF_Bg5eV5Sc4yviUt_dUKhihG5bFpLXrAJP_KQ505i8phHUbPE_3SwY2ff2j5uI_MoUbR4bkIehU83cD3AzKwepX0ggx3ld6StH9D73f3CwSHCJqTtrDzCUKlJYtJBdH9a3ImAyf1M0dD1B_AFEuW4v5ZJY1TG-EOp_7Wf0_brRskHQTjg5jupnsDbVd8pEzrfcpRiXkchFI', 'var(--tertiary)'),
('team-3', 'Apex Falcons', '02', '81%', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVx4HQaakmWwsLw99aim8eSCqFJFVqV36AsUun2wHuc1SgFIgltjG7cQvYoPCiCfvwu31P13t-ZCGDluv32s5WBTCRQcUpgCV4Mmxv-SgPKaHzyr5kuKYE--iBjKAKCr7FL_yK2MEQcy7kZGZACGW6sGH4BCNYcWVcHb2abj3fJvJZ9U6T7Uu6Alb866l-zGXV5jggoHnFMzhnd3pe5fnPhctib_ofRlpGps6H_4RUlGuVMlOtPs92ToIrTJuAao8Jz3QrAdIHNHM', 'var(--primary)'),
('team-4', 'Titan FC', '05', '62%', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtT9IkoLLKZBCLBpbgzc2B6Dm6gQI2WvseLY__CnZXw8RKYEoZ26m_nvtHB8zm2-Kq5Eyw82xt39ZaKCy54lbkpBGytvDArbtNis_eTUS1LPE93Fq1LsOZgJKWbDDUBkgLkHhShnJN4dBwOeHFLnPCQWrzVVhTBe7aLoJFlVrC0Fe65rVh3W1nsRLHheW8iouuqtCPiZEsedlQ__v0a59iaX-ArzGSAFWdTayxfzfDsTOBsyxFbwOvY56gu6_qVndcY0-UOTkIAM', 'var(--tertiary)'),
('team-5', 'Zenith United', '04', '69%', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm7zI7V7RaLfB382fLA5GsmO7FTHoRApwS8Reg_CEnNLG9KmsvXkOx3MwlVtZhPHPYftRvNRc7DfB7UEhmq977pfI0f_O1wfmLx9MP7lSF7veG5SNMnmICRgwUjoSfz0PxNrw_68oEUk7uIxspU1Eh-ja2M_ckmnx5oy3ePUp5IYFh82XuAOpOVLhJhkNluImiFc0ubI4YtU5_CcJBgGCGrQgcGIma9utKYTo01x_N4QmokxrW97ANO0JigBwGYkZ3ERoNde2O6sM', 'var(--primary)');

-- Seed Players
INSERT INTO "Player" ("id", "name", "imageUrl", "position", "number", "teamId") VALUES
('p1', 'Marcus Vandelay', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=200&auto=format&fit=crop', 'Striker', '9', 'team-4'),
('p2', 'Jaxon Reed', 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=200&auto=format&fit=crop', 'Midfielder', '10', 'team-1');

-- Seed Standings
INSERT INTO "Standing" ("teamId", "p", "w", "l", "gd", "pts") VALUES
('team-1', 12, 10, 2, 18, 30),
('team-3', 12, 8, 4, 12, 24),
('team-2', 11, 6, 5, 4, 18),
('team-5', 12, 4, 8, -6, 12),
('team-4', 11, 1, 10, -28, 3);

-- Seed Matches
INSERT INTO "Match" ("id", "homeTeamId", "awayTeamId", "homeScore", "awayScore", "status", "date", "time", "venue", "possessionHome", "possessionAway", "shotsHome", "shotsAway", "foulsHome", "foulsAway") VALUES
('m1', 'team-4', 'team-1', 3, 1, 'LIVE', 'OCT 15', '74''', 'WEMBLEY ELITE ARENA', 54, 46, 8, 5, 3, 7),
('m2', 'team-3', 'team-2', NULL, NULL, 'UPCOMING', 'OCT 15', '20:45', 'METRO DOME', NULL, NULL, NULL, NULL, NULL, NULL),
('m3', 'team-5', 'team-2', 2, 0, 'FT', 'OCT 14', 'FT', 'STADIUM A', NULL, NULL, NULL, NULL, NULL, NULL),
('m4', 'team-1', 'team-4', 1, 1, 'FT', 'OCT 14', 'FT', 'STADIUM B', NULL, NULL, NULL, NULL, NULL, NULL);

-- Seed Photos
INSERT INTO "Photo" ("id", "url", "caption") VALUES
('photo-1', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop', 'Championship celebration'),
('photo-2', 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=800&auto=format&fit=crop', 'Midfield battle'),
('photo-3', 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800&auto=format&fit=crop', 'Goalkeeper saves'),
('photo-4', 'https://images.unsplash.com/photo-1518091043644-c1d44570d247?q=80&w=800&auto=format&fit=crop', 'Corner kick');

-- Set up Row Level Security (RLS) to allow public access (since this is currently managing auth through a local state)
ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Player" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Standing" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Match" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Photo" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Setting" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write for Team" ON "Team" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for Player" ON "Player" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for Standing" ON "Standing" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for Match" ON "Match" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for Photo" ON "Photo" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for Setting" ON "Setting" FOR ALL USING (true) WITH CHECK (true);
