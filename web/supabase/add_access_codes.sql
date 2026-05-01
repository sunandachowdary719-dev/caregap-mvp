ALTER TABLE patients ADD COLUMN IF NOT EXISTS access_code text;

UPDATE patients
SET access_code = upper(substring(md5(random()::text), 1, 6))
WHERE access_code IS NULL;
