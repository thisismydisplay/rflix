


cd /app/rflix/react-app
npm install && CI=false npm run build
curl https://get.docker.com/ | sudo sh
# sudo groupadd docker
sudo usermod -aG docker ubuntu
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 16.16.0
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
sudo apt install libbz2-dev libffi-dev liblzma-dev libreadline-dev libsqlite3-dev libssl-dev tk-dev zlib1g-dev
pyenv install 3.9.13
pyenv global 3.9.13
cd /app/rflix
pip install pipenv
pipenv requirements > requirements.txt
docker build -t rflix:latest .
