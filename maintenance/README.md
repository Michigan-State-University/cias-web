# Maintenance mode page

We are using a dokku plugin for maintenance mode on prod and test:
https://github.com/dokku/dokku-maintenance

It requires absolute paths to be used in files so remember to
**use absolute paths** (like `/image.jpg`) **instead of relative paths**
(like `image.jpg` or `./image.jpg`).

For development, firstly install `live-server` globally, e.g.:

```npm install -g live-server```

Then, in the `maintenance` directory of the project, run development server:

``` live-server --open=/maintenance.html --port=4201```

To create a tar archive, in the `maintenance` directory of the project, run:

```tar -c -f maintenance.tar --exclude maintenance.tar --exclude README.md .```

Dokku servers configuration must be updated with new `maintenance.tar` archive file.
