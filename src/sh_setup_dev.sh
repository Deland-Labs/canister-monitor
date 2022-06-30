npm cache clear --force
npm config set @deland-labs:registry https://www.myget.org/F/ic-feed/npm/
npm config set @icnaming:registry https://www.myget.org/F/icnaming/npm/
npm install -g yarn
npm install
npx icdev init-identity
npx ts-node -r tsconfig-paths/register scripts/index.ts update-local-config

pip3 install pipenv && \
pip3 install pre-commit && \
export PATH=$PATH:$HOME/.local/bin && \
pre-commit install
