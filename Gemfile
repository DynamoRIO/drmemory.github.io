source "https://rubygems.org"

# We try to match the gem versions used by Github which are listed here:
# https://pages.github.com/versions/

# To upgrade, run `bundle update github-pages`.
gem "github-pages", "~> 214", group: :jekyll_plugins

# Default theme.
gem "minima", "~> 2.0"

# Ensure the version of kramdown used by github-pages has security fixes:
gem "kramdown", ">= 2.3.1"

# Fix security vuln:
gem "rexml", ">= 3.2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-redirect-from", "~> 0.16.0"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

