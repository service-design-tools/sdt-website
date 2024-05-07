# sdt-website
Repo for the new website of servicedesigntools.org

[![Netlify Status](https://api.netlify.com/api/v1/badges/e165db7c-c8c9-485d-9d2e-56209e81dd59/deploy-status)](https://app.netlify.com/sites/servicedesigntools-dev-branch/deploys)


## install
Install all dependecies with `bundle install`.

## development
To launch Jekyll run `bundle exec jekyll serve --livereload`.

If you need to make changes to the backend, you can uncomment the first line on top of `config.yml` and lanch `npx netlify-cms-proxy-server` before starting jekyll