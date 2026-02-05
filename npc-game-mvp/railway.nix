{ pkgs ? import (fetchTarball "https://github.com/railwayapp/nixpacks/main.tar.gz") {}
}:
pkgs.nixpacks {
  src = ./.;
  buildCommand = "npm install && npm run build";
  runCommand = "npm run start";
}
