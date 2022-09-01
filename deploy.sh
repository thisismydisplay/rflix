#!/bin/bash

# Borrowed from
# https://community.netlify.com/t/support-guide-using-an-ssh-key-via-environment-variable-during-build/2457/3
mkdir -p ~/.ssh
echo -e "${DEPLOY_KEY//_/\\n}" > ~/.ssh/id_ed25519
chmod 600 ~/.ssh/id_ed25519
chmod 700 ~/.ssh

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-keyscan -H rflix.thisismydisplay.com >> ~/.ssh/known_hosts

ssh ubuntu@rflix.thisismydisplay.com '
    cd /app/rflix
    git fetch
    git reset --hard HEAD
    git checkout main
    git reset --hard origin/main

    cd /app/rflix/react-app
    npm install && CI=false npm run build
    curl https://get.docker.com/ | sudo sh
    # sudo groupadd docker
    sudo usermod -aG docker ubuntu
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    nvm install 16.16.0
    nvm alias default 16.16.0
'
