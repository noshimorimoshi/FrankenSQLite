# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
    pkgs.nodejs_20  # Для сборки среды, чтобы не падала

    # pkgs.nodePackages.nodemon
  ];

  # Sets environment variables in the workspace
  env = {
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
        #   command = ["npm" "run" "dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     PORT = "$PORT";
        #   };
        # };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        install-node24 = ''
          if [ ! -x "$HOME/.local/node24/bin/node" ]; then
            mkdir -p $HOME/.local/node24
            curl -fsSL https://nodejs.org/dist/v24.3.0/node-v24.3.0-linux-x64.tar.xz | tar -xJ -C $HOME/.local/node24 --strip-components=1
          fi

          # Добавляем экспорт в .bashrc, если ещё нет
          grep -qxF 'export PATH="$HOME/.local/node24/bin:$PATH"' ~/.bashrc || echo 'export PATH="$HOME/.local/node24/bin:$PATH"' >> ~/.bashrc

          export PATH="$HOME/.local/node24/bin:$PATH"
          echo "PATH=$PATH"  # для отладки
          node -v
        '';
      };

      onStart = {
        set-path = ''
          export PATH="$HOME/.local/node24/bin:$PATH"
          echo "PATH=$PATH"  # для отладки
          node -v
        '';
      };
    };
  };
}
