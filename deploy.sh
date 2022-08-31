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
    cd

'
