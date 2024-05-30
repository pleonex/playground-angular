# HyruleCompendium

Example frontend-only application made with Angular. It displays the list of
items and monsters you can find in the game _The Legend of Zelda: Breath of the
Wild_.

## Stack

- Angular v18 with standalone components
- Node.JS v20
- [Bulma](https://bulma.io/) CSS framework
- Font Awesome 6 (via NPM)
- API integrations:
  - [Techy](https://techy-api.vercel.app/)
  - [xkcd](https://xkcd.com/json.html)
  - [HyruleCompendium](https://gadhagod.github.io/Hyrule-Compendium-API)

## Features

### Authorization

**Features used**:

- (UC1) Login
- Route guards
- Browser local storage
- Route redirection
- Route optional parameters
- Angular reactive forms
- Component service communication + Observables
- Dependency injection

![login-page](./screenshots/login.png)

The frontend implements a basic and **fake** authorization logic. It supports
one user with the user and password hard-coded in the frontend code for demo
purpose. It does not contact any backend or auth service.

- User: `link`
- Password: `21/02/1986` (release date of the first The Legend of Zelda game)

There are guards for the routes that prevents accessing the resources if the
user is not logged. For demo purpose there are two implementations of the login
guard ([`auth.guard.ts`](./src/app/auth/auth.guard.ts)):

- **Redirection guard**: if the user is not logged, there is a silent
  redirection to the login page (`/login`).
  - Applies to the home route (`/` and `/home`).
- **Denied guard**: if the user is not logged, there is a silent redirection to
  a 401 Unauthorized error page (`/error/401`).
  - Applies to the `/compendium` route and its children.
- The routes `/login`, `/error` and not found are not protected.

![error 401 unauthorized](./screenshots/unathorized-compendium-redirect.png)

If the login is successful the user details are stored in the browser local
storage, so it is not needed to re-login each time.

The class [`auth.service.ts`](./src/app/auth/auth.service.ts) implements the
logic to authenticate the user and keeps the information of the login when it
succeeds. Other components can access the service (via dependency injection) to
get the details of the user. For instance the menu component displays the user
name (_Hero of Time_) and displays a _Login_ or _Logout_ button depending on the
auth status. The status is propagated to other components via observables.

One additional feature of the _redirection guard_ is that it redirects to the
login page passing an option parameter: `redirectUrl` with the original URL. The
login component will redirect to this URL when the authentication succeeds. As a
basic security check, it prevents from redirection to other webpages by checking
if the redirection URL starts with `http`. In that case it will display the
error [`418` _I am a teapot_](https://http.cat/418).

The login component was implemented with the new Angular reactive forms.

## Home page

**Features used**:

- Http client
- Webpack dev proxy

![home](./screenshots/home-after-login.png)

The home page is available at `/` and `/home` (to showcase login redirection).
It has two children components displayed in a dynamic grid layout:

- XKCD comic: display the [xkcd](https://xkcd.com/) comic of the day. It
  includes its title, ID, date, image and its "hidden" alt text. It retrieves
  the data via a JSON response in an HTTP GET.
- Techy: display a random ["tech-like"](https://techy-api.vercel.app/) tip. It
  retrieves the data from an HTTP GET.

To prevent CORS issues, the application in debug mode runs a dev proxy that
redirects the local calls to `/api/xkcd` and `/api/techy` to the external hosts.
The configuration is in [`proxy.conf.json](./src/proxy.conf.json).

## Compendium categories

**Features used**:

- (UC3) Search across different resources
- Router navigation
- NgModel two-ways binding
- Template condition (`@if`, `@else`)
- Template loops (`@for`, `@empty`)
- Template switch (`@switch`)
- Pipes (`titlecase`, `keyvalue`)
- Router link with query params
- State cache via service

![compendium categories](./screenshots/compendium-general-with-search.png)

The compendium categories display boxes that are clickable and redirect to their
entries.

There is also a global search bar that allow to search by name or ID across all
the resources of the compendium. Clicking in a result, redirects to the detailed
entry view.

## Compendium entries

**Features used**:

- (UC2) List entries in a resource
- (UC3) Detail view clicking on an entry
- Input signals
- Model signals (communication child -> parent)
- Writable signal
- Computed signal
- Template condition (`@if`, `@else`)
- Template loops (`@for`, `@empty`)
- Template switch (`@switch`, `@default`)
- Pipes (`titlecase`)

![compendium entries](./screenshots/compendium-creatures-with-details.png)

For each category there is a view of its entries. The panel on the left displays
all the items with name, ID and image. There is a search bar to filter by ID or
partial name. The list is sorted by ID.

When the user clicks on an entry from the panel list, the component from the
right displays its detailed view.

It also updates / navigate with a query param `?id=` so that the user can go
directly into the detailed view of an entry.

There are three components:

- Main shell
- Panel list
- Detailed view

The communication between components (for selected entry) happens via Angular
signals. The panel list provides a model signal that it's binded two-ways to its
parent shell. This signal is then binded (one way) into the detailed view. This
view creates a computed signal updating the selected entry when the value of the
input signal changes.

## Continuous integration

**Features used**:

- Continuous integration
- Angular CLI
- NPM cache

![ci-pipeline](./screenshots/ci-pipeline.png)

The project implements a
[continuous integration pipeline](../.github/workflows/hyrule-build.yml) with
GitHub Actions. It restores the dependencies with NPM then it builds the project
with the production configuration and runs a linter. If these steps succeed, it
will provide the bundle as a build artifact.

The dependencies are cached to have faster builds using the built-in `cache`
task of GitHub Actions.

The pipeline run for pull request, tags `v*` and the `main` branch. It can also
be started manually.
