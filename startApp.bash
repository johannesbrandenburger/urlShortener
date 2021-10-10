#!/bin/bash

echo "SCRIPT STARTED AT"
date

export SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTk1MTgzNywiZXhwIjoxOTQ3NTI3ODM3fQ.OVMR_WiGUsuCVylx7Ih6Kuy40LYK-eipFKu7t6qydUE"
export SUPABASE_URL="https://kgshezreyobypiidaeii.supabase.co"
cd /home/ubuntu/serverRepos/urlShortener;
git pull;
python3 app.py;
